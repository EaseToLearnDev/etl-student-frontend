import { create } from "zustand";
import { SignupPhase } from "../signup.types";

export interface SignupStore {
  currentPhase: SignupPhase;
  email: string;
  name: string;
  phone: string;

  setCurrentPhase: (phase: SignupPhase) => void;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
}

const useSignupStore = create<SignupStore>((set) => ({
  currentPhase: SignupPhase.Signup,
  email: "",
  name: "",
  phone: "",
  setCurrentPhase: (phase) => set({ currentPhase: phase }),
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),
  setName: (name) => set({name}),
}));

export default useSignupStore;
