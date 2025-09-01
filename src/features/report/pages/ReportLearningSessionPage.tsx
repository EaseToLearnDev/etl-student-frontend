import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import type { Column } from "../../../components/types";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import Button from "../../../components/Button";

export interface LearningSessionData {
  testTitle: string;
  testType: string;
  date: string;
  totalQuestions: number;
  helpCounter: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  testSession: string;
}

interface ReportLearningSessionPageProps {
  data: LearningSessionData[];
  onViewMore: (reportData: LearningSessionData) => void;
}

const ReportLearningSessionPage = ({
  data,
  onViewMore,
}: ReportLearningSessionPageProps) => {
  const columns: Column<any>[] = [
    {
      header: "Test Title",
      accessor: "testTitle",
    },
    {
      header: "Type",
      accessor: "testType",
    },
    {
      header: "Date/Time",
      accessor: "date",
    },
    {
      header: "Total Questions",
      accessor: "totalQuestions",
    },
    {
      header: "Help in Questions",
      accessor: "helpCounter",
    },
    {
      header: "Correct",
      accessor: "correct",
    },
    {
      header: "Incorrect",
      accessor: "incorrect",
    },
    {
      header: "Unattempted",
      accessor: "unattempted",
    },
    {
      header: "Action",
      render: (row) => (
        <Button style="primary" onClick={() => onViewMore(row)}>
          <p>View Details</p>
          {/* <ArrowRightIcon className="w-4 h-4 ml-2" /> */}
        </Button>
      ),
    },
  ];
  const learningSessionData = data.filter((item) => item.testType === "Learning Session");
  return (
    <>
      {learningSessionData.length > 0 ? (
        <div className="flex">
          <PaginatedTable
            columns={columns}
            header={<h5>Learning Session</h5>}
            data={learningSessionData}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full min-h-[60vh] text-[var(--text-tertiary)]">
          <ChartBarIcon className="h-48 w-48 mb-2" />
          <p>No Learninig Session Data Available</p>
        </div>
      )}
    </>
  );
};

export default ReportLearningSessionPage;
