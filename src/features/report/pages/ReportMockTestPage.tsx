// import Button from "../../../components/Button";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import type { Column } from "../../../components/types";
import Button from "../../../components/Button";

export interface TestReportdata {
  testTitle: string;
  testType: string;
  date: string;
  totalQuestions: number;
  fullMarks: number;
  marksObtain: number;
  timeSpent: string;
  testSession: string;
  testTypeId: number;
}

interface ReportMockTestPageProps {
  data: TestReportdata[];
  onViewMore: (reportData: TestReportdata) => void;
}

const ReportMockTestPage = ({ data, onViewMore }: ReportMockTestPageProps) => {
  const mockTestData = data.filter((item) => item.testTypeId === 3);
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
  return (
    <>
      {mockTestData.length > 0 ? (
        <div className="flex">
          <PaginatedTable
            columns={columns}
            header={<h5>Mock test</h5>}
            data={mockTestData}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full min-h-[60vh] text-[var(--text-tertiary)]">
          <ArchiveBoxXMarkIcon className="h-48 w-48 mb-2" />
          <p>No Mock Test Data Available</p>
        </div>
      )}
    </>
  );
};

export default ReportMockTestPage;
