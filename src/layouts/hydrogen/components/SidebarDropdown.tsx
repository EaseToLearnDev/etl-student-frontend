// React
import { useState, type ReactElement, type RefObject } from "react";
import { Link } from "react-router";

// Icons
import { PiMoonFill, PiSignOutFill, PiSunFill } from "react-icons/pi";
import { RiUserSettingsFill } from "react-icons/ri";

// Store
import useDarkModeStore from "../../../store/useDarkModeStore";

// Utils
import cn from "../../../utils/classNames";
import logout from "../../../utils/logout";
import { Popover } from "../../../components/Popover/Popover";
import { PopoverTrigger } from "../../../components/Popover/PopoverTrigger";
import { PopoverContent } from "../../../components/Popover/PopoverContent";

const DropdownOptions = () => {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);
  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col gap-2">
        <Link
          to={"/settings"}
          className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--surface-bg-tertiary)] active:bg-[var(--surface-bg-tertiary)] rounded-md"
        >
          <RiUserSettingsFill size={16} /> <p>Account Settings</p>
        </Link>
        <div className="flex items-center justify-between px-4 py-2 rounded-md">
          <div className="flex items-center gap-2">
            {darkMode ? <PiMoonFill size={16} /> : <PiSunFill size={16} />}
            <p>Dark Mode</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={cn(
              "relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] focus:ring-offset-2",
              darkMode ? "bg-[var(--sb-ocean-bg-active)]" : "bg-gray-200"
            )}
          >
            <span
              className={cn(
                "inline-block h-3 w-3 rounded-full bg-white transition-transform",
                darkMode ? "translate-x-4" : "translate-x-0"
              )}
            ></span>
          </button>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--surface-bg-tertiary)] active:bg-[var(--surface-bg-tertiary)] rounded-md"
        >
          <PiSignOutFill size={16} />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

const SidebarDropdown = ({
  children,
}: {
  children: ReactElement & { ref?: RefObject<any> };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      open={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="top-end"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="z-[9999] bg-[var(--surface-bg-secondary)] border-1 border-[var(--border-primary)] p-4">
        <DropdownOptions />
      </PopoverContent>
    </Popover>
  );
};

export default SidebarDropdown;
