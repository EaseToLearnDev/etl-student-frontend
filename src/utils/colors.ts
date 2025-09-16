export interface ThemeColors {
  bg: {
    active: string;
    hover: string;
    onPress: string;
    disabled: string;
  };
  content: {
    primary: string;
    secondary: string;
  };
}

export enum Theme {
  Ocean = "ocean",
  Sunglow = "sunglow",
  Sakura = "sakura",
  Pumpkin = "pumpkin",
  Valencia = "valencia",
  GreenHaze = "greenHaze",
  Amethyst = "amethyst",
  Neutral = "neutral",
}

export type ThemePallete = Record<Theme, ThemeColors>;

export const colors: ThemePallete = {
  [Theme.Ocean]: {
    bg: {
      active: "var(--sb-ocean-bg-active)",
      hover: "var(--sb-ocean-bg-hover)",
      onPress: "var(--sb-ocean-bg-on-press)",
      disabled: "var(--sb-ocean-bg-disabled)",
    },
    content: {
      primary: "var(--sb-ocean-content-primary)",
      secondary: "var(--sb-ocean-content-secondary)",
    },
  },
  [Theme.Sunglow]: {
    bg: {
      active: "var(--sb-sunglow-bg-active)",
      hover: "var(--sb-sunglow-bg-hover)",
      onPress: "var(--sb-sunglow-bg-on-press)",
      disabled: "var(--sb-sunglow-bg-disabled)",
    },
    content: {
      primary: "var(--sb-sunglow-content-primary)",
      secondary: "var(--sb-sunglow-content-secondary)",
    },
  },
  [Theme.Sakura]: {
    bg: {
      active: "var(--sb-sakura-bg-active)",
      hover: "var(--sb-sakura-bg-hover)",
      onPress: "var(--sb-sakura-bg-on-press)",
      disabled: "var(--sb-sakura-bg-disabled)",
    },
    content: {
      primary: "var(--sb-sakura-content-primary)",
      secondary: "var(--sb-sakura-content-secondary)",
    },
  },
  [Theme.Pumpkin]: {
    bg: {
      active: "var(--sb-pumpkin-bg-active)",
      hover: "var(--sb-pumpkin-bg-hover)",
      onPress: "var(--sb-pumpkin-bg-on-press)",
      disabled: "var(--sb-pumpkin-bg-disabled)",
    },
    content: {
      primary: "var(--sb-pumpkin-content-primary)",
      secondary: "var(--sb-pumpkin-content-secondary)",
    },
  },
  [Theme.Valencia]: {
    bg: {
      active: "var(--sb-valencia-bg-active)",
      hover: "var(--sb-valencia-bg-hover)",
      onPress: "var(--sb-valencia-bg-on-press)",
      disabled: "var(--sb-valencia-bg-disabled)",
    },
    content: {
      primary: "var(--sb-valencia-content-primary)",
      secondary: "var(--sb-valencia-content-secondary)",
    },
  },
  [Theme.GreenHaze]: {
    bg: {
      active: "var(--sb-green-haze-bg-active)",
      hover: "var(--sb-green-haze-bg-hover)",
      onPress: "var(--sb-green-haze-bg-on-press)",
      disabled: "var(--sb-green-haze-bg-disabled)",
    },
    content: {
      primary: "var(--sb-green-haze-content-primary)",
      secondary: "var(--sb-green-haze-content-secondary)",
    },
  },
  [Theme.Amethyst]: {
    bg: {
      active: "var(--sb-amethyst-bg-active)",
      hover: "var(--sb-amethyst-bg-hover)",
      onPress: "var(--sb-amethyst-bg-on-press)",
      disabled: "var(--sb-amethyst-bg-disabled)",
    },
    content: {
      primary: "var(--sb-amethyst-content-primary)",
      secondary: "var(--sb-amethyst-content-secondary)",
    },
  },
  [Theme.Neutral]: {
    bg: {
      active: "var(--sb-neutral-bg-active)",
      hover: "var(--sb-neutral-bg-hover)",
      onPress: "var(--sb-neutral-bg-on-press)",
      disabled: "var(--sb-neutral-bg-disabled)",
    },
    content: {
      primary: "var(--sb-neutral-content-primary)",
      secondary: "var(--sb-neutral-content-secondary)",
    },
  },
};

/* --------------------------- Helper Functions --------------------------- */
export const getActiveBg = (hexColor: string, opacity = 0.1): string => {
  const temp = document.createElement("div");
  temp.style.color = hexColor;
  document.body.appendChild(temp);
  const rgb = getComputedStyle(temp).color; // "rgb(r, g, b)"
  document.body.removeChild(temp);

  return rgb.replace("rgb", "rgba").replace(")", `, ${opacity})`);
};