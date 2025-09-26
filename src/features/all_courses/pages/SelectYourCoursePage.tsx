import { useEffect, useState } from "react";

// Utils
import cn from "../../../utils/classNames";

// Hooks
import { useCoursesStore } from "../hooks/useCoursesStore";
import useIsMobile from "../../../hooks/useIsMobile";

// Services
import { fetchCategoryAndCourses } from "../services/fetchCategoryAndCourses";
import { extractCourses } from "../services/extractCourses";

// Components
import ChildLayout from "../../../layouts/child-layout/ChildLayout";
import AllCoursesHeader from "../components/AllCoursesHeader";
import CoursesCards from "../components/CoursesCards";
import { FilterCourses } from "../components/FilterCourses";
import CoursesCardSkeleton from "../components/CoursesCardSkeleton";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { Toast } from "../../../components/Toast";
import { ToastType } from "../../shared/types";
import { processCourseSelection } from "../services/processCourseSelection";
import { useNavigate } from "react-router";

const SelectYourCoursePage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const reset = useCoursesStore((s) => s.reset);
  const search = useCoursesStore((s) => s.search);
  const loading = useCoursesStore((s) => s.loading);
  const setLoading = useCoursesStore((s) => s.setLoading);
  const courseList = useCoursesStore((s) => s.courseList);
  const setCourseList = useCoursesStore((s) => s.setCourseList);
  const categoryList = useCoursesStore((s) => s.categoryList);
  const setCategoryList = useCoursesStore((s) => s.setCategoryList);
  const selectedCategory = useCoursesStore((s) => s.selectedCategory);
  const setSelectedCategory = useCoursesStore((s) => s.setSelectedCategory);
  const selectedCourse = useCoursesStore((s) => s.selectedCourse);
  const setSelectedCourse = useCoursesStore((s) => s.setSelectedCourse);
  const toastData = useToastStore((s) => s.toastData);

  const [hideSecondary, setHideSecondary] = useState<boolean>(
    isMobile ? true : false
  );

  const courseId = new URLSearchParams(location.search).get("cid");

  useEffect(() => {
    setLoading(true);
    const fetchCourses = async () => {
      try {
        const data = await fetchCategoryAndCourses();

        const courses = extractCourses(data);
        if (courses && courses.length > 0) {
          setCourseList(courses);
          const numCourseId = Number(courseId);
          if (!isNaN(numCourseId)) {
            const preSelectedCourse = courses?.find(
              (c) => c.courseId === numCourseId
            );
            if (preSelectedCourse) {
              setSelectedCourse(preSelectedCourse);
            }
          }
        }
        if (data) {
          setCategoryList(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    return () => reset();
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col flex-grow h-[100dvh]",
        "px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9 overflow-hidden"
      )}
    >
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
                setSelectedCourse(course);
                processCourseSelection({
                  option: 1,
                  courseId: course?.courseId,
                  navigate: navigate,
                });
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
        hideSecondary={hideSecondary}
        onSecondaryHide={() => {
          setHideSecondary(true);
          setSelectedCourse(null);
        }}
        secondaryInitialHeight={0.6}
      />

      {toastData && toastData?.title ? (
        <Toast
          title={toastData?.title}
          description={toastData?.description ?? ""}
          type={toastData?.type ?? ToastType.WARNING}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SelectYourCoursePage;
