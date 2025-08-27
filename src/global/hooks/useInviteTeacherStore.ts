import { create } from "zustand";

interface InviteTeacherStore {
  showInviteTeacherModal: boolean;
  teacherLoginId: string;

  setShowInviteTeacherModal: (v: boolean) => void;
  setTeacherLoginId: (teacherLoginId: string) => void;

  reset: () => void;
}

export const useInviteTeacherStore = create<InviteTeacherStore>((set) => ({
  showInviteTeacherModal: false,
  teacherLoginId: "",
  setShowInviteTeacherModal: (v) => set({ showInviteTeacherModal: v }),
  setTeacherLoginId: (teacherLoginId) => set({ teacherLoginId }),

  reset: () =>
    set({
      showInviteTeacherModal: false,
      teacherLoginId: "",
    }),
}));
