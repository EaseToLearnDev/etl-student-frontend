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
}

/**
 * Displays a card for a course with image, title, subtitle, and an optional purchased badge.
 */
const CourseCard = ({
  course,
  onClick,
  status,
  isActive = false,
}: CourseCardProps) => {
  return (
    <div
      onClick={() => onClick?.(course)}
      className={cn(
        "bg-[var(--surface-bg-primary)] border rounded-xl overflow-hidden",
        "shadow-md transition hover:scale-105 transform cursor-pointer",
        isActive ? "border-[var(--sb-ocean-bg-active)]" : " border-[var(--border-secondary)]"
      )}
    >
      <img
        src={
          course.courseImageUrl ??
          // "https://images.hdqwalls.com/wallpapers/bthumb/bmw-m4-gt3-evo-j2.jpg"
          "/logo.svg"
        }
        alt={course.courseTitle}
        className="h-40 w-full object-contain p-2"
      />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-row items-center justify-between">
          <h6 className="text-[var(--text-primary)]">{course.courseTitle}</h6>
          {status ? (
            <Badge theme={Theme.GreenHaze} style="filled" className="px-2 py-1">
              <span>{status}</span>
            </Badge>
          ) : <></>}
        </div>
        <span className="text-[var(--text-tertiary)]">
          {course.courseSubTitle}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
