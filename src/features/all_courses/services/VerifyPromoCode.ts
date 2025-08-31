import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { verifyPromoCodesMultiplePricing } from "../apis/veriftPromoCodesMultiplePricing.api";
import { useCoursesStore } from "../hooks/useCoursesStore";

export const applyPromoCode = async (promoCode: string, courseId: number) => {
  const { studentData } = useStudentStore.getState();
  const { setSelPriceList, setApplied, setError } = useCoursesStore.getState();

  if (!studentData) {
    console.log("No student data found");
    return null;
  }

  try {
    const { loginId, token } = studentData;

    const res = await verifyPromoCodesMultiplePricing({
      promoCode,
      courseId,
      loginId,
      token,
    });

    if (res?.responseTxt === "success" && res?.obj) {
      setSelPriceList(res.obj);
      setApplied(true);
      setError(false);
    } else {
      setApplied(false);
      setError(true);
    }

    return res;
  } catch (error) {
    console.log("Failed to Verify Promo Code: ", error);
    setError(true);
    setApplied(false);
    return null;
  }
};
