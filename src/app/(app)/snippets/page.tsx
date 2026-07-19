"use client";

import { useState } from "react";
import { SnippetCard } from "@/components/snippets/SnippetCard";
import { SnippetDialog } from "@/components/snippets/SnippetDialog";
import { snippets } from "@/lib/snippets-data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const categories = ["All", ...Array.from(new Set(snippets.map((s) => s.category)))];

export default function SnippetsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSnippet, setSelectedSnippet] = useState<typeof snippets[0] | null>(null);

  const filtered = snippets.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">React Snippets</h1>
        <p className="text-sm text-muted-foreground">
          Production-ready React components with live code and copy functionality.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search snippets..."
            className="pl-9 h-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onClick={() => setSelectedSnippet(snippet)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No snippets found matching your search.
        </div>
      )}

      <SnippetDialog
        snippet={selectedSnippet}
        open={!!selectedSnippet}
        onOpenChange={(open) => !open && setSelectedSnippet(null)}
      />
    </div>
  );
}
