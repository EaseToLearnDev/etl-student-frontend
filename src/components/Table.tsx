import cn from "../utils/classNames";
import type { Column } from "./types";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  tableClassName?: string;
  onRowClick?: (row: T, index: number) => void;
  rowClassName?: string | ((row: T, index: number) => string);
}

const Table = <T,>({
  columns,
  data,
  tableClassName = "",
  onRowClick,
  rowClassName,
}: TableProps<T>) => {

  // Generate CSS class string for row
  const getRowClassName = (row: T, index: number) => {
    const baseClass =
      "border-b-1 last:border-0 border-[var(--border-primary)] hover:bg-[var(--surface-bg-primary)]";
    const clickableClass = onRowClick ? "cursor-pointer" : "";
    const customClass =
      typeof rowClassName === "function"
        ? rowClassName(row, index)
        : rowClassName || "";

    return cn(baseClass, clickableClass, customClass);
  };

  // handle row click
  const handleRowClick = (row: T, index: number) => {
    if (onRowClick) {
      onRowClick(row, index);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className={cn("min-w-full", tableClassName)}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                className="py-3 px-6 bg-[var(--surface-bg-secondary)] text-left !font-semibold text-[var(--text-secondary)] uppercase whitespace-nowrap"
                key={index}
              >
                <span>{col.header}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={getRowClassName(row, rowIndex)}
              onClick={() => handleRowClick(row, rowIndex)}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-6 px-6 whitespace-nowrap ${col.className || ""}`}
                >
                  {col.render
                    ? col.render(row)
                    : col.accessor
                    ? (row[col.accessor] as React.ReactNode)
                    : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
