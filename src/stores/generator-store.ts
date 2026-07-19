"use client";

import { create } from "zustand";
import type {
  GeneratorState,
  GradientConfig,
  ShadowConfig,
  GlassConfig,
  ButtonConfig,
  CardConfig,
  BlobConfig,
  MeshConfig,
  BorderRadiusConfig,
  SvgShapeConfig,
  AnimatedBorderConfig,
  TextEffectConfig,
  DividerConfig,
  AnimationConfig,
  TypographyConfig,
} from "@/types";

const defaultGradient: GradientConfig = {
  type: "linear",
  angle: 135,
  colorStops: [
    { id: "1", color: "#667eea", position: 0 },
    { id: "2", color: "#764ba2", position: 100 },
  ],
  repeating: false,
  animated: false,
};

const defaultShadow: ShadowConfig = {
  mode: "box",
  layers: [
    {
      id: "1",
      offsetX: 0,
      offsetY: 4,
      blur: 6,
      spread: -1,
      color: "rgba(0,0,0,0.1)",
      inset: false,
    },
  ],
  glow: false,
  glowColor: "#667eea",
  glowIntensity: 20,
};

const defaultGlass: GlassConfig = {
  blur: 20,
  opacity: 0.8,
  saturation: 180,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.2)",
  noise: false,
  noiseIntensity: 0.05,
  tint: "#ffffff",
  tintOpacity: 0.1,
};

const defaultButton: ButtonConfig = {
  size: "md",
  radius: 8,
  bgColor: "#667eea",
  textColor: "#ffffff",
  borderColor: "transparent",
  borderWidth: 0,
  hoverEffect: "scale",
  hoverBgColor: "#5a67d8",
  ripple: false,
  icon: false,
  iconPosition: "right",
  loading: false,
  disabled: false,
  shadow: false,
  gradientBg: false,
  gradientFrom: "#667eea",
  gradientTo: "#764ba2",
};

const defaultCard: CardConfig = {
  variant: "basic",
  padding: 24,
  radius: 12,
  shadow: true,
  shadowIntensity: 1,
  glass: false,
  gradientBg: false,
  gradientFrom: "#667eea",
  gradientTo: "#764ba2",
  hoverEffect: "lift",
  borderWidth: 0,
  borderColor: "transparent",
};

const defaultBlob: BlobConfig = {
  complexity: 6,
  speed: 8,
  color1: "#667eea",
  color2: "#764ba2",
  color3: "#f093fb",
  borderWidth: 0,
  borderColor: "transparent",
  size: 300,
};

const defaultMesh: MeshConfig = {
  points: [
    { id: "1", x: 20, y: 30, color: "#667eea", size: 300 },
    { id: "2", x: 80, y: 70, color: "#764ba2", size: 250 },
    { id: "3", x: 50, y: 10, color: "#f093fb", size: 200 },
  ],
  blur: 80,
  noise: false,
  noiseIntensity: 0.03,
  animated: false,
};

const defaultBorderRadius: BorderRadiusConfig = {
  topLeft: 12,
  topRight: 12,
  bottomRight: 12,
  bottomLeft: 12,
  width: 200,
  height: 200,
  color: "#667eea",
};

const defaultSvgShape: SvgShapeConfig = {
  type: "wave",
  width: 800,
  height: 200,
  complexity: 3,
  color1: "#667eea",
  color2: "#764ba2",
  animated: false,
  animationSpeed: 3,
};

const defaultAnimatedBorder: AnimatedBorderConfig = {
  borderWidth: 3,
  borderRadius: 12,
  color1: "#667eea",
  color2: "#f093fb",
  color3: "#764ba2",
  speed: 3,
  width: 300,
  height: 200,
  bgColor: "#0a0a0a",
};

const defaultTextEffect: TextEffectConfig = {
  type: "neon",
  text: "CSS Studio",
  fontSize: 48,
  color1: "#667eea",
  color2: "#f093fb",
  intensity: 1,
  animated: false,
};

const defaultDivider: DividerConfig = {
  type: "wave",
  height: 100,
  color: "#667eea",
  backgroundColor: "#ffffff",
  flip: false,
};

const defaultAnimation: AnimationConfig = {
  type: "bounce",
  duration: 1,
  delay: 0,
  iterationCount: "infinite",
  timingFunction: "ease",
  elementSize: 80,
  color: "#667eea",
};

