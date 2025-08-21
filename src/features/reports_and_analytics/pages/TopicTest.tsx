import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
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
    header: "Unattempted",
    accessor: "unattempted",
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
      testType: "Aptitude",
      date: new Date("2025-08-01T10:30:00"),
      totalQuestions: 20,
      helpCounter: 2,
      correct: 15,
      incorrect: 3,
      unattempted: 2,
    },
    {
      testTitle: "Reasoning Test 1",
      testType: "Reasoning",
      date: new Date("2025-08-05T14:00:00"),
      totalQuestions: 25,
      helpCounter: 1,
      correct: 18,
      incorrect: 5,
      unattempted: 2,
    },
    {
      testTitle: "English Test 1",
      testType: "English",
      date: new Date("2025-08-10T09:15:00"),
      totalQuestions: 30,
      helpCounter: 0,
      correct: 22,
      incorrect: 6,
      unattempted: 2,
    },
    {
      testTitle: "Mock Full Test",
      testType: "Full Length",
      date: new Date("2025-08-15T11:45:00"),
      totalQuestions: 50,
      helpCounter: 3,
      correct: 35,
      incorrect: 10,
      unattempted: 5,
    },
];

const TopicTest = () => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex">
          <PaginatedTable
            columns={columns}
            header={<h5>Topic test</h5>}
            data={data}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full text-[var(--text-tertiary)]">
          <ArchiveBoxXMarkIcon className="h-48 w-48 mb-2" />
          <p>No Topic Test Data Available</p>
        </div>
      )}
    </>
  );
};

export default TopicTest;
