import { create } from "zustand";

interface UpgradeModalStore {
    isUpgradeModalOpen: boolean;
    setIsUpgradeModalOpen: (v: boolean) => void;

    reset: () => void;
}
const useUpgradeModalStore = create<UpgradeModalStore>((set) => ({
    isUpgradeModalOpen: false,
    setIsUpgradeModalOpen: (v: boolean) => set({ isUpgradeModalOpen: v }),
    reset: () => set({ isUpgradeModalOpen: false }),
}));

export default useUpgradeModalStore;