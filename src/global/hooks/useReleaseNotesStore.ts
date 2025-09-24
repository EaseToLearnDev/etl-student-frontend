import { create } from "zustand";

interface ReleaseNotesStore {
  isReleaseNotesModalOpen: boolean;
  setIsReleaseNotesModalOpen: (v: boolean) => void;

  reset: () => void;
}

const useReleaseNotesStore = create<ReleaseNotesStore>((set) => ({
  isReleaseNotesModalOpen: false,
  setIsReleaseNotesModalOpen: (v) => set({ isReleaseNotesModalOpen: v }),
  reset: () => set({ isReleaseNotesModalOpen: false }),
}));

export default useReleaseNotesStore;