const defaultTypography: TypographyConfig = {
  text: "The quick brown fox jumps over the lazy dog",
  fontFamily: "Inter",
  fontSize: 32,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: 0,
  textAlign: "left",
  color: "currentColor",
  textTransform: "none",
  textDecoration: "none",
  fontStyle: "normal",
};

function serializeConfig(config: unknown): string {
  return JSON.stringify(config);
}

function pushHistory(
  state: GeneratorState,
  generator: string,
  config: unknown
): Partial<GeneratorState> {
  const idx = (state.historyIndex[generator] ?? -1) + 1;
  const history = { ...state.history, [generator]: serializeConfig(config) };
  const historyIndex = { ...state.historyIndex, [generator]: idx };
  return { history, historyIndex };
}

export const useGeneratorStore = create<GeneratorState>((set, get) => ({
  active: "gradient",
  gradient: defaultGradient,
  shadow: defaultShadow,
  glass: defaultGlass,
  button: defaultButton,
  card: defaultCard,
  blob: defaultBlob,
  mesh: defaultMesh,
  borderRadius: defaultBorderRadius,
  svgShape: defaultSvgShape,
  animatedBorder: defaultAnimatedBorder,
  textEffect: defaultTextEffect,
  divider: defaultDivider,
  animation: defaultAnimation,
  typography: defaultTypography,
  history: {},
  historyIndex: {},

  setActive: (name) => set({ active: name }),

  updateGradient: (patch) =>
    set((state) => {
      const next = { ...state.gradient, ...patch };
      return { gradient: next, ...pushHistory(state, "gradient", next) };
    }),

  updateShadow: (patch) =>
    set((state) => {
      const next = { ...state.shadow, ...patch };
      return { shadow: next, ...pushHistory(state, "shadow", next) };
    }),

  updateGlass: (patch) =>
    set((state) => {
      const next = { ...state.glass, ...patch };
      return { glass: next, ...pushHistory(state, "glass", next) };
    }),

  updateButton: (patch) =>
    set((state) => {
      const next = { ...state.button, ...patch };
      return { button: next, ...pushHistory(state, "button", next) };
    }),

  updateCard: (patch) =>
    set((state) => {
      const next = { ...state.card, ...patch };
      return { card: next, ...pushHistory(state, "card", next) };
    }),

  updateBlob: (patch) =>
    set((state) => {
      const next = { ...state.blob, ...patch };
      return { blob: next, ...pushHistory(state, "blob", next) };
    }),

  updateMesh: (patch) =>
    set((state) => {
      const next = { ...state.mesh, ...patch };
      return { mesh: next, ...pushHistory(state, "mesh", next) };
    }),

  updateBorderRadius: (patch) =>
    set((state) => {
      const next = { ...state.borderRadius, ...patch };
      return { borderRadius: next, ...pushHistory(state, "borderRadius", next) };
    }),

  updateSvgShape: (patch) =>
    set((state) => {
      const next = { ...state.svgShape, ...patch };
      return { svgShape: next, ...pushHistory(state, "svgShape", next) };
    }),

  updateAnimatedBorder: (patch) =>
    set((state) => {
      const next = { ...state.animatedBorder, ...patch };
      return { animatedBorder: next, ...pushHistory(state, "animatedBorder", next) };
    }),

  updateTextEffect: (patch) =>
    set((state) => {
      const next = { ...state.textEffect, ...patch };
      return { textEffect: next, ...pushHistory(state, "textEffect", next) };
    }),

  updateDivider: (patch) =>
    set((state) => {
      const next = { ...state.divider, ...patch };
      return { divider: next, ...pushHistory(state, "divider", next) };
    }),

  updateAnimation: (patch) =>
    set((state) => {
      const next = { ...state.animation, ...patch };
      return { animation: next, ...pushHistory(state, "animation", next) };
    }),

  updateTypography: (patch) =>
    set((state) => {
      const next = { ...state.typography, ...patch };
      return { typography: next, ...pushHistory(state, "typography", next) };
    }),

  undo: () => {
    const state = get();
    const gen = state.active;
    const idx = state.historyIndex[gen] ?? 0;
    if (idx <= 0) return;
    const prevIdx = idx - 1;
    set({ historyIndex: { ...state.historyIndex, [gen]: prevIdx } });
  },

  redo: () => {
    const state = get();
    const gen = state.active;
    const idx = state.historyIndex[gen] ?? 0;
    set({ historyIndex: { ...state.historyIndex, [gen]: idx + 1 } });
  },
}));
