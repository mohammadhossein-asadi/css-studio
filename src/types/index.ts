// Gradient
export interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export interface GradientConfig {
  type: "linear" | "radial" | "conic";
  angle: number;
  colorStops: ColorStop[];
  repeating: boolean;
  animated: boolean;
}

// Shadow
export interface ShadowLayer {
  id: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export interface ShadowConfig {
  mode: "box" | "text";
  layers: ShadowLayer[];
  glow: boolean;
  glowColor: string;
  glowIntensity: number;
}

// Glass
export interface GlassConfig {
  blur: number;
  opacity: number;
  saturation: number;
  borderWidth: number;
  borderColor: string;
  noise: boolean;
  noiseIntensity: number;
  tint: string;
  tintOpacity: number;
}

// Button
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonHoverEffect = "none" | "scale" | "glow" | "gradient" | "ripple" | "underline";

export interface ButtonConfig {
  size: ButtonSize;
  radius: number;
  bgColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  hoverEffect: ButtonHoverEffect;
  hoverBgColor: string;
  ripple: boolean;
  icon: boolean;
  iconPosition: "left" | "right";
  loading: boolean;
  disabled: boolean;
  shadow: boolean;
  gradientBg: boolean;
  gradientFrom: string;
  gradientTo: string;
}

// Card
export type CardVariant = "basic" | "image" | "pricing" | "profile" | "product";

export interface CardConfig {
  variant: CardVariant;
  padding: number;
  radius: number;
  shadow: boolean;
  shadowIntensity: number;
  glass: boolean;
  gradientBg: boolean;
  gradientFrom: string;
  gradientTo: string;
  hoverEffect: "none" | "lift" | "glow" | "border";
  borderWidth: number;
  borderColor: string;
}

// Blob
export interface BlobConfig {
  complexity: number;
  speed: number;
  color1: string;
  color2: string;
  color3: string;
  borderWidth: number;
  borderColor: string;
  size: number;
}

// Mesh
export interface MeshPoint {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

export interface MeshConfig {
  points: MeshPoint[];
  blur: number;
  noise: boolean;
  noiseIntensity: number;
  animated: boolean;
}

// Border Radius
export interface BorderRadiusConfig {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  width: number;
  height: number;
  color: string;
}

// SVG Shape
export type SvgShapeType = "wave" | "blob" | "curve" | "divider" | "abstract";

export interface SvgShapeConfig {
  type: SvgShapeType;
  width: number;
  height: number;
  complexity: number;
  color1: string;
  color2: string;
  animated: boolean;
  animationSpeed: number;
}

// Animated Border
export interface AnimatedBorderConfig {
  borderWidth: number;
  borderRadius: number;
  color1: string;
  color2: string;
  color3: string;
  speed: number;
  width: number;
  height: number;
  bgColor: string;
}

// Text Effect
export type TextEffectType = "neon" | "gradient" | "3d" | "outline" | "glitch" | "shadow";

export interface TextEffectConfig {
  type: TextEffectType;
  text: string;
  fontSize: number;
  color1: string;
  color2: string;
  intensity: number;
  animated: boolean;
}

// Divider
export type DividerType = "wave" | "triangle" | "curtain" | "arrow" | "zigzag";

export interface DividerConfig {
  type: DividerType;
  height: number;
  color: string;
  backgroundColor: string;
  flip: boolean;
}

// Animation
export type AnimationType = "bounce" | "pulse" | "spin" | "shake" | "float" | "slide" | "fade" | "rubberBand" | "flip" | "jello";

export interface AnimationConfig {
  type: AnimationType;
  duration: number;
  delay: number;
  iterationCount: number | "infinite";
  timingFunction: "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier";
  elementSize: number;
  color: string;
}

// Typography
export type TypographyFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface TypographyConfig {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: TypographyFontWeight;
  lineHeight: number;
  letterSpacing: number;
  textAlign: "left" | "center" | "right" | "justify";
  color: string;
  textTransform: "none" | "uppercase" | "lowercase" | "capitalize";
  textDecoration: "none" | "underline" | "line-through" | "overline";
  fontStyle: "normal" | "italic";
}

// Generator state
export interface GeneratorState {
  active: string;
  gradient: GradientConfig;
  shadow: ShadowConfig;
  glass: GlassConfig;
  button: ButtonConfig;
  card: CardConfig;
  blob: BlobConfig;
  mesh: MeshConfig;
  borderRadius: BorderRadiusConfig;
  svgShape: SvgShapeConfig;
  animatedBorder: AnimatedBorderConfig;
  textEffect: TextEffectConfig;
  divider: DividerConfig;
  animation: AnimationConfig;
  typography: TypographyConfig;
  history: Record<string, string>;
  historyIndex: Record<string, number>;
  setActive: (name: string) => void;
  updateGradient: (patch: Partial<GradientConfig>) => void;
  updateShadow: (patch: Partial<ShadowConfig>) => void;
  updateGlass: (patch: Partial<GlassConfig>) => void;
  updateButton: (patch: Partial<ButtonConfig>) => void;
  updateCard: (patch: Partial<CardConfig>) => void;
  updateBlob: (patch: Partial<BlobConfig>) => void;
  updateMesh: (patch: Partial<MeshConfig>) => void;
  updateBorderRadius: (patch: Partial<BorderRadiusConfig>) => void;
  updateSvgShape: (patch: Partial<SvgShapeConfig>) => void;
  updateAnimatedBorder: (patch: Partial<AnimatedBorderConfig>) => void;
  updateTextEffect: (patch: Partial<TextEffectConfig>) => void;
  updateDivider: (patch: Partial<DividerConfig>) => void;
  updateAnimation: (patch: Partial<AnimationConfig>) => void;
  updateTypography: (patch: Partial<TypographyConfig>) => void;
  undo: () => void;
  redo: () => void;
}

// Snippet
export interface SnippetMeta {
  id: string;
  name: string;
  category: string;
  description: string;
}
