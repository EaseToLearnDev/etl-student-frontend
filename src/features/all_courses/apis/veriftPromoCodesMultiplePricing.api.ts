import { makeRequest } from "../../../utils/http";

interface VerifyPromoCodeRequest {
  promoCode: string;
  courseId: number;
  loginId: string;
  token: string;
}

export const verifyPromoCodesMultiplePricing = async ({
  promoCode,
  courseId,
  loginId,
  token,
}: VerifyPromoCodeRequest) => {
  const res = await makeRequest(
    "get",
    "/verifypromocodes-multiple-pricing",
    null,
    {
      params: {
        promoCode: promoCode,
        courseId: courseId,
      },
      headers: {
        loginId: loginId,
        token: token,
        device: "web",
      },
    }
  );

  return res?.data ?? null;
};
