import { create } from "zustand";

interface GuestStore {
  showGuestTestSubmitModal: boolean;
  openVerifyOtp: boolean;
  openCourseCardsModal: boolean;
  name: string;
  mobile: number;
  email: string;
  error: string;
  token: string;

  setShowGuestTestSubmitModal: (value: boolean) => void;
  setOpenVerifyOtp: (value: boolean) => void;
  setOpenCourseCardsModal: (value: boolean) => void;
  setName: (name: string) => void;
  setMobile: (mobile: number) => void;
  setEmail: (email: string) => void;
  setError: (error: string) => void;
  setToken: (token: string) => void;
}

export const useGuestStore = create<GuestStore>((set) => ({
  showGuestTestSubmitModal: true,
  openVerifyOtp: false,
  openCourseCardsModal: true,
  token: "",
  name: "",
  mobile: 0,
  email: "",
  error: "",

  setShowGuestTestSubmitModal: (value) =>
    set({ showGuestTestSubmitModal: value }),
  setOpenVerifyOtp: (value) => set({ openVerifyOtp: value }),
  setOpenCourseCardsModal: (value) => set({openCourseCardsModal: value}),
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setMobile: (mobile) => set({ mobile }),
  setError: (error) => set({ error }),
  setToken: (token) => set({ token }),
}));
