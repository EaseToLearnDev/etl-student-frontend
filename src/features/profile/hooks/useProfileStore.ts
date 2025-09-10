import { create } from "zustand";
import type { InputFieldType } from "../../shared/types";

interface ProfileState {
  editProfile: boolean;
  isVerified: boolean;
  showOtpModal: boolean;
  otpType: "email" | "mobile" | null;
  otpError: string | null;
  resToken: string | null;
  tokenIdentify: number | null;
  errors: { email: string; phone: string };
  
  // Account delete states
  deleteAccountProgress: boolean;
  deleteAccountToken: string;
  confirmDeleteOpen: boolean;
  deleteError: string | null;
  
  studentName: InputFieldType;
  phoneNo: InputFieldType;
  emailId: InputFieldType;
  profilePic: string | null;

  setStudentName: (studentName: InputFieldType) => void;
  setPhoneNo: (phoneNo: InputFieldType) => void;
  setEmailId: (emailId: InputFieldType) => void;
  setProfilePic: (profilePic: string | null) => void;

  // Actions
  setEditProfile: (value: boolean) => void;
  setIsVerified: (value: boolean) => void;
  setShowOtpModal: (value: boolean) => void;
  setOtpType: (type: "email" | "mobile" | null) => void;
  setOtpError: (msg: string | null) => void;
  setResToken: (token: string | null) => void;
  setTokenIdentify: (id: number | null) => void;
  setErrors: (errors: { email: string; phone: string }) => void;

  setDeleteAccountProgress: (value: boolean) => void;
  setDeleteAccountToken: (token: string) => void;
  setConfirmDeleteOpen: (value: boolean) => void;
  setDeleteError: (msg: string | null) => void;

  reset: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  editProfile: false,
  isVerified: false,
  showOtpModal: false,
  otpType: null,
  otpError: null,
  resToken: null,
  tokenIdentify: null,
  errors: { email: "", phone: "" },
  
  studentName: {
    id: "studentName",
    data: "",
    error: "",
  },
  phoneNo: {
    id: "phoneNo",
    data: "",
    error: "",
  },
  emailId: {
    id: "emailId",
    data: "",
    error: "",
  },
  profilePic: null,
  
  deleteAccountProgress: false,
  deleteAccountToken: "",
  confirmDeleteOpen: false,
  deleteError: null,

  setStudentName: (studentName) => set({ studentName }),
  setEmailId: (emailId) => set({ emailId }),
  setPhoneNo: (phoneNo) => set({ phoneNo }),
  setProfilePic: (profilePic) => set({profilePic}),

  setEditProfile: (value) => set({ editProfile: value }),
  setIsVerified: (value) => set({ isVerified: value }),
  setShowOtpModal: (value) => set({ showOtpModal: value }),
  setOtpType: (type) => set({ otpType: type }),
  setOtpError: (msg) => set({ otpError: msg }),
  setResToken: (token) => set({ resToken: token }),
  setTokenIdentify: (id) => set({ tokenIdentify: id }),
  setErrors: (errors) => set({ errors }),

  setDeleteAccountProgress: (value) => set({ deleteAccountProgress: value }),
  setDeleteAccountToken: (token) => set({ deleteAccountToken: token }),
  setConfirmDeleteOpen: (value) => set({ confirmDeleteOpen: value }),
  setDeleteError: (msg) => set({ deleteError: msg }),

  reset: () =>
    set({
      editProfile: false,
      isVerified: false,
      showOtpModal: false,
      otpType: null,
      otpError: null,
      resToken: null,
      tokenIdentify: null,
      errors: { email: "", phone: "" },
      deleteAccountProgress: false,
      deleteAccountToken: "",
      confirmDeleteOpen: false,
      deleteError: null,

      studentName: {
        id: "studentName",
        data: "",
        error: "",
      },
      phoneNo: {
        id: "phoneNo",
        data: "",
        error: "",
      },
      emailId: {
        id: "emailId",
        data: "",
        error: "",
      },
      profilePic: null,
    }),
}));
