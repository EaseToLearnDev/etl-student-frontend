import cn from "../utils/classNames";
import type { Column } from "./types";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  tableClassName?: string;
}
const Table = <T,>({ columns, data, tableClassName = "" }: TableProps<T>) => {
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
              className="border-b-1 last:border-0 border-[var(--border-primary)] hover:bg-[var(--surface-bg-primary)]"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`py-6 px-6 whitespace-nowrap ${col.className || ""}`}>
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
