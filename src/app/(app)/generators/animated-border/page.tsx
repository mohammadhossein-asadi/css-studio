"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCallback } from "react";

export default function AnimatedBorderPage() {
  const config = useGeneratorStore((s) => s.animatedBorder);
  const update = useGeneratorStore((s) => s.updateAnimatedBorder);

  const randomize = useCallback(() => {
    update({
      color1: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      color2: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      color3: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
    });
  }, [update]);

  const css = `/* Animated Border */
.animated-border {
  position: relative;
  width: ${config.width}px;
  height: ${config.height}px;
  border-radius: ${config.borderRadius}px;
  background: ${config.bgColor};
  overflow: hidden;
}

.animated-border::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${config.borderRadius}px;
  padding: ${config.borderWidth}px;
  background: linear-gradient(
    var(--angle, 0deg),
    ${config.color1},
    ${config.color2},
    ${config.color3},
    ${config.color1}
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: borderRotate ${config.speed}s linear infinite;
}

@keyframes borderRotate {
  to { --angle: 360deg; }
}

@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}`;

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Border Width: {config.borderWidth}px</Label>
        <Slider className="mt-1.5" value={[config.borderWidth]} min={1} max={10} step={1} onValueChange={(val) => update({ borderWidth: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Border Radius: {config.borderRadius}px</Label>
        <Slider className="mt-1.5" value={[config.borderRadius]} min={0} max={50} step={1} onValueChange={(val) => update({ borderRadius: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Width: {config.width}px</Label>
        <Slider className="mt-1.5" value={[config.width]} min={150} max={500} step={10} onValueChange={(val) => update({ width: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Height: {config.height}px</Label>
        <Slider className="mt-1.5" value={[config.height]} min={100} max={400} step={10} onValueChange={(val) => update({ height: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Speed: {config.speed}s</Label>
        <Slider className="mt-1.5" value={[config.speed]} min={1} max={10} step={0.5} onValueChange={(val) => update({ speed: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Color 1</Label>
        <input type="color" value={config.color1} onChange={(e) => update({ color1: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Color 2</Label>
        <input type="color" value={config.color2} onChange={(e) => update({ color2: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Color 3</Label>
        <input type="color" value={config.color3} onChange={(e) => update({ color3: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Background</Label>
        <input type="color" value={config.bgColor} onChange={(e) => update({ bgColor: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
    </div>
  );

  const preview = (
    <div className="flex flex-col items-center gap-6">
      <div className="animated-border-preview" style={{ position: "relative", width: `${config.width}px`, height: `${config.height}px`, borderRadius: `${config.borderRadius}px`, background: config.bgColor, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: `${config.borderRadius}px`,
            padding: `${config.borderWidth}px`,
            background: `conic-gradient(from 0deg, ${config.color1}, ${config.color2}, ${config.color3}, ${config.color1})`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            animation: `borderSpin ${config.speed}s linear infinite`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          Animated Border
        </div>
      </div>
      <style>{`
        @keyframes borderSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  return <GeneratorLayout title="Animated Border" controls={controls} preview={preview} codeCss={css} onRandomize={randomize} />;
}
