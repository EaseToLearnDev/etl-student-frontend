// Types
import type { CategoryType, CourseType } from "../../shared/types";

// Utils
import cn from "../../../utils/classNames";

// Store
import { useStudentStore } from "../../shared/hooks/useStudentStore";

// Components
import CourseCard from "./CourseCard";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import EmptyState from "../../../components/EmptyState";
import { useCoursesStore } from "../hooks/useCoursesStore";
import { useEffect } from "react";

interface CoursesCardsProps {
  search: string;
  courseList: CourseType[];
  selectedCourse: CourseType | null;
  hideSecondary: boolean;
  selectedCategory: CategoryType | null;
  onCourseClick?: (course: CourseType) => void;
}

/**
 * Displays a list of course cards filtered by search and selected categories.
 */
const CoursesCards = ({
  search,
  courseList,
  selectedCourse,
  selectedCategory,
  onCourseClick,
}: CoursesCardsProps) => {
  const studentData = useStudentStore((s) => s.studentData);
  const setSearchData = useCoursesStore((s) => s.setSearchData);

  const filteredCourses = courseList.filter((course) => {
    const matchesCategory =
      !selectedCategory ||
      selectedCategory.categoryName === course.categoryName;

    return matchesCategory;
  });

  const filteredSearchCourses = courseList.filter((course) => {
    const matchesSearch =
      course?.courseTitle?.toLowerCase().includes(search?.toLowerCase()) ||
      course?.courseSubTitle?.toLowerCase().includes(search?.toLowerCase());
    return matchesSearch;
  });

  useEffect(() => {
    setSearchData?.(filteredSearchCourses);
  }, [filteredCourses]);

  if (filteredCourses.length === 0) {
    return (
      <EmptyState
        title="No courses found"
        icon={<ArchiveBoxIcon width={100} height={100} />}
      />
    );
  }
  return (
    <div
      className={cn("grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4")}
    >
      {filteredCourses.map((course) => {
        const existingCourse = studentData?.courses?.find(
          (c) => c.courseId === course.courseId
        );
        const status = existingCourse
          ? `Enrolled: ${existingCourse?.packTypeTitle}`
          : "";
        return (
          <CourseCard
            key={course?.courseId}
            course={course}
            onClick={() => onCourseClick?.(course)}
            status={status}
            isActive={selectedCourse?.courseId === course?.courseId}
          />
        );
      })}
    </div>
  );
};

export default CoursesCards;
