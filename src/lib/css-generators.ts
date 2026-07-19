import type {
  GradientConfig,
  ShadowConfig,
  GlassConfig,
  ButtonConfig,
  CardConfig,
  BorderRadiusConfig,
  SvgShapeConfig,
} from "@/types";

// Gradient
export function generateGradientCSS(config: GradientConfig): string {
  const stops = config.colorStops
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");
  const prefix = config.repeating ? "repeating-" : "";
  if (config.type === "linear") {
    return `background: ${prefix}linear-gradient(${config.angle}deg, ${stops});`;
  }
  if (config.type === "radial") {
    return `background: ${prefix}radial-gradient(circle, ${stops});`;
  }
  return `background: ${prefix}conic-gradient(from ${config.angle}deg, ${stops});`;
}

export function generateGradientTailwind(config: GradientConfig): string {
  const stops = config.colorStops
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");
  const prefix =
    config.type === "radial"
      ? "radial-gradient(circle,"
      : config.type === "conic"
        ? "conic-gradient(from " + config.angle + "deg,"
        : "linear-gradient(" + config.angle + "deg,";
  return `bg-[${prefix}${stops})]`;
}

export function generateGradientSCSS(config: GradientConfig): string {
  const stops = config.colorStops
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");
  const prefix = config.repeating ? "repeating-" : "";
  return `$gradient: ${prefix}${config.type}-gradient(${config.type === "linear" ? `${config.angle}deg, ` : config.type === "conic" ? `from ${config.angle}deg, ` : "circle, "}${stops});\n\n.element {\n  background: $gradient;\n}`;
}

// Shadow
export function generateShadowCSS(config: ShadowConfig): string {
  const shadows = config.layers
    .map(
      (l) =>
        `${l.inset ? "inset " : ""}${l.offsetX}px ${l.offsetY}px ${l.blur}px ${l.spread}px ${l.color}`
    )
    .join(",\n  ");
  const prop = config.mode === "text" ? "text-shadow" : "box-shadow";
  let result = `${prop}: ${shadows};`;
  if (config.glow) {
    result += `\n${prop}: ${shadows}, 0 0 ${config.glowIntensity}px ${config.glowColor};`;
  }
  return result;
}

export function generateShadowTailwind(config: ShadowConfig): string {
  const primary = config.layers[0];
  if (!primary) return "";
  const blur = primary.blur;
  const spread = primary.spread;
  const opacity = Math.round(
    (parseFloat(primary.color.match(/[\d.]+(?=\))/)?.[0] ?? "1") * 100)
  );
  if (config.mode === "text") {
    return `drop-shadow(${primary.offsetX}px ${primary.offsetY}px ${blur}px ${primary.color})`;
  }
  return `shadow-[${primary.offsetX}px_${primary.offsetY}px_${blur}px_${spread}px_${primary.color}]`;
}

export function generateShadowSCSS(config: ShadowConfig): string {
  const shadows = config.layers
    .map(
      (l) =>
        `${l.inset ? "inset " : ""}${l.offsetX}px ${l.offsetY}px ${l.blur}px ${l.spread}px ${l.color}`
    )
    .join(",\n  ");
  const prop = config.mode === "text" ? "text-shadow" : "box-shadow";
  return `$shadow: ${shadows};\n\n.element {\n  ${prop}: $shadow;\n}`;
}

// Glass
export function generateGlassCSS(config: GlassConfig): string {
  let css = `backdrop-filter: blur(${config.blur}px) saturate(${config.saturation}%);\n`;
  css += `background: ${config.tint}${Math.round(config.tintOpacity * 255)
    .toString(16)
    .padStart(2, "0")};\n`;
  css += `opacity: ${config.opacity};\n`;
  css += `border: ${config.borderWidth}px solid ${config.borderColor};`;
  if (config.noise) {
    css += `\n/* Noise overlay */\nposition: relative;\n`;
    css += `/* Add noise texture via pseudo-element */`;
  }
  return css;
}

export function generateGlassTailwind(config: GlassConfig): string {
  return `backdrop-blur-[${config.blur}px] backdrop-saturate-[${config.saturation}%] bg-white/${Math.round(config.tintOpacity * 100)} border-[${config.borderWidth}px] border-[${config.borderColor}]`;
}

export function generateGlassSCSS(config: GlassConfig): string {
  return `$glass-blur: ${config.blur}px;
$glass-saturation: ${config.saturation}%;
$glass-bg: ${config.tint}${Math.round(config.tintOpacity * 255)
    .toString(16)
    .padStart(2, "0")};
$glass-border: ${config.borderWidth}px solid ${config.borderColor};

.element {
  backdrop-filter: blur($glass-blur) saturate($glass-saturation);
  background: $glass-bg;
  border: $glass-border;
}`;
}

