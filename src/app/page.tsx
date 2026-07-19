import Link from "next/link";
import {
  Palette,
  Layers,
  Droplets,
  Square,
  CreditCard,
  Circle,
  Grid3X3,
  CornerDownRight,
  Shapes,
  Sparkles,
  Zap,
  Code2,
} from "lucide-react";

const generators = [
  { name: "Gradient", href: "/generators/gradient", icon: Palette, description: "Linear, radial & conic gradients with unlimited color stops", color: "from-violet-500 to-purple-600" },
  { name: "Shadow", href: "/generators/shadow", icon: Layers, description: "Box & text shadows with layered glow effects", color: "from-blue-500 to-cyan-500" },
  { name: "Glass", href: "/generators/glass", icon: Droplets, description: "Frosted glass with blur, saturation & noise", color: "from-cyan-400 to-blue-500" },
  { name: "Button", href: "/generators/button", icon: Square, description: "Interactive buttons with hover effects & gradients", color: "from-emerald-500 to-teal-500" },
  { name: "Card", href: "/generators/card", icon: CreditCard, description: "Glass, gradient & pricing cards with animations", color: "from-orange-500 to-amber-500" },
  { name: "Blob", href: "/generators/blob", icon: Circle, description: "Organic animated blob shapes with morph effects", color: "from-pink-500 to-rose-500" },
  { name: "Mesh", href: "/generators/mesh", icon: Grid3X3, description: "Gradient mesh backgrounds with noise overlays", color: "from-fuchsia-500 to-pink-500" },
  { name: "Border Radius", href: "/generators/border-radius", icon: CornerDownRight, description: "Independent corner controls & organic shapes", color: "from-amber-500 to-orange-500" },
  { name: "SVG Shape", href: "/generators/svg-shape", icon: Shapes, description: "Waves, blobs, dividers & abstract SVG shapes", color: "from-teal-500 to-emerald-500" },
];

const features = [
  { icon: Zap, title: "Instant Preview", description: "See changes in real-time as you adjust controls" },
  { icon: Code2, title: "Multi-format Export", description: "Copy as CSS, Tailwind, SCSS, or React component" },
  { icon: Sparkles, title: "Curated Presets", description: "Start with professionally designed presets" },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Hero */}
      <div className="mb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          The Ultimate CSS Playground
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            CSS Studio
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Create, customize, preview, and export beautiful CSS designs in real time.
          The definitive destination for modern CSS development.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/generators/gradient"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Palette className="h-4 w-4" />
            Start Creating
          </Link>
          <Link
            href="/snippets"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Browse Snippets
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border bg-card p-5">
            <f.icon className="mb-3 h-5 w-5 text-muted-foreground" />
            <h3 className="mb-1 text-sm font-semibold">{f.title}</h3>
            <p className="text-xs text-muted-foreground">{f.description}</p>
          </div>
        ))}
      </div>

      {/* Generators Grid */}
      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">Generators</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Pick a generator to start creating beautiful CSS effects.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {generators.map((gen) => (
            <Link
              key={gen.name}
              href={gen.href}
              className="group relative overflow-hidden rounded-xl border bg-card p-5 transition-all hover:border-muted-foreground/25 hover:shadow-md"
            >
              <div className={`mb-3 inline-flex rounded-lg bg-gradient-to-br ${gen.color} p-2`}>
                <gen.icon className="h-4 w-4 text-white" />
              </div>
              <h3 className="mb-1 text-sm font-semibold">{gen.name}</h3>
              <p className="text-xs text-muted-foreground">{gen.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
