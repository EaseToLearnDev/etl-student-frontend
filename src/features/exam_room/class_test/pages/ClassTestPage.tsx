import { useEffect } from "react";
import { useNavigate } from "react-router";

// Types
import type { Column } from "../../../../components/types";

// Store
import { useCTStore } from "../../../../global/hooks/useCTStore";

// Services
import { loadClassTestList } from "../../../../global/services/loadClassTestList";
import { handleStartTest } from "../../shared/services/handleStartTest";

// Components
import { Modal } from "../../../../components/Modal";
import Button from "../../../../components/Button";
import PaginatedTable from "../../../../components/PaginatedTable/PaginatedTable";
import StartTopicTestModalContent from "../../shared/components/StartTopicTestModalContent";
import { useLoadingStore } from "../../../../hooks/useLoadingStore";
import { TableSkeleton } from "../../../../components/TableSkeleton";
import EmptyState from "../../../../components/EmptyState";
import UpgradeModal from "../../../shared/components/UpgradeModal";
import useUpgradeModalStore from "../../../shared/hooks/useUpgradeModalStore";
import { getActiveCourseAccessStatus } from "../../../../global/services/upgrade";
import { LuCalendarX } from "react-icons/lu";
import { usePrevTestStore } from "../../../shared/hooks/usePrevTestStore";
import PreviousTestModalContent from "../../../shared/components/PreviousTestModalContent";
import { handleResumeTest } from "../../../study_room/smart_learning/services/handleTest";
import { handleShowPreviousOrStartTest } from "../../../shared/services/handleShowPreviousOrStartTest";

/**
 * Displays a paginated table of class tests for students.
 */
const ClassTestPage = () => {
  const navigate = useNavigate();
  const testList = useCTStore((s) => s.testList);
  const loading = useLoadingStore((s) => s.loading);
  const setTestList = useCTStore((s) => s.setTestList);
  const selectedTest = useCTStore((s) => s.selectedTest);
  const setSelectedTest = useCTStore((s) => s.setSelectedTest);
  const showStartTestModal = useCTStore((s) => s.showStartTestModal);
  const setShowStartTestModal = useCTStore((s) => s.setShowStartTestModal);
  const isUpgradeModalOpen = useUpgradeModalStore((s) => s.isUpgradeModalOpen);
  const setIsUpgradeModalOpen = useUpgradeModalStore(
    (s) => s.setIsUpgradeModalOpen
  );
  const showPreviousTestModal = useCTStore((s) => s.showPreviousTestModal);
  const setShowPreviousTestModal = useCTStore(
    (s) => s.setShowPreviousTestModal
  );
  const previousRunningTest = usePrevTestStore((s) => s.prevRunningTest);
  const setPreviousRunningTest = usePrevTestStore((s) => s.setPrevRunningTest);
  const reset = useCTStore((s) => s.reset);

  const columns: Column<any>[] = [
    {
      header: "Test Title",
      accessor: "testTitle",
      className: "w-[400px]",
    },
    {
      header: "Subject",
      accessor: "subject",
    },
    {
      header: "Date/Time",
      accessor: "date",
      render: (row) => new Intl.DateTimeFormat("en-US").format(row.date),
    },
    {
      header: "Question Type",
      accessor: "questionType",
    },
    {
      header: "Total Marks",
      accessor: "totalMark",
    },
    {
      header: "Duration (Minutes)",
      accessor: "totalTime",
    },
    {
      header: "Action",
      render: (row) => (
        <Button
          style="primary"
          onClick={() => {
            setSelectedTest(row);
            getActiveCourseAccessStatus() === "renew"
              ? setIsUpgradeModalOpen(true)
              : setShowStartTestModal(true);
          }}
        >
          <p>Start Now</p>
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadClassTestList();
      if (data) {
        setTestList(data);
      }
    };
    fetchData();

    return reset;
  }, []);

  return loading ? (
    <TableSkeleton />
  ) : testList ? (
    <div className="flex">
      <PaginatedTable
        columns={columns}
        header={<h5>Class Test</h5>}
        data={testList || []}
        onRowClick={(row) => {
          setSelectedTest(row);
          getActiveCourseAccessStatus() === "renew"
            ? setIsUpgradeModalOpen(true)
            : setShowStartTestModal(true);
        }}
      />
      <Modal
        isOpen={showStartTestModal}
        onClose={() => setShowStartTestModal(false)}
        size="lg"
        className="p-4"
      >
        <StartTopicTestModalContent
          customTitle={"Class Test"}
          testName={selectedTest?.testTitle || ""}
          onStart={() => {
            handleShowPreviousOrStartTest({
              setPreviousRunningTest,
              setShowPreviousTestModal,
              startTestCallback: () =>
                handleStartTest({
                  navigate,
                  testId: selectedTest?.testId ?? null,
                  testType: selectedTest?.testType,
                  classTestId: selectedTest?.scheduleId,
                }),
            });
          }}
          onClose={() => setShowStartTestModal(false)}
          details={{
            marksCorrect: selectedTest?.markCorrectAns,
            marksIncorrect: selectedTest?.markIncorrectAns,
            marksUnattempted: selectedTest?.markNotAttempt,
            questionType: selectedTest?.questionType,
            totalMarks: selectedTest?.totalMark,
            totalQuestions: selectedTest?.totalQuestion,
            totalTime: selectedTest?.totalTime,
          }}
        />
      </Modal>
      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
      {/* Previous Test Modal */}
      <Modal
        isOpen={showPreviousTestModal}
        onClose={() => setShowPreviousTestModal(false)}
        size="lg"
        className="p-4"
      >
        <PreviousTestModalContent
          onStart={() =>
            handleStartTest({
              navigate,
              testId: selectedTest?.testId ?? null,
              testType: selectedTest?.testType,
              classTestId: selectedTest?.scheduleId,
            })
          }
          onResume={() => handleResumeTest(navigate, previousRunningTest)}
          onClose={() => setShowPreviousTestModal(false)}
          testName={previousRunningTest?.testName || ""}
        />
      </Modal>
    </div>
  ) : (
    // <div className="w-full h-full grid place-items-center text-[var(--text-tertiary)] pb-50">
    //   <div className="flex flex-col items-center justify-center w-full min-h-[60vh] text-[var(--text-tertiary)]">
    //     <ArchiveBoxXMarkIcon className="h-45 w-45 mb-2" />
    //     <p>No Class Tests Available</p>
    //   </div>
    // </div>
    <EmptyState
      title="No class test data available"
      description="No class tests have been scheduled yet. Check back later to see upcoming tests from your teacher!"
      icon={<LuCalendarX className="w-24 h-24" />}
      className="max-w-md "
    />
  );
};

export default ClassTestPage;
