// Types
import type { MockTestCategory } from "../../../shared/types";
interface SelectAndShowStartTestModalParams {
  testId: number;
  selectedTabIndex: number;
  completeMockTests: MockTestCategory;
  subjectSpecificMockTests: MockTestCategory[];
  selectedDropdownIndex: number;

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
  completeMockTests,
  subjectSpecificMockTests,
  selectedDropdownIndex,
  setSelectedTest,
  setShowStartTestModal,
}: SelectAndShowStartTestModalParams) => {
  // pick correct test
  const selectedTest =
    selectedTabIndex === 0
      ? completeMockTests?.testList?.find((t) => t.mocktestId === testId) ??
        null
      : subjectSpecificMockTests[selectedDropdownIndex]?.testList?.find(
          (t) => t.mocktestId === testId
        ) ?? null;

  // save selection
  setSelectedTest(selectedTest);

  setShowStartTestModal(true);
};
