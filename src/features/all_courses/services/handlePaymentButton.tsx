import { useStudentStore } from "../../shared/store/useStudentStore";
import { paymentTokenGenerateMultiplePricing } from "../apis/paymentTokenGenerateMultiplePricing.api";

interface HandlePaymentButtonProps {
  option: number;
  courseId: number;
  courseTitle: string;
  packId: number;
  apiQuery: string;
}

export const handlePaymentButton = ({
  option,
  courseId,
  courseTitle,
  packId,
  apiQuery,
}: HandlePaymentButtonProps) => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;
  try {
    const res = paymentTokenGenerateMultiplePricing({
      option,
      courseId,
      courseTitle,
      packId,
      apiQuery,
      loginId,
      token,
    });
    return res;
  } catch (error) {
    console.log("Failed to Direct to the Payment: ", error);
    return null;
  }
};
