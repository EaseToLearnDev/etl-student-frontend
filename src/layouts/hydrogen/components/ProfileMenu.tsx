// React
import { useEffect, useState, type ReactElement, type RefObject } from "react";
import { Link } from "react-router";

// Icons
import { FaUser, FaUserPlus } from "react-icons/fa";
import { MdFeedback, MdLogout, MdPayments, MdStar } from "react-icons/md";

// Hooks
import { useStudentStore } from "../../../features/shared/hooks/useStudentStore";
import useIsMobile from "../../../hooks/useIsMobile";
import { useInviteTeacherStore } from "../../../global/hooks/useInviteTeacherStore";
import { useFeedbackStore } from "../../../global/hooks/useFeedbackStore";
import { useRatingCourseStore } from "../../../global/hooks/useRatingCourseStore";

// Components
import { Popover } from "../../../components/Popover/Popover";
import { PopoverTrigger } from "../../../components/Popover/PopoverTrigger";
import { PopoverContent } from "../../../components/Popover/PopoverContent";
import ThemeToggle from "../../../components/ThemeToggle";

export default function ProfileMenuDropDown({
  children,
}: {
  children: ReactElement & { ref?: RefObject<any> };
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <Popover
      open={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement={isMobile ? "bottom" : "bottom-end"}
    >
      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverContent className="z-[9999] p-0 bg-[var(--surface-bg-secondary)] [&>svg]:dark:fill-gray-100">
        <DropdownMenu onClose={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}

const menuItems = [
  {
    name: "My Profile",
    href: "profile",
    icon: <FaUser />,
  },
  {
    name: "Payments",
    href: "payments",
    icon: <MdPayments />,
  },
  {
    name: "Invite Teacher",
    href: "#",
    icon: <FaUserPlus />,
  },
  {
    name: "Feedback",
    href: "#",
    icon: <MdFeedback />,
  },
  {
    name: "Rate a Course",
    href: "#",
    icon: <MdStar />,
  },
  {
    name: "Settings",
    href: "#",
  },
];
const DropdownMenu = ({ onClose }: { onClose: () => void }) => {
  const studentName = useStudentStore((s) => s.studentData?.studentName);
  const emailId = useStudentStore((s) => s.studentData?.emailId);

  const setShowInviteTeacherModal = useInviteTeacherStore(
    (s) => s.setShowInviteTeacherModal
  );
  const setShowFeedbackModal = useFeedbackStore((s) => s.setShowFeedbackModal);
  const setShowStudentRatingModal = useRatingCourseStore(
    (s) => s.setShowStudentRatingModal
  );

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-[var(--border-primary)] px-6 pb-5 pt-6">
        <div className="ms-3">
          <h6 className="font-semibold --text-[var(--text-primary)]">
            {studentName}
          </h6>
          <p className="text-[var(--text-secondary)] w-50 overflow-hidden text-ellipsis whitespace-nowrap">
            {emailId}
          </p>
        </div>
      </div>

      <div className="grid px-3.5 py-3.5 font-medium text-[var(--text-primary)] text-base">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.name === "Invite Teacher" ? (
              <button
                onClick={() => {
                  setShowInviteTeacherModal(true);
                  onClose();
                }}
                className="group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
              >
                <span className="text-[var(--text-secondary)]">
                  {item.icon}
                </span>
                {item.name}
              </button>
            ) : item.name === "Feedback" ? (
              <button
                onClick={() => {
                  setShowFeedbackModal(true);
                  onClose();
                }}
                className="group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
              >
                <span className="text-[var(--text-secondary)]">
                  {item.icon}
                </span>
                {item.name}
              </button>
            ) : item.name === "Rate a Course" ? (
              <button
                onClick={() => {
                  setShowStudentRatingModal(true);
                  onClose();
                }}
                className="group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
              >
                <span className="text-[var(--text-secondary)]">
                  {item.icon}
                </span>
                {item.name}
              </button>
            ) : item.name === "Settings" ? (
              <ThemeToggle />
            ) : (
              <Link
                to={item.href}
                className="group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
              >
                <span className="text-[var(--text-secondary)]">
                  {item.icon}
                </span>
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="px-2 py-4 border-t-1 border-t-[var(--border-primary)]">
        <Link
          to={"/logout"}
          className="font-medium w-full flex items-center gap-2 px-4 rounded-lg outline-none border-none"
        >
          <MdLogout size={14} />
          <p>Log Out</p>
        </Link>
      </div>
    </div>
  );
};