// Button
export function generateButtonCSS(config: ButtonConfig): string {
  const sizes = { sm: "8px 16px", md: "12px 24px", lg: "16px 32px" };
  const fontSizes = { sm: "14px", md: "16px", lg: "18px" };
  let bg = config.bgColor;
  if (config.gradientBg) {
    bg = `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`;
  }
  let css = `padding: ${sizes[config.size]};\n`;
  css += `font-size: ${fontSizes[config.size]};\n`;
  css += `border-radius: ${config.radius}px;\n`;
  css += `background: ${bg};\n`;
  css += `color: ${config.textColor};\n`;
  if (config.borderWidth > 0) {
    css += `border: ${config.borderWidth}px solid ${config.borderColor};\n`;
  }
  if (config.shadow) {
    css += `box-shadow: 0 4px 14px rgba(0,0,0,0.1);\n`;
  }
  css += `cursor: pointer;\n`;
  css += `transition: all 0.2s ease;\n`;
  if (config.hoverEffect === "scale") {
    css += `&:hover { transform: scale(1.05); }`;
  } else if (config.hoverEffect === "glow") {
    css += `&:hover { box-shadow: 0 0 20px ${config.bgColor}40; }`;
  }
  return css;
}

export function generateButtonTailwind(config: ButtonConfig): string {
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };
  let classes = `inline-flex items-center justify-center rounded-[${config.radius}px] font-medium transition-all ${sizes[config.size]}`;
  if (config.gradientBg) {
    classes += ` bg-gradient-to-br from-[${config.gradientFrom}] to-[${config.gradientTo}]`;
  } else {
    classes += ` bg-[${config.bgColor}]`;
  }
  classes += ` text-[${config.textColor}]`;
  if (config.hoverEffect === "scale") classes += " hover:scale-105";
  if (config.hoverEffect === "glow") classes += ` hover:shadow-[0_0_20px_${config.bgColor}40]`;
  return classes;
}

export function generateButtonSCSS(config: ButtonConfig): string {
  const sizes = { sm: "8px 16px", md: "12px 24px", lg: "16px 32px" };
  return `$btn-bg: ${config.bgColor};
$btn-color: ${config.textColor};
$btn-radius: ${config.radius}px;
$btn-padding: ${sizes[config.size]};

.button {
  padding: $btn-padding;
  background: $btn-bg;
  color: $btn-color;
  border-radius: $btn-radius;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
}`;
}

// Card
export function generateCardCSS(config: CardConfig): string {
  let css = `padding: ${config.padding}px;\n`;
  css += `border-radius: ${config.radius}px;\n`;
  if (config.shadow) {
    const intensity = config.shadowIntensity;
    css += `box-shadow: 0 ${4 * intensity}px ${6 * intensity}px rgba(0,0,0,${0.1 * intensity});\n`;
  }
  if (config.glass) {
    css += `backdrop-filter: blur(20px);\n`;
    css += `background: rgba(255,255,255,0.1);\n`;
  } else if (config.gradientBg) {
    css += `background: linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo});\n`;
  }
  if (config.borderWidth > 0) {
    css += `border: ${config.borderWidth}px solid ${config.borderColor};\n`;
  }
  if (config.hoverEffect === "lift") {
    css += `transition: transform 0.2s ease, box-shadow 0.2s ease;\n&:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.15); }`;
  }
  return css;
}

// Border Radius
export function generateBorderRadiusCSS(config: BorderRadiusConfig): string {
  return `border-radius: ${config.topLeft}px ${config.topRight}px ${config.bottomRight}px ${config.bottomLeft}px;`;
}

export function generateBorderRadiusTailwind(config: BorderRadiusConfig): string {
  return `rounded-tl-[${config.topLeft}px] rounded-tr-[${config.topRight}px] rounded-br-[${config.bottomRight}px] rounded-bl-[${config.bottomLeft}px]`;
}

export function generateBorderRadiusSCSS(config: BorderRadiusConfig): string {
  return `$radius-tl: ${config.topLeft}px;
$radius-tr: ${config.topRight}px;
$radius-br: ${config.bottomRight}px;
$radius-bl: ${config.bottomLeft}px;

.element {
  border-radius: $radius-tl $radius-tr $radius-br $radius-bl;
}`;
}

// SVG Shape
export function generateSvgShapeCSS(config: SvgShapeConfig): string {
  return `width: ${config.width}px;\nheight: ${config.height}px;`;
}

export function generateSvgMarkup(config: SvgShapeConfig): string {
  const { width, height, complexity, color1, color2 } = config;
  if (config.type === "wave") {
    let d = `M0 ${height}`;
    for (let i = 0; i <= complexity; i++) {
      const x = (width / complexity) * i;
      const y = i % 2 === 0 ? height * 0.3 : height * 0.7;
      d += ` Q${x + width / (complexity * 2)} ${y} ${x + width / complexity} ${height}`;
    }
    d += ` L${width} 0 L0 0 Z`;
    return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
  </defs>
  <path d="${d}" fill="url(#grad)" />
</svg>`;
  }
  // blob fallback
  const cx = width / 2;
  const cy = height / 2;
  const rx = width * 0.4;
  const ry = height * 0.4;
  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
  </defs>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#grad)" />
</svg>`;
}

export function generateSvgShapeTailwind(config: SvgShapeConfig): string {
  return `w-[${config.width}px] h-[${config.height}px]`;
}
