// Icons
import { FiFilter } from "react-icons/fi";

// Types
import type { CategoryType } from "../../shared/types";

// Hooks
import useIsMobile from "../../../hooks/useIsMobile";
import cn from "../../../utils/classNames";
import GlobalSearch from "../../../components/GlobalSearch";
import { useCoursesStore } from "../hooks/useCoursesStore";
import { resetPromocode } from "../services/resetPromocode";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

interface AllCoursesHeaderProps {
  selectedCategory: CategoryType | null;
  setSelectedCategory: (category: CategoryType) => void;
  isFilterSectionOpen: boolean;
  onClickFilter: () => void;
  setHideSecondary: (v: boolean) => void;
  className?: string;
}

// GTM Constant ID
const ALL_COURSES_SEARCHBAR_ID = "all_courses_searchbar_id";

/**
 * Header component for the All Courses page, providing search and category selection UI.
 */
const AllCoursesHeader = ({
  selectedCategory,
  setHideSecondary,
  className = "",
}: AllCoursesHeaderProps) => {
  const isMobile = useIsMobile();
  const searchData = useCoursesStore((s) => s.searchData);
  const setSelectedCourse = useCoursesStore(s => s.setSelectedCourse)
  const setIsPlanModalOpen = useCoursesStore(s => s.setIsPlanModalOpen)
  return (
    <div
      className={cn(
        "relative p-4 flex flex-col gap-2 md:w-[60%] lg:w-[70%]",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row gap-3 justify-between lg:items-center">
        <h3>Select Exams</h3>
        <div className="flex items-center gap-4">
          <GlobalSearch
            id={ALL_COURSES_SEARCHBAR_ID}
            placeholder="Search exams..."
            // onSearch={(data) => setSearch(data)}
            data={searchData ?? []}
            onSelect={(course: any) => {
              pushToDataLayer({
                event: gtmEvents.all_courses_searchbar_click,
              })
              setSelectedCourse(course);
              setIsPlanModalOpen(true);
              resetPromocode();
            }}
            renderItem={(course) => (
              <div>
                {course.courseSubTitle && <p>{course.courseSubTitle}</p>}
              </div>
            )}
            searchBarClassName="all_courses_searchbar"
          />
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
