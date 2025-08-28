import { FiSearch, FiFilter } from "react-icons/fi";
import Button from "../../../components/Button";
import Badge from "../../../components/Badge";
import { Theme } from "../../../utils/colors";
import { BiX } from "react-icons/bi";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";

interface AllCoursesHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  selectedCategories: string[];
  onClickFilter: () => void;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[] | null>>;
  isFilterSectionOpen: boolean;
}

const AllCoursesHeader = ({
  search,
  setSearch,
  onClickFilter,
  selectedCategories,
  setSelectedCategories,
  isFilterSectionOpen,
}: AllCoursesHeaderProps) => {
  const handleRemoveCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev ? prev.filter((c): c is string => c !== category) : []
    );
  };

  useEffect(() => {
    const element = document.getElementById("allcourses");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedCategories]);

  return (
    <div className="sticky top-0 z-50 mb-2 bg-[var(--app-bg)]">
      <div className="p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-between">
        <h3 className="font-semibold">Select Course</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center min-w-[300px] max-w-[300px] bg-[var(--surface-bg-secondary)] rounded-full px-4 py-2">
            <FiSearch className="text-[var(--text-tertiary)] mr-2" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
            />
          </div>
          <Button
            style="primary"
            onClick={onClickFilter}
            className="flex items-center gap-2 rounded-full"
          >
            {!isFilterSectionOpen ? (
              <FiFilter className="text-lg" />
            ) : (
              <MdClose className="text-lg" />
            )}
            <p>Filter</p>
          </Button>
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <div className="sticky bottom-0 bg-[var(--surface-bg-primary)] px-4 py-2 flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <div key={category} onClick={() => handleRemoveCategory(category)}>
              <Badge theme={Theme.Ocean} style="filled">
                <p>{category}</p>
                <BiX />
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCoursesHeader;
