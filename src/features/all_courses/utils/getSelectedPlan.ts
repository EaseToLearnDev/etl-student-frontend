import type { PriceList } from "../../shared/types";

export const getSelectedPlan = (
  tabs: string[],
  priceList: PriceList[],
  selectedTabIndex: number
) => {
  return priceList.find((p) => p.packType === tabs[selectedTabIndex]);
};
