import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import type { Column } from "../../../components/types";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import EmptyState from "../../../components/EmptyState";
import Button from "../../../components/Button";
import { MdArrowRight } from "react-icons/md";
import { LuFileChartColumnIncreasing } from "react-icons/lu";

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
      header: "Date",
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
      header: "Actions",
      render: (row) => (
        <Button style="secondary" className="rounded-full font-[500]" onClick={() => onViewMore(row)}>
          View Details
          <MdArrowRight size={16} />
        </Button>
      ),
    },
  ];
  const learningSessionData = data.filter(
    (item) => item.testType === "Learning Session"
  );
  return (
    <>
       {learningSessionData.length > 0 ? (
        <div className="flex">
          <PaginatedTable
            columns={columns}
            header={<h5>Learning Session</h5>}
            data={learningSessionData}
            onRowClick={(row) => onViewMore(row)}
          />
        </div>
      ) : (

        <EmptyState
          title="No learning session data available"
          description="No learning session data is available yet. Start engaging with courses or lessons to see your sessions appear here!"
          icon={<LuFileChartColumnIncreasing className="w-24 h-24" />}
          className="max-w-md"
        />
      )}
    </>
  );
};

export default ReportLearningSessionPage;
