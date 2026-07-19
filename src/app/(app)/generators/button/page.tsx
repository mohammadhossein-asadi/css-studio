"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import {
  generateButtonCSS,
  generateButtonTailwind,
  generateButtonSCSS,
} from "@/lib/css-generators";
import { buttonPresets } from "@/lib/presets";
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

export default function ButtonPage() {
  const button = useGeneratorStore((s) => s.button);
  const updateButton = useGeneratorStore((s) => s.updateButton);
  const css = generateButtonCSS(button);
  const tailwind = generateButtonTailwind(button);
  const scss = generateButtonSCSS(button);

  const randomize = useCallback(() => {
    const preset = buttonPresets[Math.floor(Math.random() * buttonPresets.length)];
    updateButton(preset);
  }, [updateButton]);

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Size</Label>
        <Select value={button.size} onValueChange={(v) => updateButton({ size: v as "sm" | "md" | "lg" })}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Border Radius: {button.radius}px</Label>
        <Slider className="mt-1.5" value={[button.radius]} min={0} max={9999} step={1} onValueChange={(val) => updateButton({ radius: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Background Color</Label>
        <input type="color" value={button.bgColor} onChange={(e) => updateButton({ bgColor: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Text Color</Label>
        <input type="color" value={button.textColor} onChange={(e) => updateButton({ textColor: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Border Width: {button.borderWidth}px</Label>
        <Slider className="mt-1.5" value={[button.borderWidth]} min={0} max={5} step={1} onValueChange={(val) => updateButton({ borderWidth: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Border Color</Label>
        <input type="color" value={button.borderColor} onChange={(e) => updateButton({ borderColor: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Hover Effect</Label>
        <Select value={button.hoverEffect} onValueChange={(v) => updateButton({ hoverEffect: v as typeof button.hoverEffect })}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="scale">Scale</SelectItem>
            <SelectItem value="glow">Glow</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="ripple">Ripple</SelectItem>
            <SelectItem value="underline">Underline</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Gradient Background</Label>
        <Switch checked={button.gradientBg} onCheckedChange={(v) => updateButton({ gradientBg: v })} />
      </div>
      {button.gradientBg && (
        <>
          <div>
            <Label className="text-xs font-medium">Gradient From</Label>
            <input type="color" value={button.gradientFrom} onChange={(e) => updateButton({ gradientFrom: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
          </div>
          <div>
            <Label className="text-xs font-medium">Gradient To</Label>
            <input type="color" value={button.gradientTo} onChange={(e) => updateButton({ gradientTo: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
          </div>
        </>
      )}
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Shadow</Label>
        <Switch checked={button.shadow} onCheckedChange={(v) => updateButton({ shadow: v })} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Disabled</Label>
        <Switch checked={button.disabled} onCheckedChange={(v) => updateButton({ disabled: v })} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Loading</Label>
        <Switch checked={button.loading} onCheckedChange={(v) => updateButton({ loading: v })} />
      </div>
      <div>
        <Label className="mb-2 block text-xs font-medium">Presets</Label>
        <div className="flex gap-2">
          {buttonPresets.map((preset, i) => (
            <button key={i} className="h-10 flex-1 rounded-lg border bg-card transition-opacity hover:opacity-80" onClick={() => updateButton(preset)}>
              <div className="text-[10px] text-muted-foreground">Preset {i + 1}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const getHoverStyles = (): React.CSSProperties => {
    switch (button.hoverEffect) {
      case "scale":
        return { transform: "scale(1.05)" };
      case "glow":
        return { boxShadow: `0 0 20px ${button.bgColor}66` };
      case "gradient":
        return button.gradientBg
          ? { background: `linear-gradient(135deg, ${button.gradientTo}, ${button.gradientFrom})` }
          : {};
      default:
        return {};
    }
  };

  const preview = (
    <div className="flex flex-col items-center gap-8">
      <div className="group">
        <button
          disabled={button.disabled || button.loading}
          className="inline-flex items-center justify-center transition-all duration-200 group-hover:scale-105"
          style={{
            padding: button.size === "sm" ? "8px 16px" : button.size === "lg" ? "16px 32px" : "12px 24px",
            fontSize: button.size === "sm" ? "14px" : button.size === "lg" ? "18px" : "16px",
            borderRadius: `${button.radius}px`,
            background: button.gradientBg ? `linear-gradient(135deg, ${button.gradientFrom}, ${button.gradientTo})` : button.bgColor,
            color: button.textColor,
            border: button.borderWidth > 0 ? `${button.borderWidth}px solid ${button.borderColor}` : "none",
            boxShadow: button.shadow ? "0 4px 14px rgba(0,0,0,0.15)" : "none",
            cursor: button.disabled ? "not-allowed" : "pointer",
            opacity: button.disabled ? 0.5 : 1,
          }}
        >
          {button.loading && <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
          {button.loading ? "Loading..." : "Button"}
        </button>
        {button.hoverEffect === "underline" && (
          <style>{`
            button:hover { text-decoration: underline; }
          `}</style>
        )}
      </div>
      <p className="text-xs text-muted-foreground">Hover over the button to see the effect</p>
    </div>
  );

  return <GeneratorLayout title="Button Builder" controls={controls} preview={preview} codeCss={css} codeTailwind={tailwind} codeScss={scss} onRandomize={randomize} />;
}
