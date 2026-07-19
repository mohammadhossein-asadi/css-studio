"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
  Component,
  Home,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Type,
  Minus,
  Play,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Generators", type: "group" as const },
  { label: "Gradient", href: "/generators/gradient", icon: Palette },
  { label: "Shadow", href: "/generators/shadow", icon: Layers },
  { label: "Glass", href: "/generators/glass", icon: Droplets },
  { label: "Button", href: "/generators/button", icon: Square },
  { label: "Card", href: "/generators/card", icon: CreditCard },
  { label: "Blob", href: "/generators/blob", icon: Circle },
  { label: "Mesh", href: "/generators/mesh", icon: Grid3X3 },
  { label: "Border Radius", href: "/generators/border-radius", icon: CornerDownRight },
  { label: "SVG Shape", href: "/generators/svg-shape", icon: Shapes },
  { label: "Animated Border", href: "/generators/animated-border", icon: Sparkles },
  { label: "Text Effect", href: "/generators/text-effect", icon: Type },
  { label: "Section Divider", href: "/generators/divider", icon: Minus },
  { label: "Animation", href: "/generators/animation", icon: Play },
  { label: "Typography", href: "/generators/typography", icon: BookOpen },
  { label: "Library", type: "group" as const },
  { label: "Snippets", href: "/snippets", icon: Component },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight">CSS Studio</span>
        )}
      </div>

      <ScrollArea className="flex-1 py-2">
        <nav className="flex flex-col gap-0.5 px-2">
          {navItems.map((item, i) => {
            if (item.type === "group") {
              return collapsed ? (
                <div key={i} className="my-2 h-px bg-border" />
              ) : (
                <p
                  key={i}
                  className="mb-1 mt-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {item.label}
                </p>
              );
            }

            const Icon = item.icon;
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href!}
                className={cn(
                  "flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}
