import type { GradientConfig, ShadowConfig, GlassConfig, ButtonConfig, CardConfig } from "@/types";

export const gradientPresets: GradientConfig[] = [
  {
    type: "linear",
    angle: 135,
    colorStops: [
      { id: "1", color: "#667eea", position: 0 },
      { id: "2", color: "#764ba2", position: 100 },
    ],
    repeating: false,
    animated: false,
  },
  {
    type: "linear",
    angle: 90,
    colorStops: [
      { id: "1", color: "#f093fb", position: 0 },
      { id: "2", color: "#f5576c", position: 100 },
    ],
    repeating: false,
    animated: false,
  },
  {
    type: "linear",
    angle: 180,
    colorStops: [
      { id: "1", color: "#4facfe", position: 0 },
      { id: "2", color: "#00f2fe", position: 100 },
    ],
    repeating: false,
    animated: false,
  },
  {
    type: "radial",
    angle: 0,
    colorStops: [
      { id: "1", color: "#fa709a", position: 0 },
      { id: "2", color: "#fee140", position: 100 },
    ],
    repeating: false,
    animated: false,
  },
  {
    type: "conic",
    angle: 0,
    colorStops: [
      { id: "1", color: "#a18cd1", position: 0 },
      { id: "2", color: "#fbc2eb", position: 25 },
      { id: "3", color: "#a6c1ee", position: 50 },
      { id: "4", color: "#fbc2eb", position: 75 },
      { id: "5", color: "#a18cd1", position: 100 },
    ],
    repeating: false,
    animated: false,
  },
  {
    type: "linear",
    angle: 45,
    colorStops: [
      { id: "1", color: "#ff9a9e", position: 0 },
      { id: "2", color: "#fecfef", position: 50 },
      { id: "3", color: "#fecfef", position: 100 },
    ],
    repeating: false,
    animated: false,
  },
];

export const shadowPresets: ShadowConfig[] = [
  {
    mode: "box",
    layers: [{ id: "1", offsetX: 0, offsetY: 4, blur: 6, spread: -1, color: "rgba(0,0,0,0.1)", inset: false }],
    glow: false,
    glowColor: "#667eea",
    glowIntensity: 20,
  },
  {
    mode: "box",
    layers: [
      { id: "1", offsetX: 0, offsetY: 2, blur: 4, spread: -2, color: "rgba(0,0,0,0.05)", inset: false },
      { id: "2", offsetX: 0, offsetY: 4, blur: 6, spread: -1, color: "rgba(0,0,0,0.1)", inset: false },
      { id: "3", offsetX: 0, offsetY: 8, blur: 24, spread: 0, color: "rgba(0,0,0,0.1)", inset: false },
    ],
    glow: false,
    glowColor: "#667eea",
    glowIntensity: 20,
  },
  {
    mode: "box",
    layers: [{ id: "1", offsetX: 0, offsetY: 0, blur: 20, spread: 0, color: "rgba(102,126,234,0.5)", inset: false }],
    glow: true,
    glowColor: "#667eea",
    glowIntensity: 40,
  },
];

export const glassPresets: GlassConfig[] = [
  { blur: 20, opacity: 0.8, saturation: 180, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", noise: false, noiseIntensity: 0.05, tint: "#ffffff", tintOpacity: 0.1 },
  { blur: 40, opacity: 0.6, saturation: 200, borderWidth: 1, borderColor: "rgba(255,255,255,0.3)", noise: true, noiseIntensity: 0.1, tint: "#ffffff", tintOpacity: 0.15 },
  { blur: 12, opacity: 0.9, saturation: 150, borderWidth: 2, borderColor: "rgba(255,255,255,0.4)", noise: false, noiseIntensity: 0.05, tint: "#000000", tintOpacity: 0.2 },
];

export const buttonPresets: ButtonConfig[] = [
  { size: "md", radius: 8, bgColor: "#667eea", textColor: "#ffffff", borderColor: "transparent", borderWidth: 0, hoverEffect: "scale", hoverBgColor: "#5a67d8", ripple: false, icon: false, iconPosition: "right", loading: false, disabled: false, shadow: true, gradientBg: false, gradientFrom: "#667eea", gradientTo: "#764ba2" },
  { size: "md", radius: 9999, bgColor: "#000000", textColor: "#ffffff", borderColor: "transparent", borderWidth: 0, hoverEffect: "glow", hoverBgColor: "#000000", ripple: false, icon: false, iconPosition: "right", loading: false, disabled: false, shadow: false, gradientBg: false, gradientFrom: "#667eea", gradientTo: "#764ba2" },
  { size: "md", radius: 8, bgColor: "transparent", textColor: "#667eea", borderColor: "#667eea", borderWidth: 2, hoverEffect: "scale", hoverBgColor: "#667eea", ripple: false, icon: false, iconPosition: "right", loading: false, disabled: false, shadow: false, gradientBg: false, gradientFrom: "#667eea", gradientTo: "#764ba2" },
  { size: "md", radius: 8, bgColor: "#667eea", textColor: "#ffffff", borderColor: "transparent", borderWidth: 0, hoverEffect: "scale", hoverBgColor: "#5a67d8", ripple: false, icon: false, iconPosition: "right", loading: false, disabled: false, shadow: false, gradientBg: true, gradientFrom: "#667eea", gradientTo: "#764ba2" },
];

export const cardPresets: CardConfig[] = [
  { variant: "basic", padding: 24, radius: 12, shadow: true, shadowIntensity: 1, glass: false, gradientBg: false, gradientFrom: "#667eea", gradientTo: "#764ba2", hoverEffect: "lift", borderWidth: 0, borderColor: "transparent" },
  { variant: "basic", padding: 24, radius: 16, shadow: false, shadowIntensity: 1, glass: true, gradientBg: false, gradientFrom: "#667eea", gradientTo: "#764ba2", hoverEffect: "glow", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  { variant: "pricing", padding: 32, radius: 12, shadow: true, shadowIntensity: 1.5, glass: false, gradientBg: true, gradientFrom: "#667eea", gradientTo: "#764ba2", hoverEffect: "lift", borderWidth: 0, borderColor: "transparent" },
];
