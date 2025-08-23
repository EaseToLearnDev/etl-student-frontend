// Api
import { deletePreviousRunningTest } from "./deletePreviousRunningTest";

/**
 * Handles the logic for displaying the new test modal after deleting any previous running test.
 */
export const handleNewTestModal = async (
  setShowStartTestModal: (v: boolean) => void,
  setPreviousRunningTest: (v: boolean) => void
) => {
  await deletePreviousRunningTest();
  setShowStartTestModal(true);
  setPreviousRunningTest(false);
};
