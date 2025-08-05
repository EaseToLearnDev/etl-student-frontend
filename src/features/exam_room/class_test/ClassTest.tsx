// React
import { useEffect } from "react";

// Types
import type { Column } from "../../../components/types";

// Store
import { useCTStore } from "./store/useCTStore";

// Services
import { loadClassTestList } from "./services/loadClassTestList";

// Components
import PaginatedTable from "../../../components/PaginatedTable/PaginatedTable";
import Button from "../../../components/Button";

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
    accessor: "totalMark",
  },
  {
    header: "Duration (Minutes)",
    accessor: "totalTime",
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
  const testList = useCTStore((state) => state.testList);

  useEffect(() => {
    loadClassTestList();
  }, []);
  return (
    <div className="flex">
      <PaginatedTable
        columns={columns}
        header={<h5>Class Test</h5>}
        data={testList || []}
      />
      {/* Pagination TODO */}
    </div>
  );
};

export default ClassTestPage;
