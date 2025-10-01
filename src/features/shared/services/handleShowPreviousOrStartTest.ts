// Types
import type { PrevRunningTest } from "../types";

// Api
import { loadPreviousRunningTest } from "./loadPreviousRunningTest";

interface HandleShowPreviousOrStartTestParams {
  setPreviousRunningTest: (previousTest: PrevRunningTest) => void;
  setShowPreviousTestModal: (v: boolean) => void;
  startTestCallback: () => void;
}
/**
 * Manages the display logic for test modals based on the previous running test status.
 */
export const handleShowPreviousOrStartTest = async ({
  setPreviousRunningTest,
  setShowPreviousTestModal,
  startTestCallback,
}: HandleShowPreviousOrStartTestParams) => {
  const data = await loadPreviousRunningTest();

  if (!data) return;

  if (data.responseTxt === "success") {
    setPreviousRunningTest(data);
    setShowPreviousTestModal(true);
  } else {
    startTestCallback();
  }
};
