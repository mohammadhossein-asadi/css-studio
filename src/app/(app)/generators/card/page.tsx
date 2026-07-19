"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import { generateCardCSS } from "@/lib/css-generators";
import { cardPresets } from "@/lib/presets";
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

export default function CardPage() {
  const card = useGeneratorStore((s) => s.card);
  const updateCard = useGeneratorStore((s) => s.updateCard);
  const css = generateCardCSS(card);

  const randomize = useCallback(() => {
    const preset = cardPresets[Math.floor(Math.random() * cardPresets.length)];
    updateCard(preset);
  }, [updateCard]);

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Variant</Label>
        <Select value={card.variant} onValueChange={(v) => updateCard({ variant: v as typeof card.variant })}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="pricing">Pricing</SelectItem>
            <SelectItem value="profile">Profile</SelectItem>
            <SelectItem value="product">Product</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Padding: {card.padding}px</Label>
        <Slider className="mt-1.5" value={[card.padding]} min={0} max={64} step={1} onValueChange={(val) => updateCard({ padding: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Border Radius: {card.radius}px</Label>
        <Slider className="mt-1.5" value={[card.radius]} min={0} max={40} step={1} onValueChange={(val) => updateCard({ radius: val as number })} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Shadow</Label>
        <Switch checked={card.shadow} onCheckedChange={(v) => updateCard({ shadow: v })} />
      </div>
      {card.shadow && (
        <div>
          <Label className="text-xs font-medium">Shadow Intensity: {card.shadowIntensity}</Label>
          <Slider className="mt-1.5" value={[card.shadowIntensity * 10]} min={1} max={30} step={1} onValueChange={(val) => updateCard({ shadowIntensity: (val as number) / 10 })} />
        </div>
      )}
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Glass Effect</Label>
        <Switch checked={card.glass} onCheckedChange={(v) => updateCard({ glass: v })} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Gradient Background</Label>
        <Switch checked={card.gradientBg} onCheckedChange={(v) => updateCard({ gradientBg: v })} />
      </div>
      {card.gradientBg && (
        <>
          <div>
            <Label className="text-xs font-medium">Gradient From</Label>
            <input type="color" value={card.gradientFrom} onChange={(e) => updateCard({ gradientFrom: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
          </div>
          <div>
            <Label className="text-xs font-medium">Gradient To</Label>
            <input type="color" value={card.gradientTo} onChange={(e) => updateCard({ gradientTo: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
          </div>
        </>
      )}
      <div>
        <Label className="text-xs font-medium">Hover Effect</Label>
        <Select value={card.hoverEffect} onValueChange={(v) => updateCard({ hoverEffect: v as typeof card.hoverEffect })}>
          <SelectTrigger className="mt-1.5 h-9"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="lift">Lift</SelectItem>
            <SelectItem value="glow">Glow</SelectItem>
            <SelectItem value="border">Border</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium">Border Width: {card.borderWidth}px</Label>
        <Slider className="mt-1.5" value={[card.borderWidth]} min={0} max={5} step={1} onValueChange={(val) => updateCard({ borderWidth: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Border Color</Label>
        <input type="color" value={card.borderColor === "transparent" ? "#000000" : card.borderColor} onChange={(e) => updateCard({ borderColor: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="mb-2 block text-xs font-medium">Presets</Label>
        <div className="flex gap-2">
          {cardPresets.map((preset, i) => (
            <button key={i} className="h-10 flex-1 rounded-lg border bg-card transition-opacity hover:opacity-80" onClick={() => updateCard(preset)}>
              <div className="text-[10px] text-muted-foreground">Preset {i + 1}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const cardStyle: React.CSSProperties = {
    padding: `${card.padding}px`,
    borderRadius: `${card.radius}px`,
    boxShadow: card.shadow ? `0 ${4 * card.shadowIntensity}px ${6 * card.shadowIntensity}px rgba(0,0,0,${0.1 * card.shadowIntensity})` : "none",
    backdropFilter: card.glass ? "blur(20px)" : "none",
    background: card.glass ? "rgba(255,255,255,0.15)" : card.gradientBg ? `linear-gradient(135deg, ${card.gradientFrom}, ${card.gradientTo})` : "hsl(var(--card))",
    border: card.borderWidth > 0 ? `${card.borderWidth}px solid ${card.borderColor}` : "1px solid hsl(var(--border))",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const renderCardContent = () => {
    switch (card.variant) {
      case "pricing":
        return (
          <>
            <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Pro Plan</div>
            <h3 className="mb-1 text-2xl font-bold">Business</h3>
            <div className="mb-4 text-3xl font-bold">$49<span className="text-base font-normal text-muted-foreground">/mo</span></div>
            <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Unlimited projects</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Priority support</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Advanced analytics</li>
            </ul>
            <button className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Get Started</button>
          </>
        );
      case "profile":
        return (
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-lg font-bold text-white">JD</div>
            <div>
              <h3 className="text-sm font-semibold">John Doe</h3>
              <p className="text-xs text-muted-foreground">john@example.com</p>
              <p className="mt-1 text-xs text-muted-foreground">Software Engineer</p>
            </div>
          </div>
        );
      case "image":
        return (
          <>
            <div className="mb-3 -mx-6 -mt-6 h-32 bg-gradient-to-br from-blue-500 to-cyan-400" style={{ borderRadius: `${card.radius}px ${card.radius}px 0 0`, marginLeft: `-${card.padding}px`, marginTop: `-${card.padding}px`, width: `calc(100% + ${card.padding * 2}px)` }} />
            <h3 className="mb-1 text-sm font-semibold">Mountain Retreat</h3>
            <p className="mb-3 text-xs text-muted-foreground">A beautiful escape into nature</p>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">Nature</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">Travel</span>
            </div>
          </>
        );
      case "product":
        return (
          <div className="flex gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white text-xl">👟</div>
            <div>
              <h3 className="text-sm font-semibold">Running Shoes</h3>
              <p className="text-xs text-muted-foreground">Ultra comfort, max speed</p>
              <div className="mt-1 text-sm font-bold">$129.99</div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <h3 className="mb-2 text-base font-semibold">Card Title</h3>
            <p className="text-sm text-muted-foreground">This is a sample card with customizable styles and effects. Adjust the controls to see changes in real time.</p>
          </>
        );
    }
  };

  const preview = (
    <div className="w-full max-w-sm">
      <div className="group" style={cardStyle}>
        {renderCardContent()}
      </div>
      {card.glass && (
        <p className="mt-4 text-center text-xs text-muted-foreground">Glass effect works best over colorful backgrounds</p>
      )}
    </div>
  );

  return <GeneratorLayout title="Card Builder" controls={controls} preview={preview} codeCss={css} onRandomize={randomize} />;
}
