import { useState, type ReactElement, type RefObject } from "react";
import { Popover } from "rizzui/popover";
import useIsMobile from "../../../../hooks/useIsMobile";
import type { FilterType } from "../sm.types";
import useStudyMaterial from "../hooks/useStudyMaterial";

const FilterList = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
   const {setContentFilterType} = useStudyMaterial();

  const handleClick = (filter: FilterType) => {
    setContentFilterType(filter);
    setIsOpen(false);
  };
  return (
    <div className="w-full flex flex-col items-center gap-2 p-1">
      {(["All", "PPT", "PDF", "Video"] as FilterType[]).map((filter) => (
        <div
          onClick={() => handleClick(filter)}
          key={filter}
          className="w-full p-2 rounded-md hover:bg-[var(--surface-bg-tertiary)] focus:bg-[var(--surface-bg-tertiary)] cursor-pointer"
        >
          <p className="select-none">{filter}</p>
        </div>
      ))}
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
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement={isMobile ? "bottom" : "bottom-end"}
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="z-[9999] bg-[var(--surface-bg-secondary)] [&>svg]:hidden [&>svg]:dark:fill-[var(--surface-bg-secondary)] sm:[&>svg]:inline-flex">
        <FilterList setIsOpen={setIsOpen} />
      </Popover.Content>
    </Popover>
  );
};

export default FilterDropdown;
