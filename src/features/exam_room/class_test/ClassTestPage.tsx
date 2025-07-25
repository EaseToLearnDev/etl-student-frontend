// Types
import type { Column } from "../../../components/types";

// Components
import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import Button from "../../../components/Button";

const data = [
  {
    id: 1,
    testTitle: "NEET UG CHARACTERISTIC OF LIVING ORGANISMS Test 1",
    subject: "Biology",
    date: Date.now() - 9 * 24 * 60 * 60 * 1000, // 9 days ago
    questionType: "Multiple Choice",
    totalMarks: 40,
    duration: 30,
  },
  {
    id: 2,
    testTitle: "NEET UG LAWS OF MOTION Test 1",
    subject: "Physics",
    date: Date.now() - 8 * 24 * 60 * 60 * 1000,
    questionType: "Multiple Choice",
    totalMarks: 45,
    duration: 40,
  },
  {
    id: 3,
    testTitle: "NEET UG ATOMS AND MOLECULES Test 1",
    subject: "Chemistry",
    date: Date.now() - 7 * 24 * 60 * 60 * 1000,
    questionType: "Assertion Reason",
    totalMarks: 50,
    duration: 35,
  },
  {
    id: 4,
    testTitle: "NEET UG CELL STRUCTURE Test 2",
    subject: "Biology",
    date: Date.now() - 6 * 24 * 60 * 60 * 1000,
    questionType: "Match the Following",
    totalMarks: 40,
    duration: 30,
  },
  {
    id: 5,
    testTitle: "NEET UG WORK ENERGY POWER Test 1",
    subject: "Physics",
    date: Date.now() - 5 * 24 * 60 * 60 * 1000,
    questionType: "Multiple Choice",
    totalMarks: 35,
    duration: 25,
  },
  {
    id: 6,
    testTitle: "NEET UG CHEMICAL REACTIONS Test 1",
    subject: "Chemistry",
    date: Date.now() - 4 * 24 * 60 * 60 * 1000,
    questionType: "Fill in the Blanks",
    totalMarks: 30,
    duration: 20,
  },
  {
    id: 7,
    testTitle: "NEET UG PLANT PHYSIOLOGY Test 2",
    subject: "Biology",
    date: Date.now() - 3 * 24 * 60 * 60 * 1000,
    questionType: "Multiple Choice",
    totalMarks: 45,
    duration: 35,
  },
  {
    id: 8,
    testTitle: "NEET UG ELECTROSTATICS Test 1",
    subject: "Physics",
    date: Date.now() - 2 * 24 * 60 * 60 * 1000,
    questionType: "True or False",
    totalMarks: 40,
    duration: 30,
  },
  {
    id: 9,
    testTitle: "NEET UG THERMODYNAMICS Test 1",
    subject: "Chemistry",
    date: Date.now() - 1 * 24 * 60 * 60 * 1000,
    questionType: "Multiple Choice",
    totalMarks: 50,
    duration: 40,
  },
  {
    id: 10,
    testTitle: "NEET UG GENETICS Test 3",
    subject: "Biology",
    date: Date.now(),
    questionType: "Assertion Reason",
    totalMarks: 50,
    duration: 45,
  },
];

const columns: Column<any>[] = [
  {
    header: "Test Title",
    accessor: "testTitle",
    className: "w-[400px]",
  },
  {
    header: "Subject",
    accessor: "subject",
  },
  {
    header: "Date/Time",
    accessor: "date",
    render: (row) => new Intl.DateTimeFormat("en-US").format(row.date),
  },
  {
    header: "Question Type",
    accessor: "questionType",
  },
  {
    header: "Total Marks",
    accessor: "totalMarks",
  },
  {
    header: "Duration (Minutes)",
    accessor: "duration",
  },
  {
    header: "Action",
    render: () => (
      <Button style="primary">
        <p>Start Now</p>
      </Button>
    ),
  },
];

const ClassTestPage = () => {
  return (
    <div className="flex">
      <PaginatedTable
        columns={columns}
        header={<h5>Class Test</h5>}
        data={data}
      />
      {/* Pagination TODO */}
    </div>
  );
};

export default ClassTestPage;
