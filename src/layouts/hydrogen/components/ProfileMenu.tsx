// React
import { useState, type ReactElement, type RefObject } from "react";

// Icons
import { FaUser, FaUserPlus } from "react-icons/fa";
import { MdFeedback, MdPayments } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";

// Store
import { useStudentStore } from "../../../features/store/useStudentStore";

// Hooks
import useIsMobile from "../../../hooks/useIsMobile";

// Utils
import logout from "../../../utils/logout";
import { Popover } from "../../../components/Popover/Popover";
import { PopoverTrigger } from "../../../components/Popover/PopoverTrigger";
import { PopoverContent } from "../../../components/Popover/PopoverContent";

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
    href: "#",
    icon: <FaUser />,
  },
  {
    name: "Payments",
    href: "#",
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
];

function DropdownMenu() {
  const studentName = useStudentStore(
    (state) => state.studentData?.studentName
  );
  const emailId = useStudentStore((state) => state.studentData?.emailId);

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
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-tertiary)] focus:outline-none"
          >
            <span className="text-[var(--text-secondary)]">{item.icon}</span>
            {item.name}
          </a>
        ))}
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
}
