"use client";

import { ThemeToggle } from "./ThemeToggle";
import { Search, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b px-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search generators, snippets..."
          className="pl-9 h-9 bg-muted/50"
          readOnly
          onClick={() => {
            document.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", metaKey: true })
            );
          }}
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          <Command className="inline h-2.5 w-2.5" />K
        </kbd>
      </div>
      <ThemeToggle />
    </header>
  );
}
