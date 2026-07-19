"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCallback } from "react";

export default function BlobPage() {
  const blob = useGeneratorStore((s) => s.blob);
  const updateBlob = useGeneratorStore((s) => s.updateBlob);

  const randomize = useCallback(() => {
    updateBlob({
      complexity: 5 + Math.floor(Math.random() * 6),
      speed: 4 + Math.floor(Math.random() * 12),
      color1: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      color2: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      color3: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
    });
  }, [updateBlob]);

  const css = `/* Blob CSS */
.blob {
  width: ${blob.size}px;
  height: ${blob.size}px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  background: linear-gradient(135deg, ${blob.color1}, ${blob.color2}, ${blob.color3});
  animation: morph ${blob.speed}s ease-in-out infinite;
}

@keyframes morph {
  0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
  25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
  50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
  75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
}`;

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Complexity: {blob.complexity}</Label>
        <Slider className="mt-1.5" value={[blob.complexity]} min={3} max={12} step={1} onValueChange={(val) => updateBlob({ complexity: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Animation Speed: {blob.speed}s</Label>
        <Slider className="mt-1.5" value={[blob.speed]} min={1} max={20} step={1} onValueChange={(val) => updateBlob({ speed: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Color 1</Label>
        <input type="color" value={blob.color1} onChange={(e) => updateBlob({ color1: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Color 2</Label>
        <input type="color" value={blob.color2} onChange={(e) => updateBlob({ color2: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Color 3</Label>
        <input type="color" value={blob.color3} onChange={(e) => updateBlob({ color3: e.target.value })} className="mt-1.5 h-8 w-full cursor-pointer rounded border-0" />
      </div>
      <div>
        <Label className="text-xs font-medium">Size: {blob.size}px</Label>
        <Slider className="mt-1.5" value={[blob.size]} min={100} max={500} step={10} onValueChange={(val) => updateBlob({ size: val as number })} />
      </div>
      <div>
        <Label className="text-xs font-medium">Border Width: {blob.borderWidth}px</Label>
        <Slider className="mt-1.5" value={[blob.borderWidth]} min={0} max={10} step={1} onValueChange={(val) => updateBlob({ borderWidth: val as number })} />
      </div>
    </div>
  );

  const preview = (
    <div className="flex items-center justify-center">
      <div
        style={{
          width: `${blob.size}px`,
          height: `${blob.size}px`,
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          background: `linear-gradient(135deg, ${blob.color1}, ${blob.color2}, ${blob.color3})`,
          animation: `morph ${blob.speed}s ease-in-out infinite`,
          border: blob.borderWidth > 0 ? `${blob.borderWidth}px solid ${blob.borderColor}` : "none",
        }}
      />
      <style>{`
        @keyframes morph {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
        }
      `}</style>
    </div>
  );

  return <GeneratorLayout title="Blob Generator" controls={controls} preview={preview} codeCss={css} onRandomize={randomize} />;
}
