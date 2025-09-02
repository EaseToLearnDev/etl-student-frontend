import { create } from "zustand";
import type { PayTransaction } from "../payments.types";

interface PaymentStore {
  transactions: PayTransaction[] | null;
  setTransactions: (transactions: PayTransaction[] | null) => void;
  reset: () => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  transactions: null,
  setTransactions: (transactions) => set({ transactions }),
  reset: () =>
    set({
      transactions: null,
    }),
}));
