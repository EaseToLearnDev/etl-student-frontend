import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import useIsMobile from "../../../hooks/useIsMobile";
import cn from "../../../utils/classNames";
import { Theme } from "../../../utils/colors";
import type { CategoryType } from "../allCourses.types";

interface FilterCoursesProps {
  categories: CategoryType[];
  selectedCategories: CategoryType[];
  setSelectedCategories: (categoryList: CategoryType[]) => void;
  setHideSecondary: (v: boolean) => void;
}

/**
 * Renders a category filter component for selecting and clearing course categories.
 */
export const FilterCourses = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  setHideSecondary,
}: FilterCoursesProps) => {
  const isMobile = useIsMobile();

  const onClickHandler = (category: CategoryType) => {
    const isAlreadySelected = selectedCategories.some(
      (c) => c.categoryId === category.categoryId
    );

    const updatedCategories = isAlreadySelected
      ? selectedCategories.filter((c) => c.categoryId !== category.categoryId)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  return (
    <div className="relative w-full h-full px-2">
      <div className="flex gap-4 justify-between items-center">
        <h5>Filters</h5>
        <p
          onClick={() => setSelectedCategories([])}
          className="cursor-pointer text-[var(--text-tertiary)] text-nowrap"
        >
          Clear All
        </p>
      </div>
      <div className="mt-7 flex flex-col gap-4">
        <h6>Categories</h6>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isCategorySelected = selectedCategories.some(
              (c) => c.categoryId === category.categoryId
            );

            return (
              <Badge
                key={category.categoryId}
                theme={isCategorySelected ? Theme.Ocean : Theme.Neutral}
                style={isCategorySelected ? "filled" : "outline"}
                onClickHandler={() => onClickHandler(category)}
                className={cn("border !border-[var(--border-secondary)]")}
              >
                <p>{category.categoryName}</p>
              </Badge>
            );
          })}
        </div>
      </div>

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 h-[100px] bg-[var(--surface-bg-primary)] px-8 flex items-center justify-between">
          <Button className="w-full" onClick={() => setHideSecondary(true)} disabled={selectedCategories?.length === 0}>
            Show Filtered Courses
          </Button>
        </div>
      )}
    </div>
  );
};
