import { type InputField } from "../../../shared/types";
import { create } from "zustand";
import { ForgetPasswordPhase, type TokenType } from "../forgetPassword.types";

export interface ForgetPassStore {
  userId: InputField;
  otp: InputField;
  password: InputField;
  confirmPassword: InputField;
  token: TokenType | null;
  loading: boolean;
  currentPhase: ForgetPasswordPhase;

  setLoading: (v: boolean) => void;
  setToken: (token: TokenType | null) => void;

  setCurrentPhase: (index: ForgetPasswordPhase) => void;
  setUserId: (userId: InputField) => void;
  setOtp: (otp: InputField) => void;
  setPassword: (pass: InputField) => void;
  setConfirmPassword: (confirmPass: InputField) => void;

  reset: () => void;
}

export const useForgetPassStore = create<ForgetPassStore>((set) => ({
  userId: {
    id: "userId",
    data: "",
    error: "",
  },
  otp: {
    id: "otp",
    data: "",
    error: "",
  },
  password: {
    id: "password",
    data: "",
    error: "",
  },
  confirmPassword: {
    id: "confirmPassword",
    data: "",
    error: "",
  },
  token: null,
  loading: false,
  currentPhase: ForgetPasswordPhase.EnterUserId,

  setLoading: (v) => set({ loading: v }),
  setToken: (token) => set({ token }),
  setUserId: (userId) => set({ userId }),
  setOtp: (otp) => set({ otp }),
  setPassword: (pass) => set({ password: pass }),
  setConfirmPassword: (confirmPass) => set({ confirmPassword: confirmPass }),
  setCurrentPhase: (index) => set({ currentPhase: index }),

  reset: () =>
    set({
      userId: {
        id: "userId",
        data: "",
        error: "",
      },
      otp: {
        id: "otp",
        data: "",
        error: "",
      },
      password: {
        id: "password",
        data: "",
        error: "",
      },
      confirmPassword: {
        id: "confirmPassword",
        data: "",
        error: "",
      },
      loading: false,
      currentPhase: ForgetPasswordPhase.EnterUserId,
    }),
}));
