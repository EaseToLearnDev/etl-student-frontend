import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import type { Column } from "../../../components/types";
import type { TestReportdata } from "./ReportMockTestPage";
import Button from "../../../components/Button";


interface ReportClassTestPageProps {
  data: TestReportdata[];
  onViewMore: (reportData: TestReportdata) => void;
}

const ReportClassTestPage = ({data, onViewMore} : ReportClassTestPageProps) => {
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
  const classTestData = data.filter((item) => item.testTypeId === 4);
  return (
    <>
      {classTestData.length > 0 ? (
        <div className="flex">
          <PaginatedTable
            columns={columns}
            header={<h5>Class Test</h5>}
            data={classTestData}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full min-h-[60vh] text-[var(--text-tertiary)]">
          <ArchiveBoxXMarkIcon className="h-45 w-45 mb-2" />
          <p>No Class Test Data Available</p>
        </div>
      )}
    </>
  );
};

export default ReportClassTestPage;
