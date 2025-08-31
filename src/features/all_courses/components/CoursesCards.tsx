// Types
import type { CategoryType, CourseType } from "../../shared/types";

// Utils
import cn from "../../../utils/classNames";

// Store
import { useStudentStore } from "../../shared/hooks/useStudentStore";

// Components
import CourseCard from "./CourseCard";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";

interface CoursesCardsProps {
  search: string;
  courseList: CourseType[];
  selectedCourse: CourseType | null;
  hideSecondary: boolean;
  selectedCategories: CategoryType[];
  onCourseClick?: (course: CourseType) => void;
}

/**
 * Displays a list of course cards filtered by search and selected categories.
 */
const CoursesCards = ({
  search,
  courseList,
  selectedCourse,
  selectedCategories,
  onCourseClick,
}: CoursesCardsProps) => {
  const { studentData } = useStudentStore.getState();
  const filteredCourses = courseList.filter((course) => {
    const matchesSearch =
      course.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
      course.courseSubTitle.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        (cat) => cat.categoryName === course.categoryName
      );
    return matchesSearch && matchesCategory;
  });

  if (filteredCourses.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-tertiary)]">
        <ArchiveBoxIcon width={100} height={100} />
        <h5 className="text-lg font-medium">No courses found</h5>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4")}>
      {filteredCourses.map((course) => {
        const existingCourse = studentData?.courses?.find((c) => c.courseId === course.courseId);
        const status = existingCourse ? `Enrolled: ${existingCourse?.packTypeTitle}` : '';
        return (
        <CourseCard
          key={course?.courseId}
          course={course}
          onClick={() => onCourseClick?.(course)}
          status={status}
          isActive={selectedCourse?.courseId === course?.courseId}
        />
      )}
      )}
    </div>
  );
};

export default CoursesCards;
