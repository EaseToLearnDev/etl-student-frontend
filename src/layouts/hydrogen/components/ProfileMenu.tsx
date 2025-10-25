// React
import { useEffect, useState, type ReactElement, type RefObject } from "react";
import { Link, useLocation } from "react-router";

// Icons
import { MdLogout } from "react-icons/md";

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
import {
  PiChatTextFill,
  PiStarFill,
  PiUserFill,
  PiUsersFill,
  PiVideoFill,
  PiWalletFill,
} from "react-icons/pi";
import { useTutorialStore } from "../../../features/tutorials/hooks/useTutorialStore";
import { pushToDataLayer } from "../../../utils/gtm";
import { gtmEvents } from "../../../utils/gtm-events";

export default function ProfileMenuDropDown({
  children,
}: {
  children: ReactElement & { ref?: RefObject<any> };
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.key]);

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
    icon: <PiUserFill size={14} />,
  },
  {
    name: "Payments",
    href: "payments",
    icon: <PiWalletFill size={16} />,
  },
  {
    name: "Invite Teacher",
    href: "#",
    icon: <PiUsersFill size={16} />,
  },
  {
    name: "Feedback",
    href: "#",
    icon: <PiChatTextFill size={16} />,
  },
  {
    name: "Rate This Course",
    href: "#",
    icon: <PiStarFill size={16} />,
  },
  {
    name: "Tutorials",
    href: "#",
    icon: <PiVideoFill size={16} />,
  },
  {
    name: "Settings",
    href: "#",
  },
];
const DropdownMenu = ({ onClose }: { onClose: () => void }) => {
  const studentName = useStudentStore((s) => s.studentData?.studentName);
  const emailId = useStudentStore((s) => s.studentData?.emailId);
  const setShowTutorialModal = useTutorialStore((s) => s.setShowTutorialModal);

  const setShowInviteTeacherModal = useInviteTeacherStore(
    (s) => s.setShowInviteTeacherModal
  );
  const setShowFeedbackModal = useFeedbackStore((s) => s.setShowFeedbackModal);
  const setShowStudentRatingModal = useRatingCourseStore(
    (s) => s.setShowStudentRatingModal
  );

  const logout_button_id = "logout_button_id";

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
                className="w-full group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
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
                className="w-full group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
              >
                <span className="text-[var(--text-secondary)]">
                  {item.icon}
                </span>
                {item.name}
              </button>
            ) : item.name === "Rate This Course" ? (
              <button
                onClick={() => {
                  setShowStudentRatingModal(true);
                  onClose();
                }}
                className="w-full group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
              >
                <span className="text-[var(--text-secondary)]">
                  {item.icon}
                </span>
                {item.name}
              </button>
            ) : item.name === "Tutorials" ? (
              <button
                onClick={() => {
                  setShowTutorialModal(true);
                  onClose();
                }}
                className="w-full group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
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
          id={logout_button_id}
          to={"/logout"}
          className="font-medium w-full flex items-center gap-2 px-4 rounded-lg outline-none border-none"
          onClick={() => {
            pushToDataLayer({ event: gtmEvents.logout_button_click });
          }}
        >
          <MdLogout size={14} />
          <p>Log Out</p>
        </Link>
      </div>
    </div>
  );
};
