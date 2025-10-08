import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import type { Column } from "../../../components/types";
import Button from "../../../components/Button";
import EmptyState from "../../../components/EmptyState";
import type { TestReportdata } from "../pages/ReportMockTestPage";
import { MdArrowRight } from "react-icons/md";
import { LuFileChartPie } from "react-icons/lu";

interface ReportTablePageProps {
  data: TestReportdata[];
  onViewMore: (reportData: TestReportdata) => void;
  testTypeId: number;
  title?: string;
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
    { header: "Date", accessor: "date" },
    { header: "Total Questions", accessor: "totalQuestions" },
    { header: "Full Marks", accessor: "fullMarks" },
    { header: "Marks Obtain", accessor: "marksObtain" },
    { header: "Time Spent", accessor: "timeSpent" },
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

  let filteredData = [];

  if (testTypeId === 1) {
    filteredData = data.filter(
      (item) => item.testType === "Competitive Session"
    );
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
            onRowClick={(row) => onViewMore(row)}
          />
        </div>
      ) : (
        <EmptyState
          title={emptyTitle?.toLowerCase()[0].toUpperCase()+emptyTitle?.toLowerCase().slice(1, emptyTitle.length)}
          description="No report data is available at this moment. Your reports will populate this section as you complete activities on the platform."
          icon={<LuFileChartPie className="w-24 h-24" />}
          className="max-w-md"
        />
      )}
    </>
  );
};

export default ReportTablePage;
