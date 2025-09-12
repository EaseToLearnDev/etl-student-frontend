import { makeRequest } from "../../../utils/http";

interface PaymentTokenGenerateRequest {
  option: number;
  courseId: number;
  courseTitle: string;
  packId: number;
  promoCode?: string;
  loginId: string;
  token: string;
}

export const paymentTokenGenerateMultiplePricing = async ({
  option,
  courseId,
  courseTitle,
  packId,
  promoCode,
  loginId,
  token,
}: PaymentTokenGenerateRequest) => {
  const options: Record<string, Record<string, any>> = {
    headers: {
      loginId: loginId,
      token: token,
      device: "web",
    },
    params: {
      opt: option,
      courseId: courseId,
      courseTitle: courseTitle,
      packId: packId,
    },
  };
  if (promoCode && promoCode.length > 0) {
    options.params.promoCode = promoCode;
  }
  const res = await makeRequest(
    "get",
    "/paymenttokengenerate-multiple-pricing",
    null,
    options
  );

  return res?.data ?? null;
};
