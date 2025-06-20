// Rizz UI
import { ActionIcon } from "rizzui/action-icon";
import { Badge } from "rizzui/badge";
import { Avatar } from "rizzui/avatar";

// Components
import RingBellSolidIcon from "../../../components/icons/ring-bell-solid-icon";
import NotificationDropdown from "./notification-dropdown";
import ProfileMenuDropDown from "./profile-menu";

const HeaderMenuRight = () => {
  return (
    <div className="relative ms-auto flex items-center gap-2 text-[var(--text-primary)] xs:gap-3 xl:gap-4 justify-end">
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className="flex justify-center items-center relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-[var(--surface-bg-secondary)] md:h-9 md:w-9"
        >
          <RingBellSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </NotificationDropdown>
      <ProfileMenuDropDown>
        <button
          className={
            "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10"
          }
        >
          <Avatar
            src="/avatar.webp"
            name="John Doe"
            className="!h-9 w-9 sm:!h-10 sm:!w-10"
          />
        </button>
      </ProfileMenuDropDown>
    </div>
  );
};

export default HeaderMenuRight;
