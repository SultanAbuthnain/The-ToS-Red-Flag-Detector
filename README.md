<div align="center">
  <h1>The ToS Red Flag Detector</h1>
  <p><strong>كاشف العلامات الحمراء في شروط الخدمة</strong></p>
  <p>An AI-powered tool that analyzes Terms of Service agreements and highlights predatory or harmful clauses in plain English.<br>
  <em>أداة مدعومة بالذكاء الاصطناعي لتحليل اتفاقيات شروط الخدمة وتسليط الضوء على البنود الاستغلالية أو الضارة بلغة مبسطة.</em></p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  </p>
</div>

---

## About The Project | عن المشروع

### English
Nobody reads the Terms of Service (ToS) because they are long, complex, and filled with legal jargon. **The ToS Red Flag Detector** solves this problem by using advanced AI to instantly read and analyze any ToS document. It highlights hidden fees, data privacy violations, and other predatory clauses so you know exactly what you're agreeing to.

### العربية
لا أحد يقرأ "شروط الخدمة" (ToS) لأنها طويلة ومعقدة ومليئة بالمصطلحات القانونية. **كاشف العلامات الحمراء في شروط الخدمة** يحل هذه المشكلة باستخدام تقنيات الذكاء الاصطناعي المتقدمة لقراءة وتحليل أي وثيقة شروط خدمة في ثوانٍ. يقوم النظام بتسليط الضوء على الرسوم المخفية، انتهاكات خصوصية البيانات، والبنود الاستغلالية الأخرى حتى تعرف تماماً ما توافق عليه.

---

## Features | المميزات

- **Instant Analysis (تحليل فوري):** Paste your ToS text and get an instant breakdown. (انسخ نص شروط الخدمة واحصل على تحليل فوري).
- **Clear Plain English (لغة مبسطة):** Complex legal jargon translated into easy-to-understand explanations. (ترجمة المصطلحات القانونية المعقدة إلى شروحات سهلة الفهم).
- **Red Flag Highlighting (تمييز المخاطر):** Automatically detects and highlights data sharing, arbitration clauses, and unfair terms. (اكتشاف تلقائي وتسليط الضوء على مشاركة البيانات، بنود التحكيم، والشروط غير العادلة).
- **Responsive Design (تصميم متجاوب):** Works flawlessly on desktop and mobile devices. (يعمل بسلاسة على أجهزة الكمبيوتر والأجهزة المحمولة).

---

## Tech Stack | التقنيات المستخدمة

- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Language:** TypeScript
- **AI Integration:** Gemini API (from Google AI Studio)
- **Styling:** Framer Motion (Animations), Lucide React (Icons)

---

## Getting Started | طريقة التشغيل

Follow these steps to set up the project locally. (اتبع هذه الخطوات لتشغيل المشروع على جهازك).

### 1. Clone the repository (استنساخ المستودع)
```bash
git clone https://github.com/SultanAbuthnain/The-ToS-Red-Flag-Detector.git
cd The-ToS-Red-Flag-Detector
```

### 2. Install dependencies (تثبيت الحزم)
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up Environment Variables (إعداد متغيرات البيئة)
Create a `.env.local` file in the root directory and add your Gemini API key:
(قم بإنشاء ملف `.env.local` في المجلد الرئيسي وأضف مفتاح Gemini الخاص بك):

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the Development Server (تشغيل خادم التطوير)
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
(افتح الرابط في متصفحك لرؤية النتيجة).
 
---

## License | الرخصة
Distributed under the MIT License. (موزع تحت رخصة MIT).

<div align="center">
  <p>Built with care</p>
</div>
