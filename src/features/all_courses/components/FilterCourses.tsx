import Badge from "../../../components/Badge";
import cn from "../../../utils/classNames";
import { Theme } from "../../../utils/colors";

interface FilterCoursesProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[] | null>>;
}

export const FilterCourses = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}: FilterCoursesProps) => {
  const handleCheckboxChange = (category: string) => {
    setSelectedCategories(
      (prev) =>
        prev
          ? prev.includes(category)
            ? prev.filter((c): c is string => c !== category)
            : [...prev, category]
          : [category]
    );
  };

  return (
    <div>
      <div className="flex gap-4 justify-between items-center">
        <h5>Filter by Category</h5>
        <p
          onClick={() => setSelectedCategories(null)}
          className="cursor-pointer"
        >
          Clear All
        </p>
      </div>
      <div className="flex flex-wrap gap-3 mt-7">
        {categories.map((category, index) => {
          const isCategorySelected = selectedCategories.includes(category);
          return (
            <Badge
              key={index}
              theme={isCategorySelected ? Theme.Ocean : Theme.Neutral}
              style={isCategorySelected ? "filled" : "outline"}
              onClickHandler={() => handleCheckboxChange(category)}
              className={cn("border !border-[var(--border-secondary)]")}
            >
              {category}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
