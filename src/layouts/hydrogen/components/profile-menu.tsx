// React
import { useState, type ReactElement, type RefObject } from "react";

// Rizz UI
import { Text, Avatar, Button, Popover } from "rizzui";

// Icons
import { FaUser, FaUserPlus } from "react-icons/fa";
import { MdFeedback, MdPayments } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";

// Hooks
import useIsMobile from "../../../hooks/useIsMobile";

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
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement={isMobile ? "bottom" : "bottom-end"}
    >
      <Popover.Trigger>{children}</Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 bg-[var(--surface-bg-secondary)] [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </Popover.Content>
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
  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-[var(--border-primary)] px-6 pb-5 pt-6">
        <Avatar src="/avatar.webp" name="Albert Flores" />
        <div className="ms-3">
          <h6 className="font-semibold --text-[var(--text-primary)]">
            Albert Flores
          </h6>
          <Text className="text-[var(--text-secondary)]">flores@doe.io</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-[var(--text-primary)] text-base">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center gap-2 rounded-md px-2.5 py-2 hover:bg-[var(--surface-bg-primary)] focus:outline-none"
          >
            <span className="text-[var(--text-secondary)]">{item.icon}</span>
            {item.name}
          </a>
        ))}
      </div>
      <div className="border-t border-[var(--border-primary)] px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full flex gap-2 text-base text-start justify-start p-0 font-medium text-[var(--text-primary)] outline-none focus-visible:ring-0"
          variant="text"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
