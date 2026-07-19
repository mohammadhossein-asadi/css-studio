"use client";

import { GeneratorLayout } from "@/components/shared/GeneratorLayout";
import { useGeneratorStore } from "@/stores/generator-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";

export default function MeshPage() {
  const mesh = useGeneratorStore((s) => s.mesh);
  const updateMesh = useGeneratorStore((s) => s.updateMesh);

  const addPoint = useCallback(() => {
    updateMesh({
      points: [...mesh.points, {
        id: String(Date.now()),
        x: 50,
        y: 50,
        color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
        size: 200,
      }],
    });
  }, [mesh.points, updateMesh]);

  const removePoint = useCallback((id: string) => {
    if (mesh.points.length <= 1) return;
    updateMesh({ points: mesh.points.filter((p) => p.id !== id) });
  }, [mesh.points, updateMesh]);

  const updatePoint = useCallback((id: string, patch: Record<string, unknown>) => {
    updateMesh({ points: mesh.points.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  }, [mesh.points, updateMesh]);

  const randomize = useCallback(() => {
    const points = Array.from({ length: 3 }, (_, i) => ({
      id: String(i),
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
      color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`,
      size: 150 + Math.random() * 200,
    }));
    updateMesh({ points, blur: 40 + Math.floor(Math.random() * 80) });
  }, [updateMesh]);

  const gradients = mesh.points
    .map((p) => `radial-gradient(circle at ${p.x}% ${p.y}%, ${p.color} 0%, transparent ${p.size / 4}px)`)
    .join(", ");

  const css = `/* Mesh Gradient */
.mesh {
  position: relative;
  width: 100%;
  height: 400px;
  background: ${gradients};
  filter: blur(${mesh.blur}px);${mesh.animated ? "\n  animation: meshMove 8s ease-in-out infinite alternate;" : ""}
}${mesh.animated ? `\n\n@keyframes meshMove {\n  0% { transform: scale(1) translate(0, 0); }\n  100% { transform: scale(1.05) translate(2%, 2%); }\n}` : ""}`;

  const controls = (
    <div className="space-y-5">
      <div>
        <Label className="text-xs font-medium">Blur: {mesh.blur}px</Label>
        <Slider className="mt-1.5" value={[mesh.blur]} min={0} max={150} step={1} onValueChange={(val) => updateMesh({ blur: val as number })} />
      </div>
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Animated</Label>
        <Switch checked={mesh.animated} onCheckedChange={(v) => updateMesh({ animated: v })} />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-medium">Points ({mesh.points.length})</Label>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={addPoint}><Plus className="h-3.5 w-3.5" /></Button>
        </div>
        <div className="space-y-3">
          {mesh.points.map((point) => (
            <div key={point.id} className="rounded-lg border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Point</span>
                {mesh.points.length > 1 && (
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removePoint(point.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[10px]">X: {Math.round(point.x)}%</Label>
                  <Slider value={[point.x]} min={0} max={100} step={1} onValueChange={(val) => updatePoint(point.id, { x: val as number })} />
                </div>
                <div>
                  <Label className="text-[10px]">Y: {Math.round(point.y)}%</Label>
                  <Slider value={[point.y]} min={0} max={100} step={1} onValueChange={(val) => updatePoint(point.id, { y: val as number })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[10px]">Size: {point.size}px</Label>
                  <Slider value={[point.size]} min={50} max={500} step={10} onValueChange={(val) => updatePoint(point.id, { size: val as number })} />
                </div>
                <div>
                  <Label className="text-[10px]">Color</Label>
                  <input type="color" value={point.color} onChange={(e) => updatePoint(point.id, { color: e.target.value })} className="mt-1 h-7 w-full cursor-pointer rounded border-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const preview = (
    <div className="relative w-full max-w-lg overflow-hidden rounded-2xl" style={{ height: "300px" }}>
      <div
        className="absolute inset-0"
        style={{
          background: gradients,
          filter: `blur(${mesh.blur}px)`,
          animation: mesh.animated ? "meshMove 8s ease-in-out infinite alternate" : "none",
        }}
      />
      <style>{`
        @keyframes meshMove {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.05) translate(2%, 2%); }
        }
      `}</style>
    </div>
  );

  return <GeneratorLayout title="Mesh Generator" controls={controls} preview={preview} codeCss={css} onRandomize={randomize} />;
}
