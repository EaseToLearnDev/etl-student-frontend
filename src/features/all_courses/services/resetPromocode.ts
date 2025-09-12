import { useCoursesStore } from "../hooks/useCoursesStore";

export const resetPromocode = () => {
  const { setApplied, setCode, setSelPriceList } = useCoursesStore.getState();
  setApplied(false);
  setCode("");
  setSelPriceList([]);
};
