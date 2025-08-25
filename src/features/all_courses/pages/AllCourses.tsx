import { useEffect, useState } from "react";
import AllCoursesHeader from "../components/AllCoursesHeader";
import CoursesCards from "../components/CoursesCards";
import ChildLayout from "../../../layouts/child-layout/ChildLayout";
import { fetchCategoryAndCourses } from "../services/fetchCategoryAndCourses";
import { FilterCourses } from "../components/FilterCourses";

const AllCourses = () => {
  const [search, setsearch] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setloading] = useState(false);
  const [hideSecondary, setHideSecondary] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setloading(true);
      try {
        const res = await fetchCategoryAndCourses();
        console.log(res)
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
    <div id="allcourses">
      <AllCoursesHeader
        search={search}
        setSearch={setsearch}
        onClickFilter={() => setHideSecondary((prev) => !prev)}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      
      <div>
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
                selectedCategories={selectedCategories}
              />
            )
          }
          secondaryContent={
            <FilterCourses
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          }
          hideSecondary={hideSecondary}
        />
      </div>
    </div>
  );
};

export default AllCourses;
