import { BiChevronDown } from "react-icons/bi";
import cn from "../utils/classNames";
import { MdCheck } from "react-icons/md";
import { useRef, useEffect } from "react";

interface SelectProps<T = string> {
  type?: string;
  items: T[];
  selectedIndex: number | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (index: number) => void;
  className?: string;
  dropdownClassName?: string;
  dropdownItemClassName?: string;
  renderItem?: (item: T, index: number, isSelected: boolean) => React.ReactNode;
  getItemLabel?: (item: T) => string;
}

const Select = <T,>({
  type,
  items,
  selectedIndex,
  isOpen,
  onToggle,
  onSelect,
  className = "",
  dropdownClassName = "",
  dropdownItemClassName = "",
  renderItem,
  getItemLabel,
}: SelectProps<T>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return; // clicked inside
      }
      onToggle(); // clicked outside -> close
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const triggerLabel =
    selectedIndex !== null && items[selectedIndex] !== undefined
      ? getItemLabel
        ? getItemLabel(items[selectedIndex])
        : String(items[selectedIndex])
      : "Select an option";

  return (
    <div className={cn("relative z-99 inline-block text-left", className)}>
      <button
        ref={buttonRef}
        onClick={onToggle}
        className={cn(
          "w-full h-full flex gap-2 items-center justify-between p-2 rounded-md focus:outline-none",
          "bg-[var(--surface-bg-secondary)] border-1 border-[var(--border-secondary)] hover:bg-[var(--surface-bg-tertiary)]"
        )}
      >
        <span className="text-left flex-1">{triggerLabel ?? ""}</span>
        <BiChevronDown size={18} className="text-[var(--text-tertiary)]" />
      </button>
      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute mt-1 flex flex-col gap-2 bg-[var(--surface-bg-secondary)] rounded-lg shadow-lg p-2 max-h-[500px] overflow-y-auto",
            dropdownClassName
          )}
        >
          {type && (
            <span className="px-4 text-[var(--text-tertiary)] !font-medium">
              {type}
            </span>
          )}
          {items.map((item, index) => {
            const isSelected = index === selectedIndex;

            return (
              <div
                key={index}
                onClick={() => {
                  onSelect(index);
                  onToggle(); // close after selecting
                }}
                className={cn(
                  "flex gap-2 items-center justify-between p-2 cursor-pointer rounded-md !font-semibold",
                  isSelected
                    ? "bg-[var(--surface-bg-tertiary)] text-[var(--text-primary)]"
                    : "hover:bg-[var(--surface-bg-tertiary)]",
                  dropdownItemClassName
                )}
              >
                {renderItem ? (
                  renderItem(item, index, isSelected)
                ) : (
                  <>
                    <span>
                      {getItemLabel ? getItemLabel(item) : String(item)}
                    </span>
                    {isSelected && (
                      <MdCheck
                        size={14}
                        className="text-[var(--text-tertiary)]"
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
