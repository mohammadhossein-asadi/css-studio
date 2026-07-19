"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { copyToClipboard, downloadFile } from "@/lib/export";
import { toast } from "sonner";
import { Highlight, themes } from "prism-react-renderer";
import type { Snippet } from "@/lib/snippets-data";

interface SnippetDialogProps {
  snippet: Snippet | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SnippetPreview({ id }: { id: string }) {
  switch (id) {
    case "navbar-1":
      return (
        <nav className="flex items-center justify-between px-6 py-4 border-b bg-background">
          <div className="text-lg font-bold">Logo</div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-primary">Home</a>
            <a href="#" className="hover:text-primary">About</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </nav>
      );
    case "navbar-2":
      return (
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500" />
          <nav className="relative z-10 flex items-center justify-between px-6 py-4 backdrop-blur-lg bg-white/10 border-b border-white/20">
            <div className="text-lg font-bold text-white">Logo</div>
            <div className="flex gap-6 text-sm text-white/80">
              <a href="#" className="hover:text-white">Home</a>
              <a href="#" className="hover:text-white">About</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </nav>
        </div>
      );
    case "card-1":
      return (
        <div className="rounded-xl border bg-card p-6 shadow-sm max-w-sm">
          <h3 className="text-lg font-semibold mb-2">Card Title</h3>
          <p className="text-sm text-muted-foreground">This is a simple card component with shadow and rounded corners.</p>
        </div>
      );
    case "card-2":
      return (
        <div className="relative rounded-2xl overflow-hidden max-w-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-pink-500" />
          <div className="relative z-10 border border-white/20 bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-2">Glass Card</h3>
            <p className="text-sm text-white/70">Frosted glass effect with backdrop blur.</p>
          </div>
        </div>
      );
    case "btn-1":
      return (
        <button className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Primary Button
        </button>
      );
    case "btn-2":
      return (
        <button className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 transition-all">
          Gradient Button
        </button>
      );
    case "input-1":
      return (
        <div className="space-y-1 w-64">
          <label className="text-sm font-medium">Email</label>
          <input className="flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm" placeholder="you@example.com" />
        </div>
      );
    case "toast-1":
      return (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 shadow-lg">
          <span className="text-sm font-medium text-white">Success! Changes saved.</span>
        </div>
      );
    case "modal-1":
      return (
        <div className="relative w-72 rounded-2xl bg-card p-6 shadow-2xl border">
          <h2 className="text-lg font-semibold mb-2">Modal Title</h2>
          <p className="text-sm text-muted-foreground mb-4">This is a modal dialog component.</p>
          <div className="flex justify-end gap-2">
            <button className="px-3 py-1.5 text-sm rounded-lg border">Cancel</button>
            <button className="px-3 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground">Confirm</button>
          </div>
        </div>
      );
    case "badge-1":
      return (
        <div className="flex gap-2">
          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">Default</span>
          <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-0.5 text-xs font-medium">Success</span>
          <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-2.5 py-0.5 text-xs font-medium">Warning</span>
          <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2.5 py-0.5 text-xs font-medium">Error</span>
        </div>
      );
    case "skeleton-1":
      return (
        <div className="rounded-xl border p-6 space-y-4 w-64">
          <div className="animate-pulse rounded-md bg-muted h-4 w-3/4" />
          <div className="animate-pulse rounded-md bg-muted h-3 w-full" />
          <div className="animate-pulse rounded-md bg-muted h-3 w-5/6" />
        </div>
      );
    case "avatar-1":
      return (
        <div className="flex -space-x-2">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-xs text-white font-medium">
              {String.fromCharCode(64 + i)}
            </div>
          ))}
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">+2</div>
        </div>
      );
    case "dropdown-1":
      return (
        <div className="relative inline-block">
          <button className="px-4 py-2 text-sm border rounded-lg bg-background">Dropdown ▾</button>
          <div className="absolute z-50 mt-2 w-48 rounded-lg border bg-popover p-1 shadow-md">
            <div className="px-2 py-1.5 text-sm rounded hover:bg-accent cursor-pointer">Profile</div>
            <div className="px-2 py-1.5 text-sm rounded hover:bg-accent cursor-pointer">Settings</div>
            <div className="px-2 py-1.5 text-sm rounded hover:bg-accent cursor-pointer">Logout</div>
          </div>
        </div>
      );
    case "tabs-1":
      return (
        <div className="w-64">
          <div className="relative flex border-b">
            {["Overview", "Details", "Settings"].map((tab, i) => (
              <button key={tab} className={`px-4 py-2 text-sm font-medium ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>{tab}</button>
            ))}
            <div className="absolute bottom-0 h-0.5 bg-primary" style={{ left: "0%", width: "33.33%" }} />
          </div>
          <div className="p-4 text-sm text-muted-foreground">Tab content goes here</div>
        </div>
      );
    case "progress-1":
      return (
        <div className="w-64 space-y-2">
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500" style={{ width: "65%" }} />
          </div>
          <p className="text-xs text-muted-foreground">65% complete</p>
        </div>
      );
    case "tooltip-1":
      return (
        <div className="relative inline-block">
          <button className="px-4 py-2 text-sm border rounded-lg bg-background">Hover me</button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-white bg-foreground rounded-lg whitespace-nowrap">
            Tooltip text
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
          </div>
        </div>
      );
    case "accordion-1":
      return (
        <div className="w-64">
          <div className="border-b">
            <button className="flex w-full items-center justify-between py-3 text-sm font-medium">
              Section 1 <span>▾</span>
            </button>
            <div className="pb-3 text-sm text-muted-foreground">Accordion content goes here.</div>
          </div>
          <div className="border-b">
            <button className="flex w-full items-center justify-between py-3 text-sm font-medium">
              Section 2 <span>▾</span>
            </button>
          </div>
        </div>
      );
    case "switch-1":
      return (
        <div className="flex items-center gap-3">
          <button className="relative h-6 w-11 rounded-full bg-primary">
            <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm translate-x-5" />
          </button>
          <span className="text-sm">Enabled</span>
        </div>
      );
    case "hover-card-1":
      return (
        <div className="group relative w-64 h-40 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600" />
          <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="text-white">
              <h3 className="font-semibold">Hover Card</h3>
              <p className="text-xs text-white/70">Reveals content on hover</p>
            </div>
          </div>
        </div>
      );
    case "scroll-reveal-1":
      return (
        <div className="w-64 p-4 rounded-lg border bg-card">
          <h3 className="font-semibold mb-1">Scroll Reveal</h3>
          <p className="text-sm text-muted-foreground">This element animates when scrolled into view using IntersectionObserver.</p>
        </div>
      );
    case "code-block-1":
      return (
        <div className="w-72 rounded-lg border bg-muted/50 font-mono text-sm">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <span className="text-xs text-muted-foreground">tsx</span>
            <button className="text-xs text-muted-foreground hover:text-foreground">Copy</button>
          </div>
          <pre className="p-4 overflow-x-auto text-xs"><code>{"const greeting = 'Hello, World!';"}</code></pre>
        </div>
      );
    default:
      return (
        <div className="text-sm text-muted-foreground p-8">Preview available in code tab</div>
      );
  }
}

export function SnippetDialog({ snippet, open, onOpenChange }: SnippetDialogProps) {
  if (!snippet) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{snippet.name}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="preview" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="h-9 w-fit">
            <TabsTrigger value="preview" className="text-xs">Preview</TabsTrigger>
            <TabsTrigger value="code" className="text-xs">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="flex-1 overflow-auto mt-0">
            <div className="flex items-center justify-center p-8 bg-[repeating-conic-gradient(#e5e7eb_0%_25%,transparent_0%_50%)] dark:bg-[repeating-conic-gradient(#27272a_0%_25%,transparent_0%_50%)] bg-[length:20px_20px] min-h-[200px] rounded-lg">
              <SnippetPreview id={snippet.id} />
            </div>
          </TabsContent>
          <TabsContent value="code" className="flex-1 overflow-auto mt-0">
            <div className="relative">
              <div className="absolute right-2 top-2 flex gap-1 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => {
                    copyToClipboard(snippet.code);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => downloadFile(snippet.code, `${snippet.id}.tsx`, "text/typescript")}
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
              <Highlight theme={themes.nightOwl} code={snippet.code} language="tsx">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className={className + " p-4 text-xs overflow-auto max-h-[50vh]"}
                    style={{ ...style, background: "transparent" }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
