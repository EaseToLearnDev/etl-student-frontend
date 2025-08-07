// Types
import type { PreviousRunningTestType } from "../sl.types";

// Api
import { getPreviousRunningTest } from "./getPreviousRunningTest";

// Services
import { handlePreviousRunningTestModal } from "./handlePreviousRunningTestModal";


/**
 * Handles the logic for selecting topic mode and managing test modals.
 */
export const handleTopicModeSelector = async (
  setPreviousRunningTest: (v: PreviousRunningTestType | null) => void,
  setShowStartTestModal: (v: boolean) => void,
  setShowPreviousTestModal: (v: boolean) => void
) => {
  const test = await getPreviousRunningTest();
  setPreviousRunningTest(test);
  handlePreviousRunningTestModal(
    setShowStartTestModal,
    setShowPreviousTestModal,
    test
  );
};
