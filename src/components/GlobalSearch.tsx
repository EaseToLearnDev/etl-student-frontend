import { useState, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import cn from "../utils/classNames";

interface GlobalSearchProps {
  placeholder?: string;
  debounceDelay?: number;
  data: any[];
  onSelect: (item: string) => void;
  renderItem?: (item: any) => React.ReactNode;
  searchBarClassName?: string;
  searchDataClassName?: string;
}

const GlobalSearch = ({
  placeholder = "Search...",
  debounceDelay = 300,
  data,
  onSelect,
  renderItem,
  searchDataClassName,
  searchBarClassName,
}: GlobalSearchProps) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<any[] | null>(data);

  const debouncedSearch = useCallback(() => {
    const handler = setTimeout(() => {
      const query = search.trim().toLowerCase();
      if (query) {
        const filteredData = data.filter((item) => {
          return Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          );
        });

        setFiltered(filteredData);
        setIsOpen(true);
      } else {
        setIsOpen(false);
        setFiltered(null);
      }
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [search, debounceDelay, data]);

  useEffect(() => {
    const cleanup = debouncedSearch();
    return cleanup;
  }, [search, debouncedSearch]);

  return (
    <div className={cn("relative w-full", searchDataClassName)}>
      <div
        className={cn(
          "flex items-center w-full bg-[var(--surface-bg-secondary)] rounded-lg px-4 py-3",
          searchBarClassName
        )}
      >
        <FiSearch className="text-[var(--text-tertiary)] mr-2" />
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
        />
      </div>
      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute mt-1 w-full bg-[var(--surface-bg-secondary)] border border-[var(--border-primary)] rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
          {filtered && filtered.length > 0 ? (
            filtered.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-[var(--sb-ocean-bg-active)] hover:text-white text-[var(--text-primary)]"
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                  setFiltered(null);
                  setSearch("");
                }}
              >
                {renderItem ? renderItem(item) : String(item)}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-[var(--text-tertiary)]">
              No such data available
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default GlobalSearch;
