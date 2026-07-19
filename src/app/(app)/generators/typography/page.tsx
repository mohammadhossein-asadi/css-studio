"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";

const fontFamilies = [
  "Inter",
  "Georgia",
  "Times New Roman",
  "Arial",
  "Courier New",
  "Verdana",
  "system-ui",
  "serif",
  "monospace",
  "cursive",
];

export default function TypographyPage() {
  const config = useGeneratorStore((s) => s.typography);
  const update = useGeneratorStore((s) => s.updateTypography);

  const randomize = useCallback(() => {
    update({
      fontFamily: fontFamilies[Math.floor(Math.random() * fontFamilies.length)],
      fontSize: 16 + Math.floor(Math.random() * 48),
      fontWeight: ([100, 200, 300, 400, 500, 600, 700, 800, 900] as const)[Math.floor(Math.random() * 9)],
      letterSpacing: Math.round((Math.random() * 4 - 2) * 10) / 10,
      lineHeight: Math.round((1 + Math.random() * 1.5) * 10) / 10,
    });
  }, [update]);

  const css = `.typography {
  font-family: "${config.fontFamily}", ${config.fontFamily === "serif" || config.fontFamily === "monospace" || config.fontFamily === "cursive" ? "" : "sans-serif"};
  font-size: ${config.fontSize}px;
  font-weight: ${config.fontWeight};
  line-height: ${config.lineHeight};
  letter-spacing: ${config.letterSpacing}px;
  text-align: ${config.textAlign};
  color: ${config.color};
  text-transform: ${config.textTransform};
  text-decoration: ${config.textDecoration};
  font-style: ${config.fontStyle};
}`;

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Text</Label>
        <Input value={config.text} onChange={(e) => update({ text: e.target.value })} className="mt-1.5 h-9" />
      </div>
      <div>
        <Label className="text-xs font-medium">Font Family</Label>
        <Select value={config.fontFamily} onValueChange={(v) => { if (v) update({ fontFamily: v }); }}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            {fontFamilies.map((f) => (
              <SelectItem key={f} value={f}>{f}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Font Size: {config.fontSize}px</Label>
        <Slider className="mt-1.5" value={[config.fontSize]} min={8} max={120} step={1} onValueChange={(val) => update({ fontSize: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Font Weight: {config.fontWeight}</Label>
        <Select value={String(config.fontWeight)} onValueChange={(v) => { if (v) update({ fontWeight: Number(v) as typeof config.fontWeight }); }}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((w) => (
              <SelectItem key={w} value={String(w)}>{w} ({w === 100 ? "Thin" : w === 400 ? "Regular" : w === 700 ? "Bold" : w === 900 ? "Black" : ""})</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Line Height: {config.lineHeight}</Label>
        <Slider className="mt-1.5" value={[config.lineHeight * 10]} min={8} max={30} step={1} onValueChange={(val) => update({ lineHeight: (val as number) / 10 })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Letter Spacing: {config.letterSpacing}px</Label>
        <Slider className="mt-1.5" value={[(config.letterSpacing + 5) * 10]} min={0} max={100} step={1} onValueChange={(val) => update({ letterSpacing: (val as number) / 10 - 5 })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Text Align</Label>
        <Select value={config.textAlign} onValueChange={(v) => { if (v) update({ textAlign: v as typeof config.textAlign }); }}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="justify">Justify</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Text Transform</Label>
        <Select value={config.textTransform} onValueChange={(v) => { if (v) update({ textTransform: v as typeof config.textTransform }); }}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="uppercase">Uppercase</SelectItem>
            <SelectItem value="lowercase">Lowercase</SelectItem>
            <SelectItem value="capitalize">Capitalize</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Text Decoration</Label>
        <Select value={config.textDecoration} onValueChange={(v) => { if (v) update({ textDecoration: v as typeof config.textDecoration }); }}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="underline">Underline</SelectItem>
            <SelectItem value="line-through">Line Through</SelectItem>
            <SelectItem value="overline">Overline</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Font Style</Label>
        <Select value={config.fontStyle} onValueChange={(v) => { if (v) update({ fontStyle: v as typeof config.fontStyle }); }}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="italic">Italic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Color</Label>
        <input type="color" value={config.color === "currentColor" ? "#000000" : config.color} onChange={(e) => update({ color: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
    </div>
  );

  const preview = (
    <div className="w-full max-w-2xl">
      <div
        style={{
          fontFamily: `"${config.fontFamily}", ${config.fontFamily === "serif" || config.fontFamily === "monospace" || config.fontFamily === "cursive" ? "" : "sans-serif"}`,
          fontSize: `${config.fontSize}px`,
          fontWeight: config.fontWeight,
          lineHeight: config.lineHeight,
          letterSpacing: `${config.letterSpacing}px`,
          textAlign: config.textAlign,
          color: config.color,
          textTransform: config.textTransform,
          textDecoration: config.textDecoration,
          fontStyle: config.fontStyle,
        }}
      >
        {config.text}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-muted-foreground">
        <div className="rounded-lg border p-3">
          <div className="font-medium mb-1">Properties</div>
          <div>Font: {config.fontFamily}</div>
          <div>Size: {config.fontSize}px</div>
          <div>Weight: {config.fontWeight}</div>
        </div>
        <div className="rounded-lg border p-3">
          <div className="font-medium mb-1">Spacing</div>
          <div>Line Height: {config.lineHeight}</div>
          <div>Letter Spacing: {config.letterSpacing}px</div>
          <div>Transform: {config.textTransform}</div>
        </div>
      </div>
    </div>
  );

  return <GeneratorLayout title="Typography Generator" controls={controls} preview={preview} codeCss={css} onRandomize={randomize} />;
}
