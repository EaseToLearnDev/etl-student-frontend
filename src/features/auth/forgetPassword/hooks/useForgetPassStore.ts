import { type InputFieldType } from "../../../shared/types";
import { create } from "zustand";
import { ForgetPasswordPhase, type TokenType } from "../forgetPassword.types";

export interface ForgetPassStore {
  userId: InputFieldType;
  otp: InputFieldType;
  password: InputFieldType;
  confirmPassword: InputFieldType;
  token: TokenType | null;
  loading: boolean;
  currentPhase: ForgetPasswordPhase;

  setLoading: (v: boolean) => void;
  setToken: (token: TokenType | null) => void;

  setCurrentPhase: (index: ForgetPasswordPhase) => void;
  setUserId: (userId: InputFieldType) => void;
  setOtp: (otp: InputFieldType) => void;
  setPassword: (pass: InputFieldType) => void;
  setConfirmPassword: (confirmPass: InputFieldType) => void;

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
