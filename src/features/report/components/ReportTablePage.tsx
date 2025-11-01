// Components
import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import Button from "../../../components/Button";

// Hooks & Types
import useIsMobile from "../../../hooks/useIsMobile";
import EmptyState from "../../../components/EmptyState";
import type { Column } from "../../../components/types";
import type { TestReportdata } from "../pages/ReportMockTestPage";

// Types
import { MdArrowRight } from "react-icons/md";
import { LuFileChartPie } from "react-icons/lu";
import ReportCard from "./ReportCard";

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
  const isMobile = useIsMobile()
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

  let filteredData = [];

  if (testTypeId === 1) {
    filteredData = data.filter(
      (item) => item.testType === "Competitive Session",
    );
  } else {
    filteredData = data.filter((item) => item.testTypeId === testTypeId);
  }

  if(filteredData.length === 0){
    return (
      <EmptyState
        title={
          emptyTitle?.toLowerCase()[0].toUpperCase() +
          emptyTitle?.toLowerCase().slice(1, emptyTitle.length)
        }
        description="No report data is available at this moment. Your reports will populate this section as you complete activities on the platform."
        icon={<LuFileChartPie className="w-24 h-24" />}
        className="max-w-md"
      />
    )
  }

  return (
    <>
       {isMobile ? (
        <div className="flex flex-col gap-3 mt-3">
          {filteredData.map((item, idx) => (
            <div key={idx} className="px-2">
              <ReportCard data={item} onClick={(row) => onViewMore(row)} />
            </div>
          ))}
        </div>
      ) : (
        <PaginatedTable
          columns={columns}
          header={<h5>{title}</h5>}
          data={filteredData}
          onRowClick={(row) => onViewMore(row)}
        />
      )}
    </>
  );
};

export default ReportTablePage;
