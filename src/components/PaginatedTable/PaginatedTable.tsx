import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import type { Column } from "../types";
import Table from "../Table";
import { usePaginatedTable } from "./hooks/usePaginatedTable";

interface PaginatedTableProps<T> {
  columns: Column<T>[];
  data: T[];
  header?: React.ReactNode;
  itemsPerPage?: number;
}

const PaginatedTable = <T,>({
  columns,
  data,
  header,
  itemsPerPage = 5,
}: PaginatedTableProps<T>) => {
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToFirst,
    goToLast,
    goToPrev,
    goToNext,
  } = usePaginatedTable(data, itemsPerPage);

  return (
    <div className="flex-1 border-1 border-[var(--border-primary)] rounded-lg overflow-hidden">
      {header && <div className="p-6 pb-5">{header}</div>}
      <Table columns={columns} data={paginatedData} />

      {/* Pagination Controls */}
      <div className="flex justify-end items-center py-2 px-6">
        <div className="flex items-center gap-2">
          <p>
            Page {currentPage} of {totalPages || 1}
          </p>
          <div className="flex items-center gap-1">
            <button
              className="w-[32px] h-[32px] border-1 border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-bg-secondary)] rounded-sm flex justify-center items-center"
              onClick={goToFirst}
              disabled={currentPage === 1}
            >
              <FiChevronsLeft />
            </button>
            <button
              className="w-[32px] h-[32px] border-1 border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-bg-secondary)] rounded-sm flex justify-center items-center"
              onClick={goToPrev}
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </button>
            <button
              className="w-[32px] h-[32px] border-1 border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-bg-secondary)] rounded-sm flex justify-center items-center"
              onClick={goToNext}
              disabled={currentPage === totalPages}
            >
              <FiChevronRight />
            </button>
            <button
              className="w-[32px] h-[32px] border-1 border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--surface-bg-secondary)] rounded-sm flex justify-center items-center"
              onClick={goToLast}
              disabled={currentPage === totalPages}
            >
              <FiChevronsRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginatedTable;
