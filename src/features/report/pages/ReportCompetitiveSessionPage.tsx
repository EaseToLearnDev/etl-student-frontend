import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import type { Column } from "../../../components/types";
import type { TestReportdata } from "./ReportMockTestPage";
import Button from "../../../components/Button";

interface ReportCompetitiveSessionPageProps {
  data: TestReportdata[];
  onViewMore: (reportData: TestReportdata) => void;
}

const ReportCompetitiveSessionPage = ({ data, onViewMore }: ReportCompetitiveSessionPageProps) => {
  const columns: Column<any>[] = [
    { header: "Test Title", accessor: "testTitle" },
    { header: "Type", accessor: "testType" },
    { header: "Date/Time", accessor: "date" },
    { header: "Total Questions", accessor: "totalQuestions" },
    { header: "Full Marks", accessor: "fullMarks" },
    { header: "MarksObtain", accessor: "marksObtain" },
    { header: "TimeSpent", accessor: "timeSpent" },
    {
      header: "Action",
      render: (row) => (
        <Button style="primary" onClick={() => onViewMore(row)}>
          <p>View Details</p>
        </Button>
      ),
    },
  ];

  // filter & map only Competitive Session
  const competitiveData = data.filter((item) => item.testType === "Competitive Session");

  return (
    <>
      {competitiveData.length > 0 ? (
        <div className="flex">
          <PaginatedTable
            columns={columns}
            header={<h5>Competitive Session</h5>}
            data={competitiveData}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full min-h-[60vh] text-[var(--text-tertiary)]">
          <ArchiveBoxXMarkIcon className="h-45 w-45 mb-2" />
          <p>No Competitive Session Data Available</p>
        </div>
      )}
    </>
  );
};

export default ReportCompetitiveSessionPage;
