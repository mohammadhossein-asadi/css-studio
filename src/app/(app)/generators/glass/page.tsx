"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import {
  generateGlassCSS,
  generateGlassTailwind,
  generateGlassSCSS,
} from "@/lib/css-generators";
import { glassPresets } from "@/lib/presets";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useCallback } from "react";

export default function GlassPage() {
  const glass = useGeneratorStore((s) => s.glass);
  const updateGlass = useGeneratorStore((s) => s.updateGlass);
  const css = generateGlassCSS(glass);
  const tailwind = generateGlassTailwind(glass);
  const scss = generateGlassSCSS(glass);

  const randomize = useCallback(() => {
    const preset = glassPresets[Math.floor(Math.random() * glassPresets.length)];
    updateGlass(preset);
  }, [updateGlass]);

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Blur: {glass.blur}px</Label>
        <Slider className="mt-1.5" value={[glass.blur]} min={0} max={50} step={1} onValueChange={(val) => updateGlass({ blur: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Opacity: {Math.round(glass.opacity * 100)}%</Label>
        <Slider className="mt-1.5" value={[glass.opacity * 100]} min={0} max={100} step={1} onValueChange={(val) => updateGlass({ opacity: (val as number) / 100 })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Saturation: {glass.saturation}%</Label>
        <Slider className="mt-1.5" value={[glass.saturation]} min={0} max={300} step={10} onValueChange={(val) => updateGlass({ saturation: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Border Width: {glass.borderWidth}px</Label>
        <Slider className="mt-1.5" value={[glass.borderWidth]} min={0} max={5} step={1} onValueChange={(val) => updateGlass({ borderWidth: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Border Color</Label>
        <input type="text" value={glass.borderColor} onChange={(e) => updateGlass({ borderColor: e.target.value })} className="mt-1.5 h-8 w-full rounded border bg-background px-2 text-xs font-mono" />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Noise Overlay</Label>
        <Switch checked={glass.noise} onCheckedChange={(v) => updateGlass({ noise: v })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Tint Color</Label>
        <input type="color" value={glass.tint} onChange={(e) => updateGlass({ tint: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Tint Opacity: {Math.round(glass.tintOpacity * 100)}%</Label>
        <Slider className="mt-1.5" value={[glass.tintOpacity * 100]} min={0} max={100} step={1} onValueChange={(val) => updateGlass({ tintOpacity: (val as number) / 100 })} />
      </div>
      <div>
        <Label className="mb-2 block text-xs font-medium">Presets</Label>
        <div className="flex gap-2">
          {glassPresets.map((preset, i) => (
            <button key={i} className="h-10 flex-1 rounded-lg border bg-gradient-to-br from-violet-500/20 to-pink-500/20 transition-opacity hover:opacity-80" onClick={() => updateGlass(preset)} />
          ))}
        </div>
      </div>
    </div>
  );

  const preview = (
    <div className="relative h-72 w-full max-w-md overflow-hidden rounded-2xl">
      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500" />
      {/* Decorative circles for better glass effect */}
      <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-yellow-400/40 blur-sm" />
      <div className="absolute right-12 bottom-12 h-16 w-16 rounded-full bg-cyan-400/40 blur-sm" />
      <div className="absolute right-24 top-16 h-12 w-12 rounded-full bg-emerald-400/40 blur-sm" />
      {/* Glass card */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div
          className="w-full rounded-xl p-6"
          style={{
            backdropFilter: `blur(${glass.blur}px) saturate(${glass.saturation}%)`,
            WebkitBackdropFilter: `blur(${glass.blur}px) saturate(${glass.saturation}%)`,
            background: `${glass.tint}${Math.round(glass.tintOpacity * 255).toString(16).padStart(2, "0")}`,
            opacity: glass.opacity,
            border: `${glass.borderWidth}px solid ${glass.borderColor}`,
          }}
        >
          <h3 className="mb-2 text-lg font-semibold text-white">Glass Effect</h3>
          <p className="text-sm text-white/70">
            This card uses backdrop-filter to create a frosted glass effect over the colorful background.
          </p>
          {glass.noise && (
            <p className="mt-2 text-xs text-white/50 italic">Noise overlay enabled</p>
          )}
        </div>
      </div>
    </div>
  );

  return <GeneratorLayout title="Glass Generator" controls={controls} preview={preview} codeCss={css} codeTailwind={tailwind} codeScss={scss} onRandomize={randomize} />;
}
