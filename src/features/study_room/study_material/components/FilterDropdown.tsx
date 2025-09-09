// React
import { useState } from "react";

// Types
import type { ReactElement, RefObject } from "react";
import type { FilterType } from "../sm.types";

// Hooks
import useIsMobile from "../../../../hooks/useIsMobile";
import { useSMStore } from "../hooks/useSMStore";

// Components
import { Popover } from "../../../../components/Popover/Popover";
import { PopoverTrigger } from "../../../../components/Popover/PopoverTrigger";
import { PopoverContent } from "../../../../components/Popover/PopoverContent";
import { MdCheck } from "react-icons/md";
import cn from "../../../../utils/classNames";

/**
 * Dropdown component for filtering study materials by type.
 */
const FilterList = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setContentFilterType, contentFilterType } = useSMStore();

  const handleClick = (filter: FilterType) => {
    setContentFilterType(filter);
    setIsOpen(false);
  };
  return (
    <div className="w-full flex flex-col items-center gap-2 p-1">
      {(["All", "Text", "PPT", "PDF", "Video"] as FilterType[]).map(
        (filter) => (
          <div
            onClick={() => handleClick(filter)}
            key={filter}
            className={cn(
              "w-full flex items-center gap-1 p-2 px-4 rounded-md hover:bg-[var(--surface-bg-tertiary)] focus:bg-[var(--surface-bg-tertiary)] cursor-pointer",
              contentFilterType === filter ? "bg-[var(--surface-bg-tertiary)]" : ""
            )}
          >
            <p className="select-none">{filter}</p>
            {contentFilterType === filter ? <MdCheck size={14} className="text-[var(--text-tertiary)]" /> : <></>}
          </div>
        )
      )}
    </div>
  );
};

const FilterDropdown = ({
  children,
}: {
  children: ReactElement & { ref?: RefObject<any> };
}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      open={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement={isMobile ? "bottom" : "bottom-end"}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="z-[9999] p-4 bg-[var(--surface-bg-secondary)] [&>svg]:hidden [&>svg]:dark:fill-[var(--surface-bg-secondary)] sm:[&>svg]:inline-flex">
        <FilterList setIsOpen={setIsOpen} />
      </PopoverContent>
    </Popover>
  );
};

export default FilterDropdown;
