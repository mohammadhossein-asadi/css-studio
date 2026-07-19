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
import { Input } from "@/components/ui/input";
import { useCallback } from "react";

export default function TextEffectPage() {
  const config = useGeneratorStore((s) => s.textEffect);
  const update = useGeneratorStore((s) => s.updateTextEffect);

  const randomize = useCallback(() => {
    update({
      type: (["neon", "gradient", "3d", "outline", "glitch", "shadow"] as const)[Math.floor(Math.random() * 6)],
      color1: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      color2: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
    });
  }, [update]);

  const getTextStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontSize: `${config.fontSize}px`,
      fontWeight: "bold",
    };

    switch (config.type) {
      case "neon":
        return {
          ...base,
          color: config.color1,
          textShadow: `0 0 7px ${config.color1}, 0 0 ${10 * config.intensity}px ${config.color1}, 0 0 ${21 * config.intensity}px ${config.color1}, 0 0 ${42 * config.intensity}px ${config.color2}, 0 0 ${82 * config.intensity}px ${config.color2}`,
        };
      case "gradient":
        return {
          ...base,
          background: `linear-gradient(135deg, ${config.color1}, ${config.color2})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        };
      case "3d":
        return {
          ...base,
          color: config.color1,
          textShadow: `1px 1px 0 ${config.color2}, 2px 2px 0 ${config.color2}, 3px 3px 0 ${config.color2}, 4px 4px 0 ${config.color2}`,
        };
      case "outline":
        return {
          ...base,
          color: "transparent",
          WebkitTextStroke: `${config.intensity}px ${config.color1}`,
        };
      case "glitch":
        return {
          ...base,
          color: config.color1,
          position: "relative",
        };
      case "shadow":
        return {
          ...base,
          color: config.color1,
          textShadow: `${config.intensity * 2}px ${config.intensity * 2}px 0 ${config.color2}`,
        };
      default:
        return base;
    }
  };

  const css = (() => {
    switch (config.type) {
      case "neon":
        return `.text-effect {
  font-size: ${config.fontSize}px;
  font-weight: bold;
  color: ${config.color1};
  text-shadow:
    0 0 7px ${config.color1},
    0 0 ${10 * config.intensity}px ${config.color1},
    0 0 ${21 * config.intensity}px ${config.color1},
    0 0 ${42 * config.intensity}px ${config.color2},
    0 0 ${82 * config.intensity}px ${config.color2};
}`;
      case "gradient":
        return `.text-effect {
  font-size: ${config.fontSize}px;
  font-weight: bold;
  background: linear-gradient(135deg, ${config.color1}, ${config.color2});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`;
      case "3d":
        return `.text-effect {
  font-size: ${config.fontSize}px;
  font-weight: bold;
  color: ${config.color1};
  text-shadow:
    1px 1px 0 ${config.color2},
    2px 2px 0 ${config.color2},
    3px 3px 0 ${config.color2},
    4px 4px 0 ${config.color2};
}`;
      case "outline":
        return `.text-effect {
  font-size: ${config.fontSize}px;
  font-weight: bold;
  color: transparent;
  -webkit-text-stroke: ${config.intensity}px ${config.color1};
}`;
      case "glitch":
        return `.text-effect {
  font-size: ${config.fontSize}px;
  font-weight: bold;
  color: ${config.color1};
  position: relative;
}

.text-effect::before,
.text-effect::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.text-effect::before {
  animation: glitch-1 0.3s infinite;
  color: ${config.color2};
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  transform: translate(-2px, -2px);
}

.text-effect::after {
  animation: glitch-2 0.3s infinite;
  color: ${config.color1};
  clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
  transform: translate(2px, 2px);
}`;
      case "shadow":
        return `.text-effect {
  font-size: ${config.fontSize}px;
  font-weight: bold;
  color: ${config.color1};
  text-shadow: ${config.intensity * 2}px ${config.intensity * 2}px 0 ${config.color2};
}`;
      default:
        return "";
    }
  })();

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Type</Label>
        <Select value={config.type} onValueChange={(v) => update({ type: v as typeof config.type })}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="neon">Neon Glow</SelectItem>
            <SelectItem value="gradient">Gradient Text</SelectItem>
            <SelectItem value="3d">3D Text</SelectItem>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="glitch">Glitch</SelectItem>
            <SelectItem value="shadow">Block Shadow</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Text</Label>
        <Input value={config.text} onChange={(e) => update({ text: e.target.value })} className="mt-1.5 h-9" />
      </div>
      <div>
        <Label className="text-xs font-medium">Font Size: {config.fontSize}px</Label>
        <Slider className="mt-1.5" value={[config.fontSize]} min={12} max={120} step={1} onValueChange={(val) => update({ fontSize: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Intensity: {config.intensity}</Label>
        <Slider className="mt-1.5" value={[config.intensity * 10]} min={1} max={30} step={1} onValueChange={(val) => update({ intensity: (val as number) / 10 })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Color 1</Label>
        <input type="color" value={config.color1} onChange={(e) => update({ color1: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Color 2</Label>
        <input type="color" value={config.color2} onChange={(e) => update({ color2: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
    </div>
  );

  const preview = (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-center p-8">
        {config.type === "glitch" ? (
          <div style={getTextStyle()} data-text={config.text}>
            {config.text}
          </div>
        ) : (
          <div style={getTextStyle()}>{config.text}</div>
        )}
      </div>
      {config.type === "glitch" && (
        <style>{`
          @keyframes glitch-1 {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
          }
          @keyframes glitch-2 {
            0% { transform: translate(0); }
            20% { transform: translate(2px, -2px); }
            40% { transform: translate(2px, 2px); }
            60% { transform: translate(-2px, -2px); }
            80% { transform: translate(-2px, 2px); }
            100% { transform: translate(0); }
          }
        `}</style>
      )}
    </div>
  );

  return <GeneratorLayout title="Text Effect" controls={controls} preview={preview} codeCss={css} onRandomize={randomize} />;
}
