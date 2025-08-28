import { useEffect, useState } from "react";
import AllCoursesHeader from "../components/AllCoursesHeader";
import CoursesCards from "../components/CoursesCards";
import ChildLayout from "../../../layouts/child-layout/ChildLayout";
import { fetchCategoryAndCourses } from "../services/fetchCategoryAndCourses";
import { FilterCourses } from "../components/FilterCourses";
import { PlanDetails } from "../components/PlanDetails";
import { MdArrowBack } from "react-icons/md";
import cn from "../../../utils/classNames";

const AllCoursesPage = () => {
  const [search, setsearch] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string[] | null>(
    null
  );
  const [loading, setloading] = useState(false);
  const [hideSecondary, setHideSecondary] = useState(true);

  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setloading(true);
      try {
        const res = await fetchCategoryAndCourses();
        const flatCourses =
          res?.obj?.flatMap((category: any) =>
            category.coursesList.map((course: any) => ({
              ...course,
              categoryName: category.categoryName,
              categoryId: category.categoryId,
            }))
          ) || [];
        const extractedCategories =
          res?.obj?.map((category: any) => category.categoryName) || [];
        setCourseList(flatCourses);
        setCategories(extractedCategories);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setloading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      {selectedCourse ? (
        <div className="flex flex-row gap-2 items-center mb-2">
          <div
            onClick={() => setSelectedCourse(null)}
            className={cn(
              "w-[34px] h-[34px] flex justify-center items-center",
              "cursor-pointer border-1 border-[var(--border-primary)] rounded-full hover:bg-[var(--surface-bg-secondary)]"
            )}
          >
            <MdArrowBack size={20} />
          </div>
          <h3>{selectedCourse.courseTitle} Plan Details</h3>
        </div>
      ) : (
        <AllCoursesHeader
          search={search}
          setSearch={setsearch}
          onClickFilter={() => setHideSecondary((prev) => !prev)}
          isFilterSectionOpen={!hideSecondary}
          selectedCategories={selectedCategories || []}
          setSelectedCategories={setSelectedCategories}
        />
      )}

      <div>
        {selectedCourse ? (
          <ChildLayout
            primaryContent={<PlanDetails course={selectedCourse} />}
            hideSecondary={true}
          />
        ) : (
          <ChildLayout
            primaryContent={
              loading ? (
                <div className="flex justify-center items-center h-64 text-lg font-semibold">
                  Loading courses...
                </div>
              ) : (
                <CoursesCards
                  search={search}
                  courseList={courseList}
                  hideSecondary={hideSecondary}
                  selectedCategories={selectedCategories || []}
                  onCourseClick={(course) => {
                    setSelectedCourse(course);
                    setHideSecondary(false);
                  }}
                />
              )
            }
            secondaryContent={
              <FilterCourses
                categories={categories}
                selectedCategories={selectedCategories || []}
                setSelectedCategories={setSelectedCategories}
              />
            }
            hideSecondary={hideSecondary}
            onSecondaryHide={() => {
              setHideSecondary(true);
              setSelectedCourse(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage;
