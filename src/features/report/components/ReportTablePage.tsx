import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import type { Column } from "../../../components/types";
import Button from "../../../components/Button";
import EmptyState from "../../../components/EmptyState";
import type { TestReportdata } from "../pages/ReportMockTestPage";

interface ReportTablePageProps {
  data: TestReportdata[];
  onViewMore: (reportData: TestReportdata) => void;
  testTypeId: number;
  title: string;
  emptyTitle: string;
}

const ReportTablePage = ({
  data,
  onViewMore,
  testTypeId,
  title,
  emptyTitle,
}: ReportTablePageProps) => {
  const columns: Column<any>[] = [
    { header: "Test Title", accessor: "testTitle" },
    { header: "Type", accessor: "testType" },
    { header: "Date/Time", accessor: "date" },
    { header: "Total Questions", accessor: "totalQuestions" },
    { header: "Full Marks", accessor: "fullMarks" },
    { header: "Marks Obtain", accessor: "marksObtain" },
    { header: "Time Spent", accessor: "timeSpent" },
    {
      header: "Action",
      render: (row) => (
        <Button style="primary" onClick={() => onViewMore(row)}>
          <p>View Details</p>
        </Button>
      ),
    },
  ];

  let filteredData = []

  if(testTypeId === 1) {
    filteredData = data.filter((item) => item.testType === "Competitive Session");
  } else {
    filteredData = data.filter((item) => item.testTypeId === testTypeId);
  }

  return (
    <>
      {filteredData.length > 0 ? (
        <div className="flex">
          <PaginatedTable
            columns={columns}
            header={<h5>{title}</h5>}
            data={filteredData}
          />
        </div>
      ) : (
        <EmptyState
          title={emptyTitle}
          icon={<ArchiveBoxXMarkIcon height={100} width={100} />}
          className="min-h-[60vh]"
        />
      )}
    </>
  );
};

export default ReportTablePage;
