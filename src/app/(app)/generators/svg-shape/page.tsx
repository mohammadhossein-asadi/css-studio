"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import { generateSvgShapeCSS } from "@/lib/css-generators";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";

function generateShape(svgShape: { type: string; width: number; height: number; complexity: number; color1: string; color2: string }): string {
  const { width, height, complexity, color1, color2 } = svgShape;
  const id = `grad-${Date.now()}`;

  const gradient = `<defs><linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="${color1}" /><stop offset="100%" stop-color="${color2}" /></linearGradient></defs>`;

  switch (svgShape.type) {
    case "wave": {
      let d = `M0 ${height}`;
      for (let i = 0; i <= complexity; i++) {
        const x = (width / complexity) * i;
        const y = i % 2 === 0 ? height * 0.3 : height * 0.7;
        d += ` Q${x + width / (complexity * 2)} ${y} ${x + width / complexity} ${height}`;
      }
      d += ` L${width} 0 L0 0 Z`;
      return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${gradient}<path d="${d}" fill="url(#${id})" /></svg>`;
    }
    case "blob": {
      const points: [number, number][] = [];
      const cx = width / 2;
      const cy = height / 2;
      const r = Math.min(width, height) * 0.35;
      for (let i = 0; i < complexity; i++) {
        const angle = (Math.PI * 2 * i) / complexity;
        const variation = 0.7 + Math.sin(i * 1.5) * 0.3;
        points.push([cx + r * variation * Math.cos(angle), cy + r * variation * Math.sin(angle)]);
      }
      let d = `M${points[0][0]} ${points[0][1]}`;
      for (let i = 0; i < points.length; i++) {
        const curr = points[i];
        const next = points[(i + 1) % points.length];
        const cpx = (curr[0] + next[0]) / 2;
        const cpy = (curr[1] + next[1]) / 2;
        d += ` Q${curr[0]} ${curr[1]} ${cpx} ${cpy}`;
      }
      d += " Z";
      return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${gradient}<path d="${d}" fill="url(#${id})" /></svg>`;
    }
    case "curve": {
      let d = `M0 ${height * 0.5}`;
      for (let i = 0; i <= complexity; i++) {
        const x = (width / complexity) * i;
        const y = height * 0.5 + Math.sin((i / complexity) * Math.PI * 2) * height * 0.3;
        d += ` Q${x - width / (complexity * 2)} ${y} ${x} ${y}`;
      }
      d += ` L${width} ${height} L0 ${height} Z`;
      return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${gradient}<path d="${d}" fill="url(#${id})" /></svg>`;
    }
    case "divider": {
      const midY = height / 2;
      let d = `M0 0 L${width} 0 L${width} ${midY}`;
      for (let i = complexity; i >= 0; i--) {
        const x = (width / complexity) * i;
        const y = midY + (i % 2 === 0 ? -1 : 1) * height * 0.2;
        d += ` Q${x + width / (complexity * 2)} ${y} ${x} ${midY}`;
      }
      d += ` L0 ${midY} Z`;
      return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${gradient}<path d="${d}" fill="url(#${id})" /></svg>`;
    }
    default: {
      const cx = width / 2;
      const cy = height / 2;
      return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${gradient}<circle cx="${cx}" cy="${cy}" r="${Math.min(width, height) * 0.35}" fill="url(#${id})" /></svg>`;
    }
  }
}

export default function SvgShapePage() {
  const svgShape = useGeneratorStore((s) => s.svgShape);
  const updateSvgShape = useGeneratorStore((s) => s.updateSvgShape);
  const svgMarkup = generateShape(svgShape);
  const css = generateSvgShapeCSS(svgShape);

  const randomize = useCallback(() => {
    updateSvgShape({
      type: (["wave", "blob", "curve", "divider"] as const)[Math.floor(Math.random() * 4)],
      color1: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      color2: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      complexity: 2 + Math.floor(Math.random() * 6),
    });
  }, [updateSvgShape]);

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Type</Label>
        <Select value={svgShape.type} onValueChange={(v) => updateSvgShape({ type: v as typeof svgShape.type })}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="wave">Wave</SelectItem>
            <SelectItem value="blob">Blob</SelectItem>
            <SelectItem value="curve">Curve</SelectItem>
            <SelectItem value="divider">Divider</SelectItem>
            <SelectItem value="abstract">Abstract</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Width: {svgShape.width}px</Label>
        <Slider className="mt-1.5" value={[svgShape.width]} min={200} max={1200} step={10} onValueChange={(val) => updateSvgShape({ width: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Height: {svgShape.height}px</Label>
        <Slider className="mt-1.5" value={[svgShape.height]} min={50} max={400} step={10} onValueChange={(val) => updateSvgShape({ height: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Complexity: {svgShape.complexity}</Label>
        <Slider className="mt-1.5" value={[svgShape.complexity]} min={2} max={10} step={1} onValueChange={(val) => updateSvgShape({ complexity: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Color 1</Label>
        <input type="color" value={svgShape.color1} onChange={(e) => updateSvgShape({ color1: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Color 2</Label>
        <input type="color" value={svgShape.color2} onChange={(e) => updateSvgShape({ color2: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Animated</Label>
        <Switch checked={svgShape.animated} onCheckedChange={(v) => updateSvgShape({ animated: v })} />
      </div>
      {svgShape.animated && (
        <div>
          <Label className="text-xs font-medium">Animation Speed: {svgShape.animationSpeed}s</Label>
          <Slider className="mt-1.5" value={[svgShape.animationSpeed]} min={1} max={10} step={0.5} onValueChange={(val) => updateSvgShape({ animationSpeed: val as number })} />
        </div>
      )}
    </div>
  );

  const preview = (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg border bg-background">
      <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
    </div>
  );

  return <GeneratorLayout title="SVG Shape Generator" controls={controls} preview={preview} codeCss={`${css}\n\n${svgMarkup}`} onRandomize={randomize} />;
}
