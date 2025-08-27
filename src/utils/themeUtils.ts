import { Theme, colors } from "./colors";

/** Possible states for background colors */
type BgState = "active" | "hover" | "onPress" | "disabled";

/**
 * Get the resolved CSS color string from a theme background state
 */
export const getThemeBgColor = (theme: Theme, state: BgState): string => {
  const colorVar = colors[theme].bg[state]; // e.g. "var(--sb-ocean-bg-active)"
  // Remove var() wrapper
  const cssVarName = colorVar.replace(/var\(|\)/g, "");
  return getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
};

/**
 * Apply transparency to any CSS color string (rgb, rgba, hex)
 * opacity = 0 → fully opaque, 1 → fully transparent
 */
export const transparentize = (color: string, opacity: number): string => {
  const alpha = 1 - opacity;

  if (color.startsWith("rgba")) {
    return color.replace(/rgba?\(([^)]+)\)/, (_, values) => {
      const parts = values.split(",").map((v: string) => v.trim());
      parts[3] = String(alpha); // override alpha
      return `rgba(${parts.join(", ")})`;
    });
  }

  if (color.startsWith("rgb")) {
    return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  }

  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return color; // fallback
};

/**
 * Convenience function: get a transparentized theme background color directly
 */
export const getThemeBgColorTransparent = (
  theme: Theme,
  state: BgState,
  opacity: number
) => {
  const color = getThemeBgColor(theme, state);
  return transparentize(color, opacity);
};
