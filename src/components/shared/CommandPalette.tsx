"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Palette, Layers, Droplets, Square, CreditCard, Circle, Grid3X3, CornerDownRight, Shapes, Component, Sun, Moon, Sparkles, Type, Minus, Play, BookOpen } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const items = [
  { name: "Gradient Generator", href: "/generators/gradient", icon: Palette, group: "Generators" },
  { name: "Shadow Generator", href: "/generators/shadow", icon: Layers, group: "Generators" },
  { name: "Glass Generator", href: "/generators/glass", icon: Droplets, group: "Generators" },
  { name: "Button Builder", href: "/generators/button", icon: Square, group: "Generators" },
  { name: "Card Builder", href: "/generators/card", icon: CreditCard, group: "Generators" },
  { name: "Blob Generator", href: "/generators/blob", icon: Circle, group: "Generators" },
  { name: "Mesh Generator", href: "/generators/mesh", icon: Grid3X3, group: "Generators" },
  { name: "Border Radius Generator", href: "/generators/border-radius", icon: CornerDownRight, group: "Generators" },
  { name: "SVG Shape Generator", href: "/generators/svg-shape", icon: Shapes, group: "Generators" },
  { name: "Animated Border", href: "/generators/animated-border", icon: Sparkles, group: "Generators" },
  { name: "Text Effect", href: "/generators/text-effect", icon: Type, group: "Generators" },
  { name: "Section Divider", href: "/generators/divider", icon: Minus, group: "Generators" },
  { name: "Animation Generator", href: "/generators/animation", icon: Play, group: "Generators" },
  { name: "Typography Generator", href: "/generators/typography", icon: BookOpen, group: "Generators" },
  { name: "React Snippets", href: "/snippets", icon: Component, group: "Library" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const selectItem = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <div className="flex items-center border-b px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            placeholder="Search generators, snippets..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-11"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter" && filtered[selectedIndex]) {
                selectItem(filtered[selectedIndex].href);
              }
            }}
            autoFocus
          />
        </div>
        <div className="max-h-80 overflow-auto p-1">
          {filtered.length === 0 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          )}
          {filtered.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  i === selectedIndex
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => selectItem(item.href)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">{item.name}</span>
                <span className="text-[10px] text-muted-foreground">{item.group}</span>
              </button>
            );
          })}
          <div className="my-1 h-px bg-border" />
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              filtered.length === selectedIndex
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
            onClick={toggleTheme}
            onMouseEnter={() => setSelectedIndex(filtered.length)}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 shrink-0" />
            ) : (
              <Moon className="h-4 w-4 shrink-0" />
            )}
            <span className="flex-1 text-left">Toggle Theme</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
