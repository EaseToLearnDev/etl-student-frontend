// Utils
import { Theme } from "../../../utils/colors";

// Components
import Badge from "../../../components/Badge";
import type { CourseType } from "../../shared/types";
import cn from "../../../utils/classNames";

interface CourseCardProps {
  course: CourseType;
  onClick: (course: CourseType) => void;
  status?: string;
  isActive?: boolean;
  className?: string;
}

/**
 * Displays a card for a course with image, title, subtitle, and an optional purchased badge.
 */
const CourseCard = ({
  course,
  onClick,
  status,
  isActive = false,
  className = ""
}: CourseCardProps) => {
  return (
    <div
      onClick={() => onClick?.(course)}
      className={cn(
        "bg-[var(--surface-bg-primary)] border rounded-xl overflow-hidden",
        "shadow-md transition hover:scale-105 transform cursor-pointer",
        isActive
          ? "border-[var(--sb-ocean-bg-active)]"
          : " border-[var(--border-secondary)]",
          className
      )}
    >
      <div className="h-40 overflow-hidden flex justify-center items-center">
        <img
          src={course.courseImageUrl ?? "/logo.svg"}
          alt={course.courseTitle}
          className={cn(
            "w-full object-contain p-2",
            course.courseImageUrl ? "h-40" : "h-20 opacity-30"
          )}
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-row items-center justify-between">
          <h6 className="text-[var(--text-primary)]">{course.courseTitle}</h6>
          {status ? (
            <Badge theme={Theme.GreenHaze} style="filled" className="px-2 py-1">
              <span>{status}</span>
            </Badge>
          ) : (
            <></>
          )}
        </div>
        <span className="text-[var(--text-tertiary)]">
          {course.courseSubTitle}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
