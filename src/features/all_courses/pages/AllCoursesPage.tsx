import { useEffect, useState } from "react";

// Hooks
import { useCoursesStore } from "../hooks/useCoursesStore";
import useIsMobile from "../../../hooks/useIsMobile";

// Services & Utils
import { fetchCategoryAndCourses } from "../services/fetchCategoryAndCourses";
import { extractCourses } from "../services/extractCourses";

// Components
import ChildLayout from "../../../layouts/child-layout/ChildLayout";
import AllCoursesHeader from "../components/AllCoursesHeader";
import CoursesCards from "../components/CoursesCards";
import { FilterCourses } from "../components/FilterCourses";
import { Modal } from "../../../components/Modal";
import { PlanDetails } from "../components/PlanDetails";

/**
 * Renders the All Courses page, displaying a list of courses with filtering options.
 */
const AllCoursesPage = () => {

  const isMobile = useIsMobile();
  const reset = useCoursesStore(s => s.reset);
  const search = useCoursesStore((s) => s.search);
  const setSearch = useCoursesStore((s) => s.setSearch);
  // const loading = useCoursesStore((s) => s.loading);
  // const setLoading = useCoursesStore((s) => s.setLoading);
  const isPlanModalOpen = useCoursesStore((s) => s.isPlanModalOpen);
  const setIsPlanModalOpen = useCoursesStore((s) => s.setIsPlanModalOpen);
  const courseList = useCoursesStore((s) => s.courseList);
  const setCourseList = useCoursesStore((s) => s.setCourseList);
  const categoryList = useCoursesStore((s) => s.categoryList);
  const setCategoryList = useCoursesStore((s) => s.setCategoryList);
  const selectedCategories = useCoursesStore((s) => s.selectedCategories);
  const setSelectedCategories = useCoursesStore((s) => s.setSelectedCategories);
  const selectedCourse = useCoursesStore((s) => s.selectedCourse);
  const setSelectedCourse = useCoursesStore((s) => s.setSelectedCourse);

  const [hideSecondary, setHideSecondary] = useState<boolean>(
    isMobile ? true : false
  );

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await fetchCategoryAndCourses();

      const courses = extractCourses(data);
      if (courses && courses.length > 0) {
        setCourseList(courses);
      }
      if (data) {
        setCategoryList(data);
      }
    };

    fetchCourses();

    return () => reset();
  }, []);

  return (
    <div className="h-full flex flex-col flex-grow">
      {/* Header */}
      <AllCoursesHeader
        search={search}
        setSearch={setSearch}
        onClickFilter={() => setHideSecondary(!hideSecondary)}
        isFilterSectionOpen={!hideSecondary}
        selectedCategories={selectedCategories || []}
        setSelectedCategories={setSelectedCategories}
        setHideSecondary={setHideSecondary}
      />

      {/* Main Layout */}
      <ChildLayout
        primaryContent={
          <CoursesCards
            search={search}
            courseList={courseList || []}
            selectedCourse={selectedCourse}
            hideSecondary={hideSecondary}
            selectedCategories={selectedCategories || []}
            onCourseClick={(course) => {
              setSelectedCourse(course);
              setIsPlanModalOpen(true);
            }}
          />
        }
        secondaryContent={
          <FilterCourses
            categories={categoryList || []}
            selectedCategories={selectedCategories || []}
            setSelectedCategories={setSelectedCategories}
            setHideSecondary={setHideSecondary}
          />
        }
        hideSecondary={hideSecondary}
        onSecondaryHide={() => {
          setHideSecondary(true);
          setSelectedCourse(null);
        }}
        secondaryInitialHeight={0.6}
      />

      <Modal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        size="xl"
        containerClassName="!h-full !w-full !max-w-full bg-[var(--surface-bg-primary)] p-0 sm:p-0 overflow-hidden"
        className="p-4 lg:p-10"
      >
        <PlanDetails
          course={selectedCourse!}
          onClose={() => setIsPlanModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default AllCoursesPage;
