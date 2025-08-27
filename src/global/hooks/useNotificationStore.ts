import { create } from "zustand";

interface NotificationStore {
  notifcations: string[] | null;
  setNotifications: (list: string[] | null) => void;
  reset: () => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifcations: null,
    setNotifications: (list) => set({ notifcations: list }),
  reset: () => set({ notifcations: null }),
}));

export default useNotificationStore;
