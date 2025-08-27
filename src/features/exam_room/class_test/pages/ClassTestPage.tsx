// Types
import type { Column } from "../../../../components/types";

// Store
import { useCTStore } from "../../../../shared/hooks/useCTStore";

// Components
import PaginatedTable from "../../../../components/PaginatedTable/PaginatedTable";
import Button from "../../../../components/Button";
import ArchiveBoxIcon from "../../../../components/icons/archive-box-icon";
import { useEffect } from "react";
import { loadClassTestList } from "../../../../shared/services/loadClassTestList";
import { Modal } from "../../../../components/Modal";
import StartTopicTestModalContent from "../../shared/components/StartTopicTestModalContent";
import { handleStartTest } from "../../topic_test/services/handleStartTest";
import { useNavigate } from "react-router";

/**
 * Displays a paginated table of class tests for students.
 */
const ClassTestPage = () => {
  const navigate = useNavigate();
  const testList = useCTStore((s) => s.testList);
  const setTestList = useCTStore((s) => s.setTestList);
  const selectedTest = useCTStore((s) => s.selectedTest);
  const setSelectedTest = useCTStore((s) => s.setSelectedTest);
  const showStartTestModal = useCTStore((s) => s.showStartTestModal);
  const setShowStartTestModal = useCTStore((s) => s.setShowStartTestModal);

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
            setShowStartTestModal(true);
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
  }, []);

  return testList ? (
    <div className="flex">
      <PaginatedTable
        columns={columns}
        header={<h5>Class Test</h5>}
        data={testList || []}
      />
      <Modal
        isOpen={showStartTestModal}
        onClose={() => setShowStartTestModal(false)}
        size="lg"
        className="p-4"
      >
        <StartTopicTestModalContent
          testName={selectedTest?.testTitle || ""}
          onStart={() =>
            handleStartTest({
              navigate,
              testId: selectedTest?.scheduleId ?? null,
              testType: 4,
            })
          }
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
    </div>
  ) : (
    <div className="w-full h-full grid place-items-center text-[var(--text-tertiary)] pb-50">
      <div className="flex flex-col gap-2 items-center justify-center">
        <ArchiveBoxIcon width={100} height={100} />
        <h5>No Class Test Available</h5>
      </div>
    </div>
  );
};

export default ClassTestPage;
