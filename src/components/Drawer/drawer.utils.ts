import type { DrawerPlacements } from "../../store/useDrawerStore";

export const getPlacementClass = (placement: DrawerPlacements | undefined) => {
  switch (placement) {
    case "right":
      return "top-0 right-0 h-full";
    case "left":
      return "top-0 left-0 h-full";
    case "top":
      return "top-0 left-0 w-full";
    case "bottom":
      return "bottom-0 left-0 w-full";
    default:
      return "top-0 left-0 h-full";
  }
};

export const getHiddenTransformClass = (placement: DrawerPlacements | undefined) => {
  switch (placement) {
    case "right":
      return "translate-x-full";
    case "left":
      return "-translate-x-full";
    case "top":
      return "-translate-y-full";
    case "bottom":
      return "translate-y-full";
    default:
      return "-translate-x-full";
  }
};

export function getDrawerSizeClass(placement: DrawerPlacements | undefined) {
  if (placement === "left" || placement === "right") {
    return "min-w-[280px] max-w-[420px] h-full";
  }
  if (placement === "top" || placement === "bottom") {
    return "min-h-[320px] w-full";
  }
  return "";
}
