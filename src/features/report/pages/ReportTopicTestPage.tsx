import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import type { Column } from "../../../components/types";
import type { TestReportdata } from "./ReportMockTestPage";
import Button from "../../../components/Button";
import EmptyState from "../../../components/EmptyState";

interface ReportTopicTestPageProps {
  data: TestReportdata[];
  onViewMore: (reportData: TestReportdata) => void;
}

const ReportTopicTestPage = ({
  data,
  onViewMore,
}: ReportTopicTestPageProps) => {
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
  const topicTestData = data.filter((item) => item.testTypeId === 2);
  return (
    <>
      {topicTestData.length > 0 ? (
        <div className="flex">
          <PaginatedTable
            columns={columns}
            header={<h5>Topic test</h5>}
            data={topicTestData}
          />
        </div>
      ) : (
        <EmptyState
          title="No Topic Test Data Available"
          icon={<ArchiveBoxXMarkIcon height={100} width={100} />}
          className="min-h-[60vh]"
        />
      )}
    </>
  );
};

export default ReportTopicTestPage;
