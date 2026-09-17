<div align="center">

# CSS Studio

### Interactive CSS Playground & Design System Builder

A browser-based CSS development environment built with Next.js 16, React 19, and Tailwind CSS 4 — featuring real-time CSS editing with live preview, GSAP animations, color picking, and component export.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Coming_Soon-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=3b82f6)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=22c55e)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## Overview

CSS Studio is a developer tool for experimenting with CSS properties, building design systems, and previewing styles in real time. It provides an interactive playground where you can write CSS, see instant visual feedback, pick colors, generate gradients, and export production-ready code.

---

## Features

| Feature | Description |
|:--------|:------------|
| **Live CSS Editor** | Write CSS with instant preview and syntax highlighting |
| **Color Picker** | Interactive color picker with palette generation |
| **GSAP Animations** | Pre-built animation library with timeline controls |
| **Component Export** | Export styled components as production-ready code |
| **Dark/Light Theme** | System-aware theme switching with next-themes |
| **Responsive Preview** | Test layouts across viewport sizes |
| **Design Tokens** | Generate and manage CSS custom properties |
| **Code Highlighting** | Syntax-highlighted code output with Prism |

---

## Tech Stack

| Layer | Technologies |
|:------|:-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI** | shadcn/ui, Radix UI |
| **Animation** | GSAP 3.15, Motion (Framer Motion) 12 |
| **Color** | React Colorful 5 |
| **Code** | Prism React Renderer 2 |
| **State** | Zustand 5 |
| **Theme** | next-themes 0.4 |
| **Notifications** | Sonner 2 |
| **Icons** | Lucide React |

---

## Project Structure

```
css-studio/
├── src/
│   ├── app/
│   │   ├── (app)/               # Main app layout
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing/home
│   │   └── providers.tsx        # Theme provider
│   ├── components/              # UI components
│   ├── lib/                     # Utilities
│   ├── stores/                  # Zustand state
│   └── types/                   # TypeScript types
├── components.json              # shadcn/ui config
├── next.config.ts
├── tailwind.config.ts (via PostCSS)
├── tsconfig.json
└── package.json
```

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0

### Installation

```bash
git clone https://github.com/mohammadhossein-asadi/css-studio.git
cd css-studio
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm run start
```

---

## Scripts

| Command | Description |
|:--------|:------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |

---

## Key Architecture Decisions

### Real-Time CSS Evaluation
CSS is evaluated in a sandboxed iframe with `CSSStyleSheet.replaceSync()` for instant, secure preview without full page reloads.

### Design Token Generation
CSS custom properties are extracted from the editor and exposed as a design token JSON, compatible with Style Dictionary and other token tools.

### Component Export Pipeline
Selected elements are serialized with their computed styles, cleaned of vendor prefixes, and wrapped in a React component template with TypeScript types.

### GSAP Timeline Integration
Pre-built animations are registered as GSAP timelines that can be scrubbed, reversed, and exported as standalone code snippets.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Mohammadhossein Asadi** — Frontend & Full-Stack Engineer

[![GitHub](https://img.shields.io/badge/GitHub-mohammadhossein--asadi-0a0a0a?style=flat-square&logo=github)](https://github.com/mohammadhossein-asadi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mohammadhossein--asadi-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/mohammadhossein-asadi)

</div>