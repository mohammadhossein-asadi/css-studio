"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import {
  generateGradientCSS,
  generateGradientTailwind,
  generateGradientSCSS,
} from "@/lib/css-generators";
import { gradientPresets } from "@/lib/presets";
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
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";

export default function GradientPage() {
  const gradient = useGeneratorStore((s) => s.gradient);
  const updateGradient = useGeneratorStore((s) => s.updateGradient);

  const css = generateGradientCSS(gradient);
  const tailwind = generateGradientTailwind(gradient);
  const scss = generateGradientSCSS(gradient);

  const addStop = useCallback(() => {
    const stops = [...gradient.colorStops];
    stops.push({ id: String(Date.now()), color: "#000000", position: 50 });
    updateGradient({ colorStops: stops });
  }, [gradient.colorStops, updateGradient]);

  const removeStop = useCallback(
    (id: string) => {
      if (gradient.colorStops.length <= 2) return;
      updateGradient({ colorStops: gradient.colorStops.filter((s) => s.id !== id) });
    },
    [gradient.colorStops, updateGradient]
  );

  const updateStop = useCallback(
    (id: string, patch: { color?: string; position?: number }) => {
      updateGradient({
        colorStops: gradient.colorStops.map((s) => (s.id === id ? { ...s, ...patch } : s)),
      });
    },
    [gradient.colorStops, updateGradient]
  );

  const randomize = useCallback(() => {
    const preset = gradientPresets[Math.floor(Math.random() * gradientPresets.length)];
    updateGradient(preset);
  }, [updateGradient]);

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Type</Label>
        <Select value={gradient.type} onValueChange={(v) => updateGradient({ type: v as "linear" | "radial" | "conic" })}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="radial">Radial</SelectItem>
            <SelectItem value="conic">Conic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Angle: {gradient.angle}deg</Label>
        <Slider className="mt-1.5" value={[gradient.angle]} min={0} max={360} step={1} onValueChange={(val) => updateGradient({ angle: val as number })} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Repeating</Label>
        <Switch checked={gradient.repeating} onCheckedChange={(v) => updateGradient({ repeating: v })} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Animated</Label>
        <Switch checked={gradient.animated} onCheckedChange={(v) => updateGradient({ animated: v })} />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-medium">Color Stops ({gradient.colorStops.length})</Label>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={addStop}><Plus className="h-3.5 w-3.5" /></Button>
        </div>
        <div className="space-y-2">
          {gradient.colorStops.map((stop) => (
            <div key={stop.id} className="flex items-center gap-2 rounded-lg border p-2">
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                className="h-8 w-8 shrink-0 cursor-pointer rounded border-0"
              />
              <input
                type="text"
                value={stop.color}
                onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                className="h-8 w-24 shrink-0 rounded border bg-background px-2 text-xs font-mono"
              />
              <Slider
                className="flex-1"
                value={[stop.position]}
                min={0}
                max={100}
                step={1}
                onValueChange={(val) => updateStop(stop.id, { position: val as number })}
              />
              <span className="w-8 shrink-0 text-right text-[10px] text-muted-foreground">{stop.position}%</span>
              {gradient.colorStops.length > 2 && (
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => removeStop(stop.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label className="mb-2 block text-xs font-medium">Presets</Label>
        <div className="grid grid-cols-3 gap-2">
          {gradientPresets.map((preset, i) => (
            <button key={i} className="h-10 rounded-lg border transition-opacity hover:opacity-80"
              style={{ background: `${preset.type}-gradient(${preset.angle}deg, ${preset.colorStops.map((s) => `${s.color} ${s.position}%`).join(", ")})` }}
              onClick={() => updateGradient(preset)} />
          ))}
        </div>
      </div>
    </div>
  );

  const gradientCSS = `${gradient.repeating ? "repeating-" : ""}${gradient.type}-gradient(${gradient.type === "radial" ? "circle" : gradient.type === "conic" ? `from ${gradient.angle}deg` : `${gradient.angle}deg`}, ${gradient.colorStops.map((s) => `${s.color} ${s.position}%`).join(", ")})`;

  const preview = (
    <div className="flex flex-col items-center gap-6">
      <div
        className="h-64 w-full max-w-md rounded-2xl shadow-lg"
        style={{ background: gradientCSS }}
      />
      <p className="text-xs text-muted-foreground font-mono">{gradientCSS}</p>
    </div>
  );

  return <GeneratorLayout title="Gradient Generator" controls={controls} preview={preview} codeCss={css} codeTailwind={tailwind} codeScss={scss} onRandomize={randomize} />;
}
