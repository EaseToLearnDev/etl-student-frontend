import { makeRequest } from "../../../utils/http";

interface PaymentTransactionsParams {
  loginId: string;
  token: string;
}

export const PaymentTransactions = async ({
  loginId,
  token,
}: PaymentTransactionsParams) => {
  try {
    const res = (await makeRequest("get", "/paymenttransactions", null, {
      headers: { loginId, token, device: "web" },
    }));

    return res?.data?.obj ?? null;
  } catch (error) {
    console.log("Failed to get payment transactions: ", error);
    return null;
  }
};
