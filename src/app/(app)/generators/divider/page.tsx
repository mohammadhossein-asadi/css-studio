"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
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

export default function DividerPage() {
  const config = useGeneratorStore((s) => s.divider);
  const update = useGeneratorStore((s) => s.updateDivider);

  const randomize = useCallback(() => {
    update({
      type: (["wave", "triangle", "curtain", "arrow", "zigzag"] as const)[Math.floor(Math.random() * 5)],
      color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      height: 50 + Math.floor(Math.random() * 100),
    });
  }, [update]);

  const getDividerPath = () => {
    const w = 1200;
    const h = config.height;
    const flip = config.flip ? -1 : 1;

    switch (config.type) {
      case "wave":
        return `M0,${h} C${w * 0.25},${h * 0.2} ${w * 0.75},${h * 0.8} ${w},0 L${w},${h} Z`;
      case "triangle":
        return `M0,${h} L${w / 2},0 L${w},${h} Z`;
      case "curtain":
        return `M0,0 Q${w * 0.25},${h} ${w * 0.5},0 Q${w * 0.75},${h} ${w},0 L${w},${h} L0,${h} Z`;
      case "arrow":
        return `M0,${h} L${w * 0.35},${h} L${w * 0.5},0 L${w * 0.65},${h} L${w},${h} L${w},${h * 0.7} L${w * 0.5},${h * 0.3} L0,${h * 0.7} Z`;
      case "zigzag": {
        let d = `M0,${h}`;
        const segments = 8;
        for (let i = 0; i < segments; i++) {
          const x1 = (w / segments) * i + w / (segments * 2);
          const x2 = (w / segments) * (i + 1);
          const y = i % 2 === 0 ? 0 : h;
          d += ` L${x1},${y} L${x2},${i % 2 === 0 ? h : 0}`;
        }
        d += ` L${w},${h} Z`;
        return d;
      }
      default:
        return `M0,${h} C${w * 0.25},${h * 0.2} ${w * 0.75},${h * 0.8} ${w},0 L${w},${h} Z`;
    }
  };

  const css = `/* Section Divider */
.section-divider {
  width: 100%;
  height: ${config.height}px;
  overflow: hidden;
}

.section-divider svg {
  width: 100%;
  height: 100%;
  display: block;
}`;

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Type</Label>
        <Select value={config.type} onValueChange={(v) => update({ type: v as typeof config.type })}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="wave">Wave</SelectItem>
            <SelectItem value="triangle">Triangle</SelectItem>
            <SelectItem value="curtain">Curtain</SelectItem>
            <SelectItem value="arrow">Arrow</SelectItem>
            <SelectItem value="zigzag">Zigzag</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Height: {config.height}px</Label>
        <Slider className="mt-1.5" value={[config.height]} min={30} max={200} step={5} onValueChange={(val) => update({ height: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Divider Color</Label>
        <input type="color" value={config.color} onChange={(e) => update({ color: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Background Color</Label>
        <input type="color" value={config.backgroundColor} onChange={(e) => update({ backgroundColor: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Flip</Label>
        <Switch checked={config.flip} onCheckedChange={(v) => update({ flip: v })} />
      </div>
    </div>
  );

  const preview = (
    <div className="w-full max-w-2xl">
      <div className="rounded-lg border overflow-hidden">
        <div className="p-4 text-center text-sm text-muted-foreground" style={{ background: config.backgroundColor }}>
          Section Above
        </div>
        <svg viewBox={`0 0 1200 ${config.height}`} preserveAspectRatio="none" className="w-full" style={{ height: `${config.height}px`, transform: config.flip ? "scaleY(-1)" : undefined }}>
          <path d={getDividerPath()} fill={config.color} />
        </svg>
        <div className="p-4 text-center text-sm text-muted-foreground" style={{ background: config.backgroundColor }}>
          Section Below
        </div>
      </div>
    </div>
  );

  return <GeneratorLayout title="Section Divider" controls={controls} preview={preview} codeCss={css} onRandomize={randomize} />;
}
