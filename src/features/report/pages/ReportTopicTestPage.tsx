import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import type { Column } from "../../../components/types";
import type { TestReportdata } from "./ReportMockTestPage";
import Button from "../../../components/Button";
import EmptyState from "../../../components/EmptyState";
import { LuFileSearch } from "react-icons/lu";

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
        title="No topic test data available"
        description="No topic test data is available yet. Start engaging with courses, tests, or activities to see your summary here!"
        icon={<LuFileSearch className="w-24 h-24" />}
        className="max-w-md"
      />
      )}
    </>
  );
};

export default ReportTopicTestPage;
