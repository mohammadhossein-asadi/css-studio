"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2 } from "lucide-react";
import type { Snippet } from "@/lib/snippets-data";

interface SnippetCardProps {
  snippet: Snippet;
  onClick: () => void;
}

export function SnippetCard({ snippet, onClick }: SnippetCardProps) {
  return (
    <Card
      className="group cursor-pointer p-4 transition-all hover:border-muted-foreground/25 hover:shadow-md"
      onClick={onClick}
    >
      <div className="mb-3 flex items-start justify-between">
        <Badge variant="secondary" className="text-[10px]">
          {snippet.category}
        </Badge>
        <Code2 className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <h3 className="mb-1 text-sm font-semibold">{snippet.name}</h3>
      <p className="text-xs text-muted-foreground">{snippet.description}</p>
    </Card>
  );
}
