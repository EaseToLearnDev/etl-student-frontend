import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { paymentTokenGenerateMultiplePricing } from "../apis/paymentTokenGenerateMultiplePricing.api";

interface HandlePaymentButtonProps {
  option: number;
  courseId: number;
  courseTitle: string;
  packId: number;
  promoCode?: string;
}

export const handlePaymentButton = ({
  option,
  courseId,
  courseTitle,
  packId,
  promoCode,
}: HandlePaymentButtonProps) => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;
  try {
    const data = paymentTokenGenerateMultiplePricing({
      option,
      courseId,
      courseTitle,
      packId,
      promoCode,
      loginId,
      token,
    });
    return data;
  } catch (error) {
    console.log("Failed to Direct to the Payment: ", error);
    return null;
  }
};
