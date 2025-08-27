import { create } from "zustand";

interface InviteTeacherStore {
  showInviteTeacherModal: boolean;
  setShowInviteTeacherModal: (v: boolean) => void;
}

export const useInviteTeacherStore = create<InviteTeacherStore>((set) => ({
  showInviteTeacherModal: false,
  setShowInviteTeacherModal: (v) => set({ showInviteTeacherModal: v }),
}));
