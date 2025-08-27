import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { PaymentTransactions } from "../api/paymentTransactions.api";
import type { PayTransaction } from "../payments.types";

export const loadPaymentTransactions = async () => {
  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  const { loginId, token } = studentData;

  if (!loginId || !token) return null;

  const data = (await PaymentTransactions({
    loginId,
    token,
  })) as PayTransaction[];

  return data ?? null;
};
