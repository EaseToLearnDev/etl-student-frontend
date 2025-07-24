import { BiChevronDown } from "react-icons/bi";
import cn from "../utils/classNames";
import { MdCheck } from "react-icons/md";

interface SelectProps {
  type?: string;
  items: string[];
  selectedIndex: number | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (index: number) => void;
}

/**
 * A Customizable Select Component
 */
const Select = ({
  type,
  items,
  selectedIndex,
  isOpen,
  onToggle,
  onSelect,
}: SelectProps) => {
  return (
    <div className="relative inline-block text-left max-w-[250px]">
      {/* Trigger button */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between px-4 py-2 rounded-md focus:outline-none",
          "bg-[var(--surface-bg-primary)] border-1 border-[var(--border-secondary)] hover:bg-[var(--surface-bg-secondary)]"
        )}
      >
        <span className="text-left">
          {selectedIndex !== null ? items[selectedIndex] : "Select an option"}
        </span>
        <BiChevronDown size={18} className="text-[var(--text-tertiary)]" />
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <div className="max-w-[250px] absolute flex flex-col gap-2 z-10 mt-1 bg-[var(--surface-bg-secondary)] rounded-lg shadow-lg p-2">
          {type && (
            <span className="px-4 text-[var(--text-tertiary)] !font-medium">
              {type}
            </span>
          )}
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(index);
                onToggle();
              }}
              className={cn(
                "flex gap-1 items-center justify-between px-4 py-2 cursor-pointer rounded-md !font-semibold",
                index === selectedIndex
                  ? "bg-[var(--surface-bg-tertiary)] text-[var(--text-primary)]"
                  : "hover:bg-[var(--surface-bg-tertiary)]"
              )}
            >
              <span>{item}</span>
              {index === selectedIndex && (
                <MdCheck size={14} className="text-[var(--text-tertiary)]" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
