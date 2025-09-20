// Types
import type { MockTestCategory } from "../../../shared/types";
interface SelectAndShowStartTestModalParams {
  testId: number;
  selectedTabIndex: number;
  testList?: MockTestCategory[] | null;
  // store setters
  setSelectedTest: (test: any) => void;
  setShowStartTestModal: (value: boolean) => void;
}

/**
 * Selects a mock test based on the current tab and dropdown index, updates the selected test, and shows the start test modal.
 */
export const selectAndShowStartTestModal = ({
  testId,
  selectedTabIndex,
  testList,
  setSelectedTest,
  setShowStartTestModal,
}: SelectAndShowStartTestModalParams) => {
  // pick correct test
  const selectedTest = testList?.[selectedTabIndex]?.testList?.find(test => test.mocktestId === testId) ?? null;

  // save selection
  setSelectedTest(selectedTest);

  setShowStartTestModal(true);
};
