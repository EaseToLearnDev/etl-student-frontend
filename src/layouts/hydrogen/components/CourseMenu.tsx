import { Link, useNavigate } from "react-router";

// Hooks
import { useStudentStore } from "../../../features/shared/hooks/useStudentStore";

// Services
import { handleSwitchCourse } from "../../../global/services/handleSwitchCourse";

// Components
import Select from "../../../components/Select";
import { MdCheck } from "react-icons/md";
import getValidityFormatted from "../../../global/services/getValidityFormatted";
import { getActiveCourseAccessStatus } from "../../../global/services/upgrade";
import { PiBookFill, PiBooksFill } from "react-icons/pi";
import Button from "../../../components/Button";

interface CourseMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

/**
 * Dropdown menu component for selecting and switching student courses.
 */
const CourseMenu = ({ isOpen, onToggle }: CourseMenuProps) => {
  const navigate = useNavigate();

  const courses = useStudentStore((s) => s.studentData?.courses);
  const deviceType = useStudentStore((s) => s.studentData?.deviceType);
  const openedCourse = useStudentStore((s) => s.studentData?.openedCourse);

  const course = courses?.[openedCourse ?? 0];
  const status = course ? getActiveCourseAccessStatus() : "accessible";

  return (
    <div className="flex items-center gap-2">
      <Select
        items={courses || []}
        isOpen={isOpen}
        onSelect={(index) => handleSwitchCourse({ navigate, index })}
        onToggle={onToggle}
        selectedIndex={openedCourse ?? 0}
        type="Course"
        className="w-[140px] sm:w-[200px]"
        dropdownClassName="w-[140px] sm:w-[200px]"
        getItemLabel={(item) => item.organisationName}
        renderItem={(item, _, isSelected) => (
          <div className="w-full flex items-center gap-2 justify-between">
            <div className="flex flex-col">
              <span className="!font-semibold">{item.organisationName}</span>
              <span>
                {getValidityFormatted(
                  item.validTillDate,
                  item.packTypeTitle,
                  item.organisationName
                )}
              </span>
            </div>
            <div>
              {isSelected ? (
                <MdCheck size={14} className="text-[var(--text-tertiary)]" />
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
        renderAtEnd={
          <div className="w-full mt-1">
            <Link
              to={"/selectcourse"}
              className="w-full !py-2 flex justify-center items-center gap-2 border border-[var(--border-secondary)] rounded-lg"
              onClick={() => {
                navigate("/selectcourse");
                onToggle();
              }}
            >
              <PiBooksFill size={16} className="text-[var(--text-secondary)]" />
              <p className="font-semibold text-[var(--text-secondary)]">Other Exams</p>
            </Link>
          </div>
        }
      />
      {deviceType !== "ios" && course && status !== "accessible" && (
        <Link
          to={`/selectcourse?cid=${course?.courseId}`}
          className="relative group cursor-pointer"
        >
          <div className="absolute inset-0.5 gradient blur-sm rounded-lg opacity-80 transition duration-200 group-hover:opacity-100"></div>
          <div className="relative px-4 py-2 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
            <p className="text-black">
              {status === "renew" ? "Renew" : "Upgrade"}
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CourseMenu;
