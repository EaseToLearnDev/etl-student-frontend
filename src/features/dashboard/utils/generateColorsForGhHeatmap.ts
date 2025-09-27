export enum Seed {
  green = "green",
  amber = "amber",
  rose = "rose",
  fuchsia = "fuchsia",
  blue = "blue",
  cyan = "cyan",
  purple = "purple",
}

export const generateColorsForGhHeatmap = (seed: Seed = Seed.green) => {
  const colorMap = {
    [seed]: {
      light: [
        `_bg-gray-200`,
        `_bg-${seed}-300`,
        `_bg-${seed}-400`,
        `_bg-${seed}-500`,
        `_bg-${seed}-600`,
        `_bg-${seed}-800`,
      ],
      dark: [
        `_bg-${seed}-100-30`,
        `_bg-${seed}-800`,
        `_bg-${seed}-600`,
        `_bg-${seed}-500`,
        `_bg-${seed}-400`,
        `_bg-${seed}-300`,
      ],
    },
  };

  return colorMap;
};
