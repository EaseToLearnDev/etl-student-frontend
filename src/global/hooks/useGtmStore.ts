import { create } from "zustand";
import { pushToDataLayer } from "../../utils/gtm";
import { gtmEvents } from "../../utils/gtm-events";

export interface GtmStore {
  gtmEvent: keyof typeof gtmEvents | null;
  setGtmEvent: (event: keyof typeof gtmEvents) => void;
}

let gtmTimeout: NodeJS.Timeout;

export const useGtmStore = create<GtmStore>((set) => ({
  gtmEvent: null,
  setGtmEvent: (event) => {
    set({ gtmEvent: event });
    if (gtmTimeout) clearTimeout(gtmTimeout);

    gtmTimeout = setTimeout(() => {
      pushToDataLayer({
        event: gtmEvents[event],
      });
    }, 3000);
  },
}));
