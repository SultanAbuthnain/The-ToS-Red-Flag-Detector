import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are a legal document analysis AI specialized in identifying user-hostile clauses in Terms of Service, Privacy Policies, and EULAs. Your job is NOT to summarize — your job is to DETECT and FLAG specific predatory or harmful clauses.

Focus ONLY on clauses that could negatively impact the end user, including:
- Data selling or sharing with third parties for advertising or commercial gain
- Auto-renewal or cancellation traps (e.g., require 30+ day advance cancellation)
- Copyright assignment or irrevocable license grants over user content
- Unilateral right to change terms without notice or with minimal notice
- Broad arbitration clauses or class-action waivers
- Surveillance permissions (location, microphone, biometric, behavioral tracking)
- Account termination without cause or without refund
- Retroactive data use permissions
- Liability waivers that protect the company from user damages
- Data retention policies that keep your data forever

Output Rules:
- Return ONLY valid JSON matching the schema below. No markdown, no prose, no backticks.
- Each item must include: category, severity ("critical", "warning", or "info"), plain_english_summary, quoted_excerpt, and section_reference (if identifiable, otherwise empty string).
- Do NOT include general summaries or neutral information.
- If no red flags are found, return clean_bill: true and an empty red_flags array.
- Maximum 7 red flags. Prioritize the most impactful ones.
- Plain English summaries must be under 35 words each. No legalese.
- quoted_excerpt should be the most damning sentence or phrase from the actual document, under 50 words.

JSON Schema:
{
  "clean_bill": boolean,
  "danger_score": number (0-100, where 0 is perfectly safe and 100 is extremely predatory),
  "red_flags": [
    {
      "category": string,
      "severity": "critical" | "warning" | "info",
      "plain_english_summary": string,
      "quoted_excerpt": string,
      "section_reference": string
    }
  ]
}`;

function sanitizeInput(text: string): string {
  return text
    .replace(/<[^>]*>/g, " ") // strip HTML tags
    .replace(/\s+/g, " ") // collapse whitespace
    .replace(/[^\x20-\x7E\n\r\t]/g, " ") // remove non-printable chars (keep ASCII)
    .trim()
    .slice(0, 60000); // cap at ~15k tokens
}

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  return `ratelimit:${ip}`;
}

export async function POST(req: NextRequest) {
  try {
    // Parse body
    let body: { text?: string; doc_type?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { text, doc_type = "Terms of Service" } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing required field: text." }, { status: 400 });
    }

    if (text.trim().length < 100) {
      return NextResponse.json(
        { error: "Text is too short. Please paste a complete ToS or Privacy Policy." },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    // Sanitize input
    const sanitizedText = sanitizeInput(text);
    const wordCount = sanitizedText.split(/\s+/).length;

    // Build user message
    const userMessage = `[DOCUMENT TYPE]: ${doc_type}
[APPROXIMATE WORD COUNT]: ${wordCount}

[DOCUMENT TEXT]:
${sanitizedText}

Analyze the above document and return ONLY the JSON red flag object as specified. No markdown, no explanation, just raw JSON.`;

    // Call Gemini
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0,
        responseMimeType: "application/json",
      }
    });

    const resultGemini = await model.generateContent(userMessage);
    const rawContent = resultGemini.response.text();
    if (!rawContent) {
      return NextResponse.json({ error: "No response from AI model." }, { status: 500 });
    }

    // Parse JSON response
    let result;
    try {
      result = JSON.parse(rawContent);
    } catch {
      return NextResponse.json({ error: "Failed to parse AI response." }, { status: 500 });
    }

    // Validate structure
    if (typeof result.clean_bill !== "boolean" || !Array.isArray(result.red_flags)) {
      return NextResponse.json({ error: "Unexpected AI response format." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      clean_bill: result.clean_bill,
      danger_score: result.danger_score ?? 0,
      red_flags: result.red_flags,
      word_count: wordCount,
      doc_type,
    });
  } catch (error: unknown) {
    console.error("Scan API error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    // Gemini-specific errors
    if (message.includes("API key")) {
      return NextResponse.json(
        { error: "Invalid Gemini API key. Please check your .env.local file." },
        { status: 401 }
      );
    }
    if (message.includes("quota")) {
      return NextResponse.json(
        { error: "Gemini quota exceeded. Please check your billing." },
        { status: 429 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
