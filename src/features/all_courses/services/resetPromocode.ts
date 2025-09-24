import { useCoursesStore } from "../hooks/useCoursesStore";

export const resetPromocode = () => {
  const { setApplied, setCode, setDiscountedPriceList: setSelPriceList } = useCoursesStore.getState();
  setApplied(false);
  setCode("");
  setSelPriceList([]);
};
