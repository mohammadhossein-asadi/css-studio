"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, Shuffle, Download } from "lucide-react";
import { useState, type ReactNode } from "react";
import { copyToClipboard } from "@/lib/export";
import { toast } from "sonner";

interface GeneratorLayoutProps {
  title: string;
  controls: ReactNode;
  preview: ReactNode;
  codeCss: string;
  codeTailwind?: string;
  codeScss?: string;
  codeReact?: string;
  onRandomize?: () => void;
}

export function GeneratorLayout({
  title,
  controls,
  preview,
  codeCss,
  codeTailwind,
  codeScss,
  codeReact,
  onRandomize,
}: GeneratorLayoutProps) {
  const [activeTab, setActiveTab] = useState("css");

  const codeMap: Record<string, string> = {
    css: codeCss,
    ...(codeTailwind && { tailwind: codeTailwind }),
    ...(codeScss && { scss: codeScss }),
    ...(codeReact && { react: codeReact }),
  };

  return (
    <div className="flex h-full flex-col">
      {/* Top Bar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b px-4">
        <h1 className="text-sm font-semibold">{title}</h1>
        <div className="flex items-center gap-1">
          {onRandomize && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRandomize}>
              <Shuffle className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              copyToClipboard(codeMap[activeTab] ?? codeCss);
              toast.success("Copied to clipboard");
            }}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              const { downloadFile } = require("@/lib/export");
              downloadFile(codeMap[activeTab] ?? codeCss, `${title.toLowerCase().replace(/\s+/g, "-")}.${activeTab === "scss" ? "scss" : "css"}`);
              toast.success("Downloaded");
            }}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Controls Panel */}
        <div className="w-80 shrink-0 border-r">
          <ScrollArea className="h-full">
            <div className="p-4">{controls}</div>
          </ScrollArea>
        </div>

        {/* Preview + Code */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Preview */}
          <div className="flex-1 overflow-auto bg-[repeating-conic-gradient(#e5e7eb_0%_25%,transparent_0%_50%)] dark:bg-[repeating-conic-gradient(#27272a_0%_25%,transparent_0%_50%)] bg-[length:20px_20px]">
            <div className="flex min-h-full items-center justify-center p-8">
              {preview}
            </div>
          </div>

          {/* Code Output */}
          <div className="shrink-0 border-t">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between border-b px-4">
                <TabsList className="h-9">
                  <TabsTrigger value="css" className="text-xs">CSS</TabsTrigger>
                  {codeTailwind && <TabsTrigger value="tailwind" className="text-xs">Tailwind</TabsTrigger>}
                  {codeScss && <TabsTrigger value="scss" className="text-xs">SCSS</TabsTrigger>}
                  {codeReact && <TabsTrigger value="react" className="text-xs">React</TabsTrigger>}
                </TabsList>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => {
                    copyToClipboard(codeMap[activeTab] ?? codeCss);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy
                </Button>
              </div>
              <div className="h-48 overflow-auto p-4">
                <pre className="text-xs font-mono text-foreground whitespace-pre-wrap leading-relaxed">
                  {codeMap[activeTab] ?? codeCss}
                </pre>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
