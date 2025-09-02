import { makeRequest } from "../../../utils/http";

interface PaymentTokenGenerateRequest {
  option: number;
  courseId: number;
  courseTitle: string;
  packId: number;
  apiQuery: string;
  loginId: string;
  token: string;
}

export const paymentTokenGenerateMultiplePricing = async ({
  option,
  courseId,
  courseTitle,
  packId,
  apiQuery,
  loginId,
  token,
}: PaymentTokenGenerateRequest) => {
  const res = await makeRequest(
    "get",
    "/paymenttokengenerate-multiple-pricing",
    null,
    {
      params: {
        opt: option,
        courseId: courseId,
        courseTitle: courseTitle,
        packId: packId,
        apiQuery
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
