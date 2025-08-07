// Types
import type { PreviousRunningTestType } from "../sl.types";

/**
 * Handles the display logic for the previous running test modal.
 */
export const handlePreviousRunningTestModal = async (
  setShowStartTestModal: (v: boolean) => void,
  setShowPreviousTestModal: (v: boolean) => void,
  previousRunningTest?: PreviousRunningTestType | null
) => {
  if (!previousRunningTest || previousRunningTest?.responseTxt === "failed") {
    setShowStartTestModal(true);
  } else {
    setShowPreviousTestModal(true);
  }
};
