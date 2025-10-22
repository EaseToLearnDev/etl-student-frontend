import { XMarkIcon } from "@heroicons/react/24/outline";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import useIsMobile from "../../../hooks/useIsMobile";
import cn from "../../../utils/classNames";
import { Theme } from "../../../utils/colors";
import type { CategoryType } from "../../shared/types";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

interface FilterCoursesProps {
  categories: CategoryType[];
  selectedCategory: CategoryType | null;
  setSelectedCategory: (category: CategoryType | null) => void;
  setHideSecondary: (v: boolean) => void;
}
// GTM ID's
const all_courses_clear_filter_id = "all_courses_clear_filter_id";
const all_courses_filter_category_ID = "all_courses_filter_category_id";
/**
 * Renders a category filter component for selecting and clearing course categories.
 */
export const FilterCourses = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setHideSecondary,
}: FilterCoursesProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full h-full px-2">
      <div className="sticky top-0 z-10 bg-[var(--surface-bg-primary)] flex gap-4 justify-between items-center pt-5 pb-2">
        <h5>Filters</h5>
        <p
          id={all_courses_clear_filter_id}
          onClick={() => {
            pushToDataLayer({
              event: gtmEvents.all_courses_clear_filter_click,
            });
            setSelectedCategory(null)
          }}
          className="cursor-pointer text-[var(--text-tertiary)] text-nowrap"
        >
          Clear
        </p>
      </div>
      <div className="mt-7 flex flex-col gap-4">
        <h6>Categories</h6>
        <div
          className="flex flex-wrap gap-3 pb-28 sm:pb-0"
        >
          {categories.map((category) => {
            const isCategorySelected =
              selectedCategory?.categoryId === category?.categoryId;

            return (
              <Badge
                theme={isCategorySelected ? Theme.Ocean : Theme.Neutral}
                style={isCategorySelected ? "filled" : "outline"}
                onClickHandler={() => {
                  pushToDataLayer({
                    event: gtmEvents.all_courses_filter_category_click,
                    id: all_courses_filter_category_ID,
                    category_name: category.categoryName,
                  });
                  setSelectedCategory(isCategorySelected ? null : category);
                }}
                className={cn("border !border-[var(--border-secondary)]")}
              >
                <p>{category.categoryName}</p>
                {isCategorySelected && <XMarkIcon width={15} height={15} />}
              </Badge>
            );
          })}
        </div>
      </div>

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 h-[100px] bg-[var(--surface-bg-primary)] px-8 flex items-center justify-between">
          <Button
            className="w-full"
            onClick={() => setHideSecondary(true)}
            disabled={!selectedCategory}
          >
            Show Filtered Courses
          </Button>
        </div>
      )}
    </div>
  );
};
