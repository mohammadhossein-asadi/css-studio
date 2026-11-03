# CSS Studio (استودیو سی‌اس‌اس)

<div align="center">

![CSS Studio Logo](public/logo.png)

**Professional CSS Design System & Component Library Builder**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Motion](https://img.shields.io/badge/Motion-12.42-FF6F61?logo=framer&logoColor=white)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[🇬🇧 English](#-css-studio-استودیو-سیاساس) • [🇮🇷 فارسی](README.fa.md) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 Overview

**CSS Studio** is a professional, visual design system builder for creating and managing **CSS design tokens**, **component libraries**, and **responsive patterns**. Built with **Next.js 16**, **Tailwind CSS v4**, and **shadcn/ui**, it provides a visual interface for designing consistent, scalable design systems.

### 🎯 Why CSS Studio?

| Problem | CSS Studio Solution |
|---------|---------------------|
| Design tokens scattered in code | **Centralized visual token editor** with live preview |
| Inconsistent component variants | **Component playground** with all states |
| Hard to maintain design systems | **Versioned tokens** with Git sync |
| No RTL support in tools | **Built-in Persian RTL** with Vazirmatn |
| Token changes break components | **Real-time validation** + TypeScript types |

---

## ✨ Features

### 🎨 **Design Token Manager**
- **Visual editors** for colors, spacing, typography, shadows, radii
- **Semantic token mapping** (primary → brand-500, danger → red-500)
- **Dark/Light mode** with automatic CSS variable generation
- **Persian font integration** — Vazirmatn with fallbacks
- **Export formats**: CSS vars, JSON, SCSS, Figma tokens, Tailwind config

### 🧩 **Component Library Builder**
- **shadcn/ui integration** — extend Radix primitives visually
- **Variant playground** — size, color, state combinations
- **Compound components** — select, tabs, accordion, dialog
- **Responsive preview** — mobile, tablet, desktop breakpoints
- **RTL testing** — instant mirror preview

### 📐 **Pattern Library**
- **Layout patterns**: grid, flex, container, sidebar, header
- **Component patterns**: forms, tables, cards, modals, navigation
- **Motion patterns**: enter/exit, loading, micro-interactions
- **Accessibility patterns**: focus, ARIA, keyboard navigation
- **Copy-paste ready** — React + Tailwind code snippets

### 🔄 **Workflow Features**
- **Git-backed** — tokens as code, reviewable PRs
- **Version history** — semantic versioning for tokens
- **Team collaboration** — comments, approvals, review flows
- **CI/CD integration** — token validation in pipeline
- **Design handoff** — Figma sync (planned), Storybook export

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | Next.js (App Router) | 16.2 |
| **Runtime** | React | 19 |
| **Language** | TypeScript | 5 (Strict) |
| **Styling** | Tailwind CSS | v4 |
| **UI Components** | shadcn/ui + Radix UI | Latest |
| **Animation** | Motion (Framer) | 12.42 |
| **Color** | react-colorful | 5.7 |
| **Syntax Highlight** | prism-react-renderer | 2.4 |
| **Toast** | sonner | 2.0 |
| **State** | Zustand | 5.0 |
| **Testing** | Vitest | Latest |
| **Deployment** | Vercel | - |

### Project Structure

```
css-studio/
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (studio)/           # Main studio interface
│   │   │   ├── tokens/         # Token editor
│   │   │   ├── components/     # Component playground
│   │   │   ├── patterns/       # Pattern library
│   │   │   └── settings/       # Project settings
│   │   ├── api/                # API routes
│   │   │   ├── tokens/         # CRUD for tokens
│   │   │   ├── components/     # Component definitions
│   │   │   └── export/         # Export endpoints
│   │   ├── globals.css         # Global styles + Tailwind v4
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components (14+)
│   │   ├── studio/             # Studio-specific components
│   │   │   ├── TokenEditor.tsx
│   │   │   ├── ComponentPlayground.tsx
│   │   │   ├── PatternCard.tsx
│   │   │   └── ExportModal.tsx
│   │   └── preview/            # Live preview components
│   ├── hooks/
│   │   ├── useTokens.ts
│   │   ├── useTheme.ts
│   │   └── useExport.ts
│   ├── lib/
│   │   ├── tokens/             # Token processing
│   │   │   ├── parser.ts       # Parse CSS/JSON/Figma
│   │   │   ├── generator.ts    # Generate CSS/TS/Tailwind
│   │   │   └── validator.ts    # Contrast, naming, refs
│   │   ├── components/         # Component code gen
│   │   └── utils.ts
│   ├── store/                  # Zustand stores
│   └── types/                  # TypeScript types
├── .env.example
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── vitest.config.ts
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+
- **npm** 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/mohammadhossein-asadi/css-studio.git
cd css-studio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="CSS Studio"

# Optional: GitHub integration
GITHUB_TOKEN=ghp_...
GITHUB_OWNER=your-org
GITHUB_REPO=design-tokens

# Optional: Figma integration
FIGMA_ACCESS_TOKEN=figd_...
FIGMA_FILE_KEY=...
```

---

## 🛠️ Development

### Available Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server

# Code Quality
npm run lint         # ESLint

# Testing
npm test             # Run Vitest tests
npm run test:watch   # Watch mode
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm test -- --coverage
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/ARCHITECTURE.md) | System design |
| [Token Specification](docs/TOKEN_SPEC.md) | Token format & schema |
| [Component Authoring](docs/COMPONENT_AUTHORING.md) | Creating components |
| [Export Formats](docs/EXPORT_FORMATS.md) | CSS, JSON, Figma, Tailwind |
| [Persian UX](docs/PERSIAN_UX.md) | RTL, Vazirmatn guidelines |

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel --prod
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔒 Security

- **No user data** stored without consent
- **GitHub tokens** encrypted at rest
- **CSP headers** via Next.js
- **Dependency scanning** via Dependabot

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) first.

---

## 📋 Roadmap

### ✅ Completed

- [x] Next.js 16 + React 19 + Tailwind v4
- [x] shadcn/ui component library
- [x] Token editor (colors, spacing, typography)
- [x] Component playground
- [x] Persian RTL + Vazirmatn
- [x] CSS variable export

### 🔄 In Progress

- [ ] JSON/Figma/Tailwind config export
- [ ] Version history & semantic releases
- [ ] Team collaboration features
- [ ] Storybook export

### 📅 Planned

- [ ] Figma plugin (bi-directional sync)
- [ ] VS Code extension
- [ ] Design token CLI
- [ ] Automated visual regression testing
- [ ] AI-assisted token generation

---

## 📄 License

**MIT License** — See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** — Beautiful accessible components
- **Radix UI** — Unstyled, accessible primitives
- **Tailwind CSS** — Utility-first CSS framework
- **Motion** — Animation library by Framer
- **react-colorful** — Color picker by omgovich
- **Vazirmatn Font** — Persian typography by Rastikerdar

---

## 📞 Support & Community

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/mohammadhossein-asadi/css-studio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mohammadhossein-asadi/css-studio/discussions)

---

<div align="center">

**Built with ❤️ for design system engineers worldwide**

[🇬🇧 English](README.md) • [🇮🇷 فارسی](README.fa.md) • [⭐ Star us on GitHub](https://github.com/mohammadhossein-asadi/css-studio)

</div>