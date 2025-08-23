// Types
import type { MockTestCategory, PrevRunningTest } from "../../../shared/types";

// Services
import { manageTestModal } from "../../../shared/services/manageTestModal";

interface SelectAndManageTestParams {
  testId: number;
  selectedTabIndex: number;
  completeMockTests: MockTestCategory;
  subjectSpecificMockTests: MockTestCategory[];
  selectedDropdownIndex: number;

  // store setters
  setSelectedTest: (test: any) => void;
  previousRunningTest: PrevRunningTest | null;
  setPreviousRunningTest: (test: PrevRunningTest | null) => void;
  setShowStartTestModal: (value: boolean) => void;
  setShowPreviousTestModal: (value: boolean) => void;
}

export const selectAndManageTest = ({
  testId,
  selectedTabIndex,
  completeMockTests,
  subjectSpecificMockTests,
  selectedDropdownIndex,
  setSelectedTest,
  previousRunningTest,
  setPreviousRunningTest,
  setShowStartTestModal,
  setShowPreviousTestModal,
}: SelectAndManageTestParams) => {
  // pick correct list
  const selectedTest =
    selectedTabIndex === 0
      ? completeMockTests?.testList?.find((t) => t.mocktestId === testId) ?? null
      : subjectSpecificMockTests[selectedDropdownIndex]?.testList?.find(
          (t) => t.mocktestId === testId
        ) ?? null;

  // save selection
  setSelectedTest(selectedTest);

  // handle modal flow
  manageTestModal({
    previousRunningTest,
    setPreviousRunningTest,
    setShowStartTestModal,
    setShowPreviousTestModal,
  });
};
