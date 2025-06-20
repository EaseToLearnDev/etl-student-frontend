import { create } from "zustand";
import { persist } from "zustand/middleware";

type DarkModeStore = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
};

const useDarkModeStore = create<DarkModeStore>()(
  persist(
    (set) => ({
      darkMode:
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      setDarkMode: (value) => set({ darkMode: value }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "darkMode",
    }
  )
);

export default useDarkModeStore;