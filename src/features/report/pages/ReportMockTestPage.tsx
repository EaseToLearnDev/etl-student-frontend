// import Button from "../../../components/Button";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import type { Column } from "../../../components/types";

const columns: Column<any>[] = [
  {
    header: "Test Title",
    accessor: "testTitle",
  },
  {
    header: "Type",
    accessor: "testType",
  },
  {
    header: "Date/Time",
    accessor: "date",
    render: (row) => new Intl.DateTimeFormat("en-US").format(row.date),
  },
  {
    header: "Total Questions",
    accessor: "totalQuestions",
  },
  {
    header: "Full Marks",
    accessor: "fullMarks",
  },
  {
    header: "MarksObtain",
    accessor: "marksObtain",
  },
  {
    header: "TimeSpent",
    accessor: "timeSpent",
  },
  //   {
  //     header: "Action",
  //     render: () => (
  //       <Button style="primary">
  //         <p>View Details</p>
  //       </Button>
  //     ),
  //   },
];

const data: any = [
  {
    testTitle: "Aptitude Test 1",
    testType: "Mock test",
    date: new Date("2025-08-01T10:30:00"),
    totalQuestions: 20,
    fullMarks: 100,
    marksObtain: 78,
    timeSpent: "35 mins",
  },
  {
    testTitle: "Reasoning Test 1",
    testType: "Mock test",
    date: new Date("2025-08-05T14:00:00"),
    totalQuestions: 25,
    fullMarks: 125,
    marksObtain: 95,
    timeSpent: "42 mins",
  },
  {
    testTitle: "English Test 1",
    testType: "Mock test",
    date: new Date("2025-08-10T09:15:00"),
    totalQuestions: 30,
    fullMarks: 150,
    marksObtain: 110,
    timeSpent: "50 mins",
  },
  {
    testTitle: "Biology Test 1",
    testType: "Mock test",
    date: new Date("2025-08-15T11:45:00"),
    totalQuestions: 50,
    fullMarks: 250,
    marksObtain: 180,
    timeSpent: "120 mins",
  },
];


const ReportMockTestPage = () => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex">
          <PaginatedTable
            columns={columns}
            header={<h5>Mock test</h5>}
            data={data}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full text-[var(--text-tertiary)]">
          <ArchiveBoxXMarkIcon className="h-48 w-48 mb-2" />
          <p>No Mock Test Data Available</p>
        </div>
      )}
    </>
  );
};

export default ReportMockTestPage;
