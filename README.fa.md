<div align="center">

# CSS Studio

### بازی‌گر تعاملی CSS و سازنده‌ی سیستم طراحی

محیط توسعه‌ی CSS محلی‌مستند به مرورگر که با Next.js 16، React 19 و Tailwind CSS 4 ساخته شده — با ویرایش CSS بلادرنگ به‌همراه پیش‌نمایش زنده، انیمیشن‌های GSAP، انتخاب رنگ و تصدیر کامپوننت.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Coming_Soon-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=3b82f6)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=22c55e)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## نمای کلی

CSS Studio ابزاری برای توسعه‌کاران برای آزمایش با ویژگی‌های CSS، ساخت سیستم‌های طراحی و پیش‌نمایش در ام hitting این момент است. یک میدان تعاملی ارائه می‌دهد که در آن می‌توانید CSS بنویسید، بازخورد بصری آنی ببینید، رنگ‌ها را انتخاب کنید، گرادیان‌ها تولید کنید و کد آماده‌ی تولید را تصدیر نمایید.

---

## ویژگی‌ها

| ویژگی | توضیح |
|:--------|:------------|
| **ویرایشگر CSS زنده** | بنویسید CSS با پیش‌نمایش آنی و همирragma‌های dark/symbolic highlighted |
| **انتخاب رنگ** | انتخابر رنگ تعاملی با تولید پالت |
| **انیمیشن‌های GSAP** | کتابخانه‌ی انیمیشن از پیش ساخته‌شده با کنترل‌های زمان‌رallisি |
| **تصدیر کامپوننت** | تصدیر کامپوننت‌های استایل‌شده به عنوان کد آماده‌ی تولید |
| **تم تاریک/روشن** | تغییر تم با آگاهی از سیستم با next-themes |
| **پیش‌نمایش واکنش‌گرا** | آن abbey layout در ابعاد دوربین‌های مختلف |
| **توکن‌های طراحی** | تولید و مدیریتوی ویژگی‌های سفارشی CSS |
| **برجستهسازی کد** | با Prism، خروجی کد با nuance‌های syntax highlighted |

---

## پشته فناوری

| لایه | فناوری‌ها |
|:------|:-------------|
| **فریم‌ورک** | Next.js 16 (App Router) |
| **زبان** | TypeScript 5 |
| **استیلینگ** | Tailwind CSS 4 |
| **UI** | shadcn/ui، Radix UI |
| **انیمیشن** | GSAP 3.15، Motion (Framer Motion) 12 |
| **رنگ** | React Colorful 5 |
| **کد** | Prism React Renderer 2 |
| **وضعیت** | Zustand 5 |
| **تم** | next-themes 0.4 |
| **اعلان‌ها** | Sonner 2 |
| **آیکون‌ها** | Lucide React |

---

## ساختار پروژه

```
css-studio/
├── src/
│   ├── app/
│   │   ├── (app)/               # لی‌اوت اصلی برنامه
│   │   ├── layout.tsx           # لی‌اوت ریشه
│   │   ├── page.tsx             # صفحه‌ی فرود/خانه
│   │   └── providers.tsx        # ارائه‌دهنده‌ی تم
│   ├── components/              # کامپوننت‌های رابط کاربری
│   ├── lib/                     # ابزارهای کاربردی
│   ├── stores/                  # وضعیت Zustand
│   └── types/                   # انواع TypeScript
├── components.json              # پیکربندی shadcn/ui
├── next.config.ts
├── tailwind.config.ts (via PostCSS)
├── tsconfig.json
└── package.json
```

---

## شروع سریع

### پیش‌نیازها

- **Node.js** >= 18.0.0

### نصب

```bash
git clone https://github.com/mohammadhossein-asadi/css-studio.git
cd css-studio
npm install
```

### توسعه

```bash
npm run dev
```

در آدرس `http://localhost:3000` باز می‌شود.

### بیلد نسخه‌ی تولید

```bash
npm run build
npm run start
```

---

## اسکریپت‌ها

| دستور | توضیح |
|:--------|:------------|
| `npm run dev` | راه‌اندازی سرور توسعه Next.js |
| `npm run build` | بیلد نسخه‌ی تولید |
| `npm run start` | اجرای سرور نسخه‌ی تولید |
| `npm run lint` | ESLint |

---

## تصمیمات کلیدی معماری

### ارزیابی CSS بلادرنگ
CSS در یک iframe محصور (sandboxed) با `CSSStyleSheet.replaceSync()` ارزیابی می‌شود تا پیش‌نمایشی آنی و امن بدون بارگذاری مجدد کامل صفحه داشته باشید.

### تولید توکن‌های طراحی
ویژگی‌های سفارشی CSS از ویرایشگر استخراج شده و به‌صورت JSON توکن طراحی نمایش داده می‌شوند؛ سازگار با Style Dictionary و ابزارهای(token).

### خط لوله‌ی تصدیر کامپوننت
عناصر انتخاب‌شده همراه با استایل‌های محاسبه‌شده سریالایز می‌شوند، از پیشوندهای دولتی پاک‌سازی می‌گردند و در یک الگو کامپوننت React با انواع TypeScript Wrap می‌گردند.

### یکپارچگی خط‌زمان GSAP
انیمیشن‌های از پیش ساخته‌شده به‌صورت خط‌زمان‌های GSAP ثبت می‌شوند که قابل اسکراب، معکوس و به‌صورت قطعات کد مستقل قابل تصدیر هستند.

---

## مجوز

این پروژه تحت [مجوز MIT](LICENSE) منتشر شده است.

---

<div align="center">

**Mohammadhossein Asadi** — مهندس فرانت‌اند و فرانت‌به‌کل

[![GitHub](https://img.shields.io/badge/GitHub-mohammadhossein--asadi-0a0a0a?style=flat-square&logo=github)](https://github.com/mohammadhossein-asadi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mohammadhossein--asadi-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/mohammadhossein-asadi)

</div>
