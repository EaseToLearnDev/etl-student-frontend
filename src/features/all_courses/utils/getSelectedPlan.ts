import type { PriceList } from "../../shared/types";

export const getSelectedPlan = (
  priceList: PriceList[],
  selectedTabIndex: number
) => {
  const tabs = ["FREE", "PRO", "ACE"];
  return priceList.find((p) => p.packType === tabs[selectedTabIndex]);
};
