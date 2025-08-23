// Types
import type { PrevRunningTest } from "../types";

// Api
import { loadPreviousRunningTest } from "./loadPreviousRunningTest";

interface ManageTestModalParams {
  previousRunningTest: PrevRunningTest | null;
  setPreviousRunningTest: (previousTest: PrevRunningTest) => void;
  setShowStartTestModal: (v: boolean) => void;
  setShowPreviousTestModal: (v: boolean) => void;
}
/**
 * Manages the display logic for test modals based on the previous running test status.
 */
export const manageTestModal = async ({
  previousRunningTest,
  setPreviousRunningTest,
  setShowStartTestModal,
  setShowPreviousTestModal,
}: ManageTestModalParams) => {
  const data = previousRunningTest
    ? previousRunningTest
    : await loadPreviousRunningTest();

  if (data && data.responseTxt !== "failed") {
    setPreviousRunningTest(data);
    setShowPreviousTestModal(true);
  } else {
    setShowStartTestModal(true);
  }
};
