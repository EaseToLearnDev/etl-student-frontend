import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import type { Column } from "../../../components/types";
import EmptyState from "../../../components/EmptyState";
import Button from "../../../components/Button";
import { MdArrowRight } from "react-icons/md";
import { LuFileChartColumnIncreasing } from "react-icons/lu";
import useIsMobile from "../../../hooks/useIsMobile";
import ReportCard from "../components/ReportCard";

export interface LearningSessionData {
  testTitle: string;
  testType: string;
  examType: string;
  date: string;
  marksObtain: number;
  fullMarks: number;
  timeSpent: string;
  testTypeId: number;
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
  const isMobile = useIsMobile();
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
        <Button
          style="secondary"
          className="rounded-full font-[500]"
          onClick={() => onViewMore(row)}
        >
          View Details
          <MdArrowRight size={16} />
        </Button>
      ),
    },
  ];
  const learningSessionData = data.filter(
    (item) => item.testType === "Learning Session"
  );

  if (learningSessionData.length === 0) {
    return (
      <EmptyState
        title="No learning session data available"
        description="No learning session data is available yet. Start engaging with courses or lessons to see your sessions appear here!"
        icon={<LuFileChartColumnIncreasing className="w-24 h-24" />}
        className="max-w-md"
      />
    );
  }

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-3 mt-3 p-2">
          {learningSessionData.map((item, idx) => (
            <div key={idx}>
              <ReportCard data={item} onClick={(row) => onViewMore(row as LearningSessionData)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex">
          <PaginatedTable
            columns={columns}
            header={<h5>Learning Session</h5>}
            data={learningSessionData}
            onRowClick={(row) => onViewMore(row)}
          />
        </div>
      )}
    </>
  );
};

export default ReportLearningSessionPage;
