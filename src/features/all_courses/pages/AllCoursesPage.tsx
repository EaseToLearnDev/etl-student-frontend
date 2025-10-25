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
import CoursesCardSkeleton from "../components/CoursesCardSkeleton";
import { resetPromocode } from "../services/resetPromocode";
import UpdateEmailModal from "../components/UpdateEmailModal";
import { useLocation } from "react-router";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

const ALL_COURSES_CARD_CLICK_ID = "all_courses_card_id";

/**
 * Renders the All Courses page, displaying a list of courses with filtering options.
 */
const AllCoursesPage = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const reset = useCoursesStore((s) => s.reset);
  const search = useCoursesStore((s) => s.search);
  const loading = useCoursesStore((s) => s.loading);
  const setLoading = useCoursesStore((s) => s.setLoading);
  const isPlanModalOpen = useCoursesStore((s) => s.isPlanModalOpen);
  const setIsPlanModalOpen = useCoursesStore((s) => s.setIsPlanModalOpen);
  const isUpdateEmailModalOpen = useCoursesStore(
    (s) => s.isUpdateEmailModalOpen
  );
  const setIsUpdateEmailModalOpen = useCoursesStore(
    (s) => s.setIsUpdateEmailModalOpen
  );
  const courseList = useCoursesStore((s) => s.courseList);
  const setCourseList = useCoursesStore((s) => s.setCourseList);
  const categoryList = useCoursesStore((s) => s.categoryList);
  const setCategoryList = useCoursesStore((s) => s.setCategoryList);
  const selectedCategory = useCoursesStore((s) => s.selectedCategory);
  const setSelectedCategory = useCoursesStore((s) => s.setSelectedCategory);
  const selectedCourse = useCoursesStore((s) => s.selectedCourse);
  const setSelectedCourse = useCoursesStore((s) => s.setSelectedCourse);

  const [hideSecondary, setHideSecondary] = useState<boolean>(
    isMobile ? true : false
  );

  const courseId = new URLSearchParams(location.search).get("cid");

  // fetch categories & courses on mount
  useEffect(() => {
    setLoading(true);
    const fetchCourses = async () => {
      try {
        const data = await fetchCategoryAndCourses();
        if (data) {
          const courses = extractCourses(data);
          setCourseList(courses);
          setCategoryList(data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
    return () => reset();
  }, []);

  // watch "courseId" param changes
  useEffect(() => {
    if (!courseList?.length) return;
    const cid = new URLSearchParams(location.search).get("cid");
    if (cid) {
      const numCourseId = Number(cid);
      if (!isNaN(numCourseId)) {
        const preSelectedCourse = courseList.find(
          (c) => c.courseId === numCourseId
        );
        if (preSelectedCourse) {
          setSelectedCourse(preSelectedCourse);
          setIsPlanModalOpen(true);
          resetPromocode();
        }
      }
    }
  }, [location.key, courseList]);

  return (
    <div className="h-full flex flex-col flex-grow">
      {/* Header */}
      <AllCoursesHeader
        onClickFilter={() => setHideSecondary(!hideSecondary)}
        isFilterSectionOpen={!hideSecondary}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setHideSecondary={setHideSecondary}
      />

      {/* Main Layout */}
      <ChildLayout
        primaryContent={
          loading ? (
            <CoursesCardSkeleton />
          ) : (
            <CoursesCards
              search={search}
              courseList={courseList || []}
              selectedCourse={selectedCourse}
              hideSecondary={hideSecondary}
              selectedCategory={selectedCategory}
              onCourseClick={(course) => {
                pushToDataLayer({
                  event: gtmEvents.all_courses_card_click,
                  course_id: course.courseId,
                  course_name: course.courseTitle,
                  id: ALL_COURSES_CARD_CLICK_ID
                });
                setSelectedCourse(course);
                setIsPlanModalOpen(true);
                resetPromocode();
              }}
            />
          )
        }
        secondaryContent={
          <FilterCourses
            categories={categoryList || []}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setHideSecondary={setHideSecondary}
          />
        }
        secondaryClassName="pt-0"
        hideSecondary={hideSecondary}
        onSecondaryHide={() => {
          setHideSecondary(true);
          setSelectedCourse(null);
        }}
      />

      <Modal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        size={isMobile ? "lg" : "xl"}
        className="p-4"
      >
        <PlanDetails
          course={selectedCourse!}
          onClose={() => setIsPlanModalOpen(false)}
        />
      </Modal>

      <UpdateEmailModal
        isOpen={isUpdateEmailModalOpen}
        onClose={() => setIsUpdateEmailModalOpen(false)}
      />
    </div>
  );
};
export default AllCoursesPage;
