"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import {
  generateShadowCSS,
  generateShadowTailwind,
  generateShadowSCSS,
} from "@/lib/css-generators";
import { shadowPresets } from "@/lib/presets";
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

export default function ShadowPage() {
  const shadow = useGeneratorStore((s) => s.shadow);
  const updateShadow = useGeneratorStore((s) => s.updateShadow);
  const css = generateShadowCSS(shadow);
  const tailwind = generateShadowTailwind(shadow);
  const scss = generateShadowSCSS(shadow);

  const addLayer = useCallback(() => {
    updateShadow({
      layers: [...shadow.layers, { id: String(Date.now()), offsetX: 0, offsetY: 0, blur: 10, spread: 0, color: "rgba(0,0,0,0.1)", inset: false }],
    });
  }, [shadow.layers, updateShadow]);

  const removeLayer = useCallback((id: string) => {
    if (shadow.layers.length <= 1) return;
    updateShadow({ layers: shadow.layers.filter((l) => l.id !== id) });
  }, [shadow.layers, updateShadow]);

  const updateLayer = useCallback((id: string, patch: Record<string, unknown>) => {
    updateShadow({ layers: shadow.layers.map((l) => (l.id === id ? { ...l, ...patch } : l)) });
  }, [shadow.layers, updateShadow]);

  const randomize = useCallback(() => {
    const preset = shadowPresets[Math.floor(Math.random() * shadowPresets.length)];
    updateShadow(preset);
  }, [updateShadow]);

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Mode</Label>
        <Select value={shadow.mode} onValueChange={(v) => updateShadow({ mode: v as "box" | "text" })}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="box">Box Shadow</SelectItem>
            <SelectItem value="text">Text Shadow</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Glow Effect</Label>
        <Switch checked={shadow.glow} onCheckedChange={(v) => updateShadow({ glow: v })} />
      </div>
      {shadow.glow && (
        <>
          <div>
            <Label className="text-xs font-medium">Glow Color</Label>
            <input type="color" value={shadow.glowColor} onChange={(e) => updateShadow({ glowColor: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
          </div>
          <div>
            <Label className="text-xs font-medium">Glow Intensity: {shadow.glowIntensity}px</Label>
            <Slider className="mt-1.5" value={[shadow.glowIntensity]} min={1} max={100} step={1} onValueChange={(val) => updateShadow({ glowIntensity: val as number })} />
          </div>
        </>
      )}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-medium">Layers ({shadow.layers.length})</Label>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={addLayer}><Plus className="h-3.5 w-3.5" /></Button>
        </div>
        <div className="space-y-3">
          {shadow.layers.map((layer) => (
            <div key={layer.id} className="rounded-lg border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Layer</span>
                {shadow.layers.length > 1 && (
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeLayer(layer.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[10px]">X: {layer.offsetX}px</Label>
                  <Slider value={[layer.offsetX]} min={-50} max={50} step={1} onValueChange={(val) => updateLayer(layer.id, { offsetX: val as number })} />
                </div>
                <div>
                  <Label className="text-[10px]">Y: {layer.offsetY}px</Label>
                  <Slider value={[layer.offsetY]} min={-50} max={50} step={1} onValueChange={(val) => updateLayer(layer.id, { offsetY: val as number })} />
                </div>
                <div>
                  <Label className="text-[10px]">Blur: {layer.blur}px</Label>
                  <Slider value={[layer.blur]} min={0} max={100} step={1} onValueChange={(val) => updateLayer(layer.id, { blur: val as number })} />
                </div>
                <div>
                  <Label className="text-[10px]">Spread: {layer.spread}px</Label>
                  <Slider value={[layer.spread]} min={-50} max={50} step={1} onValueChange={(val) => updateLayer(layer.id, { spread: val as number })} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="color" value={layer.color.startsWith("rgba") ? "#000000" : layer.color} onChange={(e) => updateLayer(layer.id, { color: e.target.value })} className="h-7 w-7 cursor-pointer rounded border-0" />
                <input type="text" value={layer.color} onChange={(e) => updateLayer(layer.id, { color: e.target.value })} className="h-7 flex-1 rounded border bg-background px-2 text-xs font-mono" />
                <Switch checked={layer.inset} onCheckedChange={(v) => updateLayer(layer.id, { inset: v })} />
                <Label className="text-[10px]">Inset</Label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label className="mb-2 block text-xs font-medium">Presets</Label>
        <div className="flex gap-2">
          {shadowPresets.map((preset, i) => (
            <button key={i} className="h-10 flex-1 rounded-lg border bg-card transition-opacity hover:opacity-80" onClick={() => updateShadow(preset)}>
              <div className="text-[10px] text-muted-foreground">Preset {i + 1}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const shadowValue = shadow.layers
    .map((l) => `${l.inset ? "inset " : ""}${l.offsetX}px ${l.offsetY}px ${l.blur}px ${l.spread}px ${l.color}`)
    .join(", ");

  const glowShadow = shadow.glow
    ? `, 0 0 ${shadow.glowIntensity}px ${shadow.glowColor}`
    : "";

  const preview = (
    <div className="flex flex-col items-center gap-8">
      {shadow.mode === "box" ? (
        <div
          className="flex h-40 w-72 items-center justify-center rounded-xl bg-card text-sm font-medium"
          style={{ boxShadow: shadowValue + glowShadow }}
        >
          Box Shadow
        </div>
      ) : (
        <div className="flex h-40 w-72 items-center justify-center rounded-xl bg-card">
          <span
            className="text-3xl font-bold"
            style={{ textShadow: shadowValue + glowShadow }}
          >
            Text
          </span>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        {shadow.mode === "box" ? "Box shadow applied to a card" : "Text shadow applied to large text"}
      </p>
    </div>
  );

  return <GeneratorLayout title="Shadow Generator" controls={controls} preview={preview} codeCss={css} codeTailwind={tailwind} codeScss={scss} onRandomize={randomize} />;
}
