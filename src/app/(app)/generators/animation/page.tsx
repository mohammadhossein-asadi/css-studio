"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";

export default function AnimationPage() {
  const config = useGeneratorStore((s) => s.animation);
  const update = useGeneratorStore((s) => s.updateAnimation);

  const randomize = useCallback(() => {
    const types = ["bounce", "pulse", "spin", "shake", "float", "slide", "fade", "rubberBand", "flip", "jello"] as const;
    update({
      type: types[Math.floor(Math.random() * types.length)],
      color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
    });
  }, [update]);

  const getAnimationCSS = () => {
    const { type, duration, delay, iterationCount, timingFunction } = config;
    const iter = iterationCount === "infinite" ? "infinite" : String(iterationCount);
    return `animation: ${type} ${duration}s ${timingFunction} ${delay}s ${iter};`;
  };

  const getKeyframes = () => {
    switch (config.type) {
      case "bounce":
        return `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}`;
      case "pulse":
        return `@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}`;
      case "spin":
        return `@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}`;
      case "shake":
        return `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}`;
      case "float":
        return `@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(2deg); }
  75% { transform: translateY(5px) rotate(-2deg); }
}`;
      case "slide":
        return `@keyframes slide {
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}`;
      case "fade":
        return `@keyframes fade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`;
      case "rubberBand":
        return `@keyframes rubberBand {
  0% { transform: scale(1); }
  30% { transform: scaleX(1.25) scaleY(0.75); }
  40% { transform: scaleX(0.75) scaleY(1.25); }
  50% { transform: scaleX(1.15) scaleY(0.85); }
  65% { transform: scaleX(0.95) scaleY(1.05); }
  75% { transform: scaleX(1.05) scaleY(0.95); }
  100% { transform: scale(1); }
}`;
      case "flip":
        return `@keyframes flip {
  0% { transform: perspective(400px) rotateY(0); }
  40% { transform: perspective(400px) rotateY(-180deg); }
  100% { transform: perspective(400px) rotateY(-360deg); }
}`;
      case "jello":
        return `@keyframes jello {
  0%, 100% { transform: skewX(0deg) skewY(0deg); }
  30% { transform: skewX(-12.5deg) skewY(-12.5deg); }
  40% { transform: skewX(6.25deg) skewY(6.25deg); }
  50% { transform: skewX(-3.125deg) skewY(-3.125deg); }
  65% { transform: skewX(1.5625deg) skewY(1.5625deg); }
  75% { transform: skewX(-0.78125deg) skewY(-0.78125deg); }
}`;
      default:
        return "";
    }
  };

  const getAnimationStyle = (): React.CSSProperties => {
    const iter = config.iterationCount === "infinite" ? "infinite" : String(config.iterationCount);
    return {
      animation: `${config.type} ${config.duration}s ${config.timingFunction} ${config.delay}s ${iter}`,
    };
  };

  const css = `.element {
  width: ${config.elementSize}px;
  height: ${config.elementSize}px;
  background: ${config.color};
  border-radius: 12px;
  ${getAnimationCSS()}
}

${getKeyframes()}`;

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Animation Type</Label>
        <Select value={config.type} onValueChange={(v) => { if (v) update({ type: v as typeof config.type }); }}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="bounce">Bounce</SelectItem>
            <SelectItem value="pulse">Pulse</SelectItem>
            <SelectItem value="spin">Spin</SelectItem>
            <SelectItem value="shake">Shake</SelectItem>
            <SelectItem value="float">Float</SelectItem>
            <SelectItem value="slide">Slide</SelectItem>
            <SelectItem value="fade">Fade</SelectItem>
            <SelectItem value="rubberBand">Rubber Band</SelectItem>
            <SelectItem value="flip">Flip</SelectItem>
            <SelectItem value="jello">Jello</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Duration: {config.duration}s</Label>
        <Slider className="mt-1.5" value={[config.duration * 10]} min={1} max={50} step={1} onValueChange={(val) => update({ duration: (val as number) / 10 })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Delay: {config.delay}s</Label>
        <Slider className="mt-1.5" value={[config.delay * 10]} min={0} max={30} step={1} onValueChange={(val) => update({ delay: (val as number) / 10 })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Element Size: {config.elementSize}px</Label>
        <Slider className="mt-1.5" value={[config.elementSize]} min={20} max={200} step={5} onValueChange={(val) => update({ elementSize: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Color</Label>
        <input type="color" value={config.color} onChange={(e) => update({ color: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Timing Function</Label>
        <Select value={config.timingFunction} onValueChange={(v) => { if (v) update({ timingFunction: v as typeof config.timingFunction }); }}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ease">Ease</SelectItem>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="ease-in">Ease In</SelectItem>
            <SelectItem value="ease-out">Ease Out</SelectItem>
            <SelectItem value="ease-in-out">Ease In Out</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Iteration Count</Label>
        <Select value={String(config.iterationCount)} onValueChange={(v) => { if (v) update({ iterationCount: v === "infinite" ? "infinite" : Number(v) }); }}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="infinite">Infinite</SelectItem>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const preview = (
    <div className="flex flex-col items-center gap-8">
      <div className="flex h-64 w-full items-center justify-center">
        <div
          style={{
            width: `${config.elementSize}px`,
            height: `${config.elementSize}px`,
            background: config.color,
            borderRadius: "12px",
            ...getAnimationStyle(),
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground font-mono">{config.type} {config.duration}s {config.timingFunction}</p>
    </div>
  );

  return <GeneratorLayout title="Animation Generator" controls={controls} preview={preview} codeCss={css} onRandomize={randomize} />;
}
