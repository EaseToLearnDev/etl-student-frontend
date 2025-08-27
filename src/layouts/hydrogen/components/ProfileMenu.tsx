// React
import { useState, type ReactElement, type RefObject } from "react";

// Icons
import { FaUser, FaUserPlus } from "react-icons/fa";
import { MdFeedback, MdPayments } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";

// Store
import { useStudentStore } from "../../../features/shared/hooks/useStudentStore";

// Hooks
import useIsMobile from "../../../hooks/useIsMobile";

// Utils
import logout from "../../../utils/logout";
import { Popover } from "../../../components/Popover/Popover";
import { PopoverTrigger } from "../../../components/Popover/PopoverTrigger";
import { PopoverContent } from "../../../components/Popover/PopoverContent";
import { RiUserSettingsFill } from "react-icons/ri";
import { Link } from "react-router";
import { useInviteTeacherStore } from "../../../global/hooks/useInviteTeacherStore";
import { useFeedbackStore } from "../../../global/hooks/useFeedbackStore";

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

  return (
    <Popover
      open={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement={isMobile ? "bottom" : "bottom-end"}
    >
      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverContent className="z-[9999] p-0 bg-[var(--surface-bg-secondary)] [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
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
    name: "Tutorials",
    href: "#",
    icon: <BiSolidVideos />,
  },
  {
    name: "Feedback",
    href: "#",
    icon: <MdFeedback />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <RiUserSettingsFill />,
  },
];
const DropdownMenu = () => {
  const studentName = useStudentStore((s) => s.studentData?.studentName);
  const emailId = useStudentStore((s) => s.studentData?.emailId);

  const setShowInviteTeacherModal = useInviteTeacherStore((s) => s.setShowInviteTeacherModal);
  const setShowFeedbackModal = useFeedbackStore((s) => s.setShowFeedbackModal);

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-[var(--border-primary)] px-6 pb-5 pt-6">
        <div className="w-8 h-8 p-5 aspect-square bg-[var(--surface-bg-tertiary)] rounded-full flex justify-center items-center">
          <p className="!font-bold">
            {studentName?.split(" ")?.map((w) => w[0] || "")}
          </p>
        </div>
        <div className="ms-3">
          <h6 className="font-semibold --text-[var(--text-primary)]">
            {studentName}
          </h6>
          <p
            className="text-[var(--text-secondary)] w-40 overflow-hidden text-ellipsis whitespace-nowrap"
            title={emailId}
          >
            {emailId}
          </p>
        </div>
      </div>

      <div className="grid px-3.5 py-3.5 font-medium text-[var(--text-primary)] text-base">
        {menuItems.map((item) =>
          item.name === "Invite Teacher" ? (
            <button
              key={item.name}
              onClick={() => setShowInviteTeacherModal(true)}
              className="group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
            >
              <span className="text-[var(--text-secondary)]">{item.icon}</span>
              {item.name}
            </button>
          ) : item.name === "Feedback" ? (
            <button
              key={item.name}
              onClick={() => setShowFeedbackModal(true)}
              className="group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
            >
              <span className="text-[var(--text-secondary)]">{item.icon}</span>
              {item.name}
            </button>
          )  : (
            <Link
              key={item.name}
              to={item.href}
              className="group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
            >
              <span className="text-[var(--text-secondary)]">{item.icon}</span>
              {item.name}
            </Link>
          )
        )}
      </div>

      <div className="border-t border-[var(--border-primary)] px-6 pb-6 pt-5">
        <button
          onClick={logout}
          className="h-auto w-full flex gap-2 text-base text-start justify-start p-0 font-medium text-[var(--text-primary)] outline-none focus-visible:ring-0"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
