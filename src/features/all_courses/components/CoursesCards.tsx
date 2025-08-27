import { Link } from "react-router-dom";
import { FaDizzy } from "react-icons/fa";
import { useStudentStore } from "../../shared/store/useStudentStore";
import Badge from "../../../components/Badge";
import { Theme } from "../../../utils/colors";

interface Course {
  courseId: number;
  courseTitle: string;
  courseSubTitle: string;
  categoryName: string;
  image: string;
  featuresList: string[];
}

interface CoursesCardsProps {
  search: string;
  courseList: Course[];
  hideSecondary: boolean;
  selectedCategories: string[];
  onCourseClick?: (course: Course) => void;
}

const CoursesCards = ({
  search,
  courseList,
  hideSecondary,
  selectedCategories,
  onCourseClick,
}: CoursesCardsProps) => {
  const { studentData } = useStudentStore.getState();
  const filteredCourses = courseList.filter(
    (course): course is Course =>
      (course.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
        course.courseSubTitle.toLowerCase().includes(search.toLowerCase())) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(course.categoryName))
  );

  if (filteredCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <FaDizzy size={60} className="mb-3 text-gray-400" />
        <p className="text-lg font-medium">No courses found</p>
      </div>
    );
  }

  return (
    <div
      id="courses-container"
      className={`grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
        hideSecondary ? "lg:grid-cols-4" : "lg:grid-cols-3"
      }`}
    >
      {filteredCourses.map((course) => {
        const alreadyPurchased = studentData?.courses?.some(
          (c) => c.courseId === course.courseId
        );
        const cardContent = (
          <>
            <img
              src={
                course.image ??
                "https://images.hdqwalls.com/wallpapers/bthumb/bmw-m4-gt3-evo-j2.jpg"
              }
              alt={course.courseTitle}
              className="h-40 w-full object-cover"
            />
            <div className="flex flex-col gap-2 p-4">
              <div className="flex flex-row items-center justify-between">
                <h5 className="text-[var(--text-primary)]">
                  {course.courseTitle}
                </h5>
                {alreadyPurchased && (
                  <Badge
                    theme={Theme.GreenHaze}
                    style="filled"
                    className="px-2 py-1"
                  >
                    <span>Purchased</span>
                  </Badge>
                )}
              </div>
              <span className="text-[var(--text-tertiary)]">
                {course.courseSubTitle}
              </span>
            </div>
          </>
        );
        
        return onCourseClick ? (
          <div
            key={course.courseId}
            onClick={() => onCourseClick(course)}
            className="bg-[var(--surface-bg-primary)] border-1 border-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition hover:scale-105 transform cursor-pointer"
          >
            {cardContent}
          </div>
        ) : (
          <Link
            key={course.courseId}
            to={`/course/${course.courseId}`}
            className="bg-[var(--surface-bg-primary)] border-1 border-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition hover:scale-105 transform"
          >
            {cardContent}
          </Link>
        );
      })}
    </div>
  );
};

export default CoursesCards;
