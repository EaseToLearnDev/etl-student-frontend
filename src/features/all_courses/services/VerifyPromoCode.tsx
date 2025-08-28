import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { verifyPromoCodesMultiplePricing } from "../apis/veriftPromoCodesMultiplePricing.api";

interface VerifyPromoCodeProps {
  promoCode: string;
  courseId: number;
}

export const VerifyPromoCode = ({ promoCode, courseId }: VerifyPromoCodeProps) => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;

  try {
    const res = verifyPromoCodesMultiplePricing({
      promoCode,
      courseId,
      loginId,
      token,
    });
    return res;
  } catch (error) {
    console.log("Failed to Verify: ", error);
    return null;
  }
};
