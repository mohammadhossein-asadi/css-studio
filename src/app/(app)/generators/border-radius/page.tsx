"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import {
  generateBorderRadiusCSS,
  generateBorderRadiusTailwind,
  generateBorderRadiusSCSS,
} from "@/lib/css-generators";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCallback } from "react";

export default function BorderRadiusPage() {
  const borderRadius = useGeneratorStore((s) => s.borderRadius);
  const updateBorderRadius = useGeneratorStore((s) => s.updateBorderRadius);
  const css = generateBorderRadiusCSS(borderRadius);
  const tailwind = generateBorderRadiusTailwind(borderRadius);
  const scss = generateBorderRadiusSCSS(borderRadius);

  const randomize = useCallback(() => {
    updateBorderRadius({
      topLeft: Math.floor(Math.random() * 100),
      topRight: Math.floor(Math.random() * 100),
      bottomRight: Math.floor(Math.random() * 100),
      bottomLeft: Math.floor(Math.random() * 100),
    });
  }, [updateBorderRadius]);

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Top Left: {borderRadius.topLeft}px</Label>
        <Slider className="mt-1.5" value={[borderRadius.topLeft]} min={0} max={200} step={1} onValueChange={(val) => updateBorderRadius({ topLeft: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Top Right: {borderRadius.topRight}px</Label>
        <Slider className="mt-1.5" value={[borderRadius.topRight]} min={0} max={200} step={1} onValueChange={(val) => updateBorderRadius({ topRight: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Bottom Right: {borderRadius.bottomRight}px</Label>
        <Slider className="mt-1.5" value={[borderRadius.bottomRight]} min={0} max={200} step={1} onValueChange={(val) => updateBorderRadius({ bottomRight: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Bottom Left: {borderRadius.bottomLeft}px</Label>
        <Slider className="mt-1.5" value={[borderRadius.bottomLeft]} min={0} max={200} step={1} onValueChange={(val) => updateBorderRadius({ bottomLeft: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Width: {borderRadius.width}px</Label>
        <Slider className="mt-1.5" value={[borderRadius.width]} min={50} max={400} step={10} onValueChange={(val) => updateBorderRadius({ width: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Height: {borderRadius.height}px</Label>
        <Slider className="mt-1.5" value={[borderRadius.height]} min={50} max={400} step={10} onValueChange={(val) => updateBorderRadius({ height: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Color</Label>
        <input type="color" value={borderRadius.color} onChange={(e) => updateBorderRadius({ color: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
    </div>
  );

  const preview = (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Grid reference lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 h-full w-px border-l border-dashed border-muted-foreground/20" />
          <div className="absolute top-1/2 left-0 w-full h-px border-t border-dashed border-muted-foreground/20" />
        </div>
        <div
          style={{
            width: `${borderRadius.width}px`,
            height: `${borderRadius.height}px`,
            borderRadius: `${borderRadius.topLeft}px ${borderRadius.topRight}px ${borderRadius.bottomRight}px ${borderRadius.bottomLeft}px`,
            background: borderRadius.color,
            transition: "all 0.2s ease",
          }}
        />
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span>TL: {borderRadius.topLeft}px</span>
        <span>TR: {borderRadius.topRight}px</span>
        <span>BR: {borderRadius.bottomRight}px</span>
        <span>BL: {borderRadius.bottomLeft}px</span>
      </div>
    </div>
  );

  return <GeneratorLayout title="Border Radius Generator" controls={controls} preview={preview} codeCss={css} codeTailwind={tailwind} codeScss={scss} onRandomize={randomize} />;
}
