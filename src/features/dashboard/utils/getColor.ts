import { generateColorsForGhHeatmap, Seed } from "./generateColorsForGhHeatmap";

const getColorsLevels = (val: number) => {
    if(val === 0) {
        return 0;
    }
    else if(val >= 0 && val < 20) {
        return 1;
    }
    else if(val >= 20 && val < 40) {
        return 2;
    }
    else if(val >= 40 && val < 60) {
        return 3;
    }
    else if(val >= 60 && val < 80) {
        return 4;
    }
    else if(val > 80) {
        return 5;
    }
    else {
        return 0;
    }
}

export const getColor = (val: number, color: string, darkMode: boolean) => {
  const colors = (generateColorsForGhHeatmap(color as Seed)[color] || generateColorsForGhHeatmap('green' as Seed).green)[darkMode ? 'dark' : 'light'];
  return colors[getColorsLevels(val)];
};
