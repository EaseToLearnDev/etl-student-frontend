// Icons
import { FiFilter, FiSearch } from "react-icons/fi";

// Types
import type { CategoryType } from "../../shared/types";

// Hooks
import useIsMobile from "../../../hooks/useIsMobile";
import cn from "../../../utils/classNames";

interface AllCoursesHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategory: CategoryType | null;
  setSelectedCategory: (category: CategoryType) => void;
  isFilterSectionOpen: boolean;
  onClickFilter: () => void;
  setHideSecondary: (v: boolean) => void;
  className?: string;
}

/**
 * Header component for the All Courses page, providing search and category selection UI.
 */
const AllCoursesHeader = ({
  search,
  setSearch,
  selectedCategory,
  setHideSecondary,
  className = "",
}: AllCoursesHeaderProps) => {
  const isMobile = useIsMobile();
  return (
    <div className={cn("relative p-4 flex flex-col gap-2 md:w-[60%] lg:w-[70%]", className)}>
      <div className="flex flex-col lg:flex-row gap-3 justify-between lg:items-center">
        <h3>Select Course</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center w-full bg-[var(--surface-bg-secondary)] rounded-lg px-4 py-3">
            <FiSearch className="text-[var(--text-tertiary)] mr-2" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
            />
          </div>
          {isMobile && (
            <div
              className="relative size-[50px] aspect-square rounded-lg flex justify-center items-center bg-[var(--surface-bg-secondary)] cursor-pointer"
              onClick={() => setHideSecondary(false)}
            >
              <FiFilter size={20} />
              {selectedCategory ? (
                <div className="w-4 h-4 aspect-square absolute -top-1 -right-1 bg-[var(--sb-ocean-bg-active)] rounded-full flex justify-center items-center" />
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCoursesHeader;
