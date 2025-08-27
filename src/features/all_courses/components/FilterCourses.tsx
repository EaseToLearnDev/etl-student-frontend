
interface FilterCoursesProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterCourses = ({ categories, selectedCategories, setSelectedCategories }: FilterCoursesProps) => {

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c): c is string => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div>
      <h5 className="mb-3">Filter by Category</h5>
      <div className="space-y-2">
        {categories.map((category) => (
          <label key={category} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category)}
              className="w-4 h-4 accent-blue-500"
            />
            <p>{category}</p>
          </label>
        ))}
      </div>
    </div>
  );
};
