import { Link, useNavigate } from "react-router";

// Hooks
import { useStudentStore } from "../../../features/shared/hooks/useStudentStore";

// Services
import { handleSwitchCourse } from "../../../global/services/handleSwitchCourse";

// Components
import Select from "../../../components/Select";
import { MdCheck } from "react-icons/md";
import getValidityFormatted from "../../../global/services/getValidityFormatted";
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
  const openedCourse = useStudentStore((s) => s.studentData?.openedCourse);

  return (
    <div className="flex items-center gap-2">
      <Select
        items={courses || []}
        isOpen={isOpen}
        onSelect={(index) => handleSwitchCourse({ navigate, index })}
        onToggle={onToggle}
        selectedIndex={openedCourse ?? 0}
        type="Course"
        className="w-[200px]"
        dropdownClassName="w-[200px]"
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
      />
      {courses && (
        <Link
          to={`/selectcourse?cid=${courses[openedCourse ?? 0]?.courseId}`}
          className="relative group cursor-pointer"
        >
          <div className="absolute -inset-1 bg-[var(--sb-ocean-bg-active)]/80 rounded-lg blur-md opacity-80 transition duration-200 group-hover:opacity-100"></div>
          <div className="relative px-4 py-2 bg-[var(--sb-ocean-bg-active)] ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
            <p className="text-[var(--text-primary)]">Upgrade</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CourseMenu;
