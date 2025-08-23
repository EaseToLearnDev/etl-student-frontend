// React
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";

// Types
import type { MockTestCategory } from "../../../shared/types";

// Hooks
import useIsMobile from "../../../../hooks/useIsMobile";

// Store
import { useMTStore } from "../hooks/useMTStore";
import { usePrevTestStore } from "../../../shared/hooks/usePrevTestStore";

// Services
import { loadMockTestList } from "../services/loadMocktestList";
import { handleNewTestModal } from "../../../shared/services/handleNewTestModal";
import { handleResumeTest } from "../../../study_room/smart_learning/services/handleTest";
import { selectAndManageTest } from "../services/selectAndManageTest";
import { handleStartTest } from "../../topic_test/services/handleStartTest";

// Layouts & Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicTestInstructions from "../../topic_test/components/TopicTestInstructions";
import TestCardList from "../../../shared/components/TestCardList";
import Tabs from "../../../../components/Tabs";
import Select from "../../../../components/Select";
import { Modal } from "../../../../components/Modal";
import PreviousTestModalContent from "../../../shared/components/PreviousTestModalContent";
import StartMockTestModalContent from "../components/StartMockTestModalContent";
import StartTopicTestModalContent from "../../shared/components/StartTopicTestModalContent";

// Constants
const TABS = ["Complete Mock Tests", "Subject Wise Mock Tests"] as const;

/**
 * MockTestPage component displays a list of mock tests categorized into "Complete Mock Tests" and "Subject Wise Mock Tests".
 */
const MockTestPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Store state
  const testList = useMTStore((s) => s.testList);
  const selectedTest = useMTStore((s) => s.selectedTest);
  const setSelectedTest = useMTStore((s) => s.setSelectedTest);

  const showStartTestModal = useMTStore((s) => s.showStartTestModal);
  const setShowStartTestModal = useMTStore((s) => s.setShowStartTestModal);

  const showPreviousTestModal = useMTStore((s) => s.showPreviousTestModal);
  const setShowPreviousTestModal = useMTStore(
    (s) => s.setShowPreviousTestModal
  );

  // Prev test store
  const prevRunningTest = usePrevTestStore((s) => s.prevRunningTest);
  const setPrevRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);

  // Local state
  const [hideSecondary, setHideSecondary] = useState(isMobile);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState(0);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  // Derived data
  const completeMockTests = testList?.[0] || ({} as MockTestCategory);
  const subjectSpecificMockTests = testList?.slice(1) || [];

  const selectedSubjectTests = useMemo(
    () => subjectSpecificMockTests[selectedDropdownIndex]?.testList ?? [],
    [subjectSpecificMockTests, selectedDropdownIndex]
  );

  useEffect(() => {
    loadMockTestList();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      {/* Tabs + Subject Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between md:w-[60%] lg:w-[70%] xl:w-[75%] pr-5">
        <Tabs
          tabs={TABS}
          selectedIndex={selectedTabIndex}
          onSelect={setSelectedTabIndex}
        />
        {selectedTabIndex === 1 && (
          <Select
            type="Subjects"
            items={subjectSpecificMockTests.map((item) => item.categoryName)}
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen((prev) => !prev)}
            selectedIndex={selectedDropdownIndex}
            onSelect={setSelectedDropdownIndex}
          />
        )}
      </div>

      {/* Layout */}
      <div className="w-full h-full overflow-y-auto mt-4">
        <ChildLayout
          primaryContent={
            <TestCardList
              tests={
                selectedTabIndex === 0
                  ? completeMockTests?.testList
                  : selectedSubjectTests
              }
              infoClickHandler={() => setHideSecondary(false)}
              onClickHandler={(test) =>
                selectAndManageTest({
                  testId: test.id,
                  selectedTabIndex,
                  completeMockTests,
                  subjectSpecificMockTests,
                  selectedDropdownIndex,
                  setSelectedTest,
                  previousRunningTest: prevRunningTest,
                  setPreviousRunningTest: setPrevRunningTest,
                  setShowStartTestModal,
                  setShowPreviousTestModal,
                })
              }
            />
          }
          secondaryContent={<TopicTestInstructions title="Instructions" />}
          hideSecondary={hideSecondary}
          onSecondaryHide={() => setHideSecondary(true)}
        />
      </div>

      <Modal
        isOpen={showStartTestModal}
        onClose={() => setShowStartTestModal(false)}
        size="lg"
        className="p-4"
      >
        {selectedTabIndex === 0 ? (
          <StartMockTestModalContent
            test={selectedTest}
            onStart={() =>
              handleStartTest({
                navigate,
                testId: selectedTest?.mocktestId ?? null,
                testType: 3,
              })
            }
            onClose={() => setShowStartTestModal(false)}
          />
        ) : (
          <StartTopicTestModalContent
            testName={selectedTest?.testName || ""}
            details={{
              marksCorrect: selectedTest?.correctAnsMark,
              marksIncorrect: selectedTest?.wrongAnsMark,
              marksUnattempted: selectedTest?.noAnsMark,
              totalMarks: selectedTest?.totalMarks,
              totalQuestions: selectedTest?.totalQuestions,
              totalTime: selectedTest?.testTotalTime,
            }}
            onStart={() =>
              handleStartTest({
                navigate,
                testId: selectedTest?.mocktestId ?? null,
                testType: 3,
              })
            }
            onClose={() => setShowStartTestModal(false)}
          />
        )}
      </Modal>

      {/* Previous Test Modal */}
      <Modal
        isOpen={showPreviousTestModal}
        onClose={() => setShowPreviousTestModal(false)}
        size="lg"
        className="p-4"
      >
        <PreviousTestModalContent
          onStart={() =>
            handleNewTestModal(setShowStartTestModal, setShowPreviousTestModal)
          }
          onResume={() => handleResumeTest(navigate, prevRunningTest)}
          onClose={() => setShowPreviousTestModal(false)}
          testName={prevRunningTest?.testName || ""}
        />
      </Modal>
    </div>
  );
};

export default MockTestPage;
