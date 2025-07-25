import { BiChevronDown } from "react-icons/bi";
import cn from "../utils/classNames";
import { MdCheck } from "react-icons/md";
import { createPortal } from "react-dom";
import { useRef, useLayoutEffect, useState } from "react";

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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'absolute',
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        zIndex: 50
      });
    }
  }, [isOpen]);

  const dropdown = (
    <div style={dropdownStyle} className="flex flex-col gap-2 bg-[var(--surface-bg-secondary)] rounded-lg shadow-lg p-2">
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
            "flex gap-2 items-center justify-between p-2 cursor-pointer rounded-md !font-semibold",
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
  );
  
  return (
    <div className="relative inline-block text-left max-w-[250px]">
      {/* Trigger button */}
      <button
        ref={buttonRef}
        onClick={onToggle}
        className={cn(
          "w-full flex gap-2 items-center justify-between p-2 rounded-md focus:outline-none",
          "bg-[var(--surface-bg-primary)] border-1 border-[var(--border-secondary)] hover:bg-[var(--surface-bg-secondary)]"
        )}
      >
        <span className="text-left">
          {selectedIndex !== null ? items[selectedIndex] : "Select an option"}
        </span>
        <BiChevronDown size={18} className="text-[var(--text-tertiary)]" />
      </button>

      {/* Dropdown list */}
      {isOpen && createPortal(dropdown, document.body)}
    </div>
  );
};

export default Select;
