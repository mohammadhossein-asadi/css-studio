export interface Snippet {
  id: string;
  name: string;
  category: string;
  description: string;
  code: string;
}

export const snippets: Snippet[] = [
  {
    id: "navbar-1",
    name: "Simple Navbar",
    category: "Navigation",
    description: "Clean navigation bar with logo and links",
    code: `export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <div className="text-lg font-bold">Logo</div>
      <div className="flex gap-6 text-sm">
        <a href="#" className="hover:text-primary">Home</a>
        <a href="#" className="hover:text-primary">About</a>
        <a href="#" className="hover:text-primary">Contact</a>
      </div>
    </nav>
  );
}`,
  },
  {
    id: "navbar-2",
    name: "Glass Navbar",
    category: "Navigation",
    description: "Frosted glass navigation with backdrop blur",
    code: `export function GlassNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-lg font-bold text-white">Logo</div>
        <div className="flex gap-6 text-sm text-white/80">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </div>
    </nav>
  );
}`,
  },
  {
    id: "card-1",
    name: "Basic Card",
    category: "Layout",
    description: "Simple card with shadow and rounded corners",
    code: `export function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}`,
  },
  {
    id: "card-2",
    name: "Glass Card",
    category: "Layout",
    description: "Frosted glass card effect with backdrop blur",
    code: `export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-xl">
      {children}
    </div>
  );
}`,
  },
  {
    id: "btn-1",
    name: "Primary Button",
    category: "Forms",
    description: "Standard primary action button",
    code: `export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}`,
  },
  {
    id: "btn-2",
    name: "Gradient Button",
    category: "Forms",
    description: "Button with gradient background and hover glow",
    code: `export function GradientButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 transition-all">
      {children}
    </button>
  );
}`,
  },
  {
    id: "input-1",
    name: "Input Field",
    category: "Forms",
    description: "Text input with label and focus ring",
    code: `export function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        className="flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        {...props}
      />
    </div>
  );
}`,
  },
  {
    id: "toast-1",
    name: "Toast Notification",
    category: "Feedback",
    description: "Slide-in notification toast with icon",
    code: `export function Toast({ message, type = "success" }: { message: string; type?: "success" | "error" | "info" }) {
  const colors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };
  return (
    <div className={\`fixed bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white px-4 py-3 shadow-lg \${colors[type]}\`}>
      <span className="text-sm font-medium text-white">{message}</span>
    </div>
  );
}`,
  },
  {
    id: "modal-1",
    name: "Modal Dialog",
    category: "Feedback",
    description: "Centered modal with backdrop overlay",
    code: `export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}`,
  },
  {
    id: "badge-1",
    name: "Status Badge",
    category: "Data Display",
    description: "Colored badge for status indicators",
    code: `export function Badge({ variant = "default", children }: { variant?: "default" | "success" | "warning" | "error"; children: React.ReactNode }) {
  const styles = {
    default: "bg-secondary text-secondary-foreground",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-red-100 text-red-700",
  };
  return (
    <span className={\`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium \${styles[variant]}\`}>
      {children}
    </span>
  );
}`,
  },
  {
    id: "skeleton-1",
    name: "Loading Skeleton",
    category: "Data Display",
    description: "Animated placeholder for loading states",
    code: `export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={\`animate-pulse rounded-md bg-muted \${className ?? "h-4 w-full"}\`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  );
}`,
  },
  {
    id: "avatar-1",
    name: "Avatar Group",
    category: "Data Display",
    description: "Stacked avatar group with overlap",
    code: `export function AvatarGroup({ srcs }: { srcs: string[] }) {
  return (
    <div className="flex -space-x-2">
      {srcs.slice(0, 5).map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className="h-10 w-10 rounded-full border-2 border-white object-cover"
        />
      ))}
      {srcs.length > 5 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-muted text-xs font-medium">
          +{srcs.length - 5}
        </div>
      )}
    </div>
  );
}`,
  },
  {
    id: "dropdown-1",
    name: "Dropdown Menu",
    category: "Interactive",
    description: "Custom dropdown with animated open",
    code: "export function Dropdown({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) {\n  const [open, setOpen] = useState(false);\n  return (\n    <div className=\"relative inline-block\">\n      <div onClick={() => setOpen(!open)}>{trigger}</div>\n      {open && (\n        <div className=\"absolute z-50 mt-2 w-48 rounded-lg border bg-popover p-1 shadow-md\">\n          {children}\n        </div>\n      )}\n    </div>\n  );\n}",
  },
  {
    id: "tabs-1",
    name: "Animated Tabs",
    category: "Navigation",
    description: "Tabs with sliding underline indicator",
    code: "export function Tabs({ tabs }: { tabs: string[] }) {\n  const [active, setActive] = useState(0);\n  return (\n    <div className=\"relative flex border-b\">\n      {tabs.map((tab, i) => (\n        <button key={tab} className={`px-4 py-2 text-sm ${active === i ? \"text-primary\" : \"text-muted-foreground\"}`} onClick={() => setActive(i)}>\n          {tab}\n        </button>\n      ))}\n      <div className=\"absolute bottom-0 h-0.5 bg-primary transition-all\" style={{ left: `${active * (100 / tabs.length)}%`, width: `${100 / tabs.length}%` }} />\n    </div>\n  );\n}",
  },
  {
    id: "progress-1",
    name: "Progress Bar",
    category: "Data Display",
    description: "Animated progress bar with gradient",
    code: "export function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {\n  const percent = Math.min((value / max) * 100, 100);\n  return (\n    <div className=\"w-full h-2 rounded-full bg-muted overflow-hidden\">\n      <div className=\"h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500\" style={{ width: `${percent}%` }} />\n    </div>\n  );\n}",
  },
  {
    id: "tooltip-1",
    name: "Tooltip",
    category: "Feedback",
    description: "Simple CSS tooltip with arrow",
    code: "export function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {\n  return (\n    <div className=\"relative group inline-block\">\n      {children}\n      <div className=\"absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-white bg-foreground rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap\">\n        {text}\n      </div>\n    </div>\n  );\n}",
  },
  {
    id: "accordion-1",
    name: "Accordion",
    category: "Interactive",
    description: "Expandable accordion with smooth animation",
    code: "export function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {\n  const [open, setOpen] = useState(false);\n  return (\n    <div className=\"border-b\">\n      <button className=\"flex w-full items-center justify-between py-3 text-sm font-medium\" onClick={() => setOpen(!open)}>\n        {title}\n        <span className={`transition-transform ${open ? \"rotate-180\" : \"\"}`}>▾</span>\n      </button>\n      <div className={`overflow-hidden transition-all duration-200 ${open ? \"max-h-40\" : \"max-h-0\"}`}>\n        <div className=\"pb-3 text-sm text-muted-foreground\">{children}</div>\n      </div>\n    </div>\n  );\n}",
  },
  {
    id: "switch-1",
    name: "Toggle Switch",
    category: "Forms",
    description: "Animated toggle switch component",
    code: "export function Toggle({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {\n  return (\n    <button className={`relative h-6 w-11 rounded-full transition-colors ${checked ? \"bg-primary\" : \"bg-muted\"}`} onClick={() => onCheckedChange(!checked)}>\n      <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? \"translate-x-5\" : \"\"}`} />\n    </button>\n  );\n}",
  },
  {
    id: "hover-card-1",
    name: "Hover Card",
    category: "Feedback",
    description: "Card with hover reveal effect",
    code: "export function HoverCard() {\n  return (\n    <div className=\"group relative w-64 h-40 rounded-xl overflow-hidden cursor-pointer\">\n      <div className=\"absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600\" />\n      <div className=\"absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent\">\n        <div className=\"text-white translate-y-4 group-hover:translate-y-0 transition-transform\">\n          <h3 className=\"font-semibold\">Hover Card</h3>\n          <p className=\"text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity\">Reveals content on hover</p>\n        </div>\n      </div>\n    </div>\n  );\n}",
  },
  {
    id: "scroll-reveal-1",
    name: "Scroll Reveal",
    category: "Interactive",
    description: "Element that animates on scroll into view",
    code: "export function ScrollReveal({ children }: { children: React.ReactNode }) {\n  const ref = useRef<HTMLDivElement>(null);\n  const [visible, setVisible] = useState(false);\n  useEffect(() => {\n    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });\n    if (ref.current) observer.observe(ref.current);\n    return () => observer.disconnect();\n  }, []);\n  return (\n    <div ref={ref} className={`transition-all duration-700 ${visible ? \"opacity-100 translate-y-0\" : \"opacity-0 translate-y-8\"}`}>\n      {children}\n    </div>\n  );\n}",
  },
  {
    id: "code-block-1",
    name: "Code Block",
    category: "Data Display",
    description: "Styled code block with copy button",
    code: "export function CodeBlock({ code, language }: { code: string; language: string }) {\n  const [copied, setCopied] = useState(false);\n  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };\n  return (\n    <div className=\"relative rounded-lg border bg-muted/50 font-mono text-sm\">\n      <div className=\"flex items-center justify-between border-b px-4 py-2\">\n        <span className=\"text-xs text-muted-foreground\">{language}</span>\n        <button onClick={copy} className=\"text-xs text-muted-foreground hover:text-foreground\">{copied ? \"Copied!\" : \"Copy\"}</button>\n      </div>\n      <pre className=\"p-4 overflow-x-auto\"><code>{code}</code></pre>\n    </div>\n  );\n}",
  },
];