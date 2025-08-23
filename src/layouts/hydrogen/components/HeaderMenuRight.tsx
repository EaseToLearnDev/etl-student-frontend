// Components
import RingBellSolidIcon from "../../../components/icons/ring-bell-solid-icon";
import NotificationDropdown from "./notification-dropdown";
import ProfileMenuDropDown from "./ProfileMenu";
import cn from "../../../utils/classNames";
import { useStudentStore } from "../../../features/shared/hooks/useStudentStore";

const HeaderMenuRight = () => {
  const studentName = useStudentStore(
    (state) => state.studentData?.studentName
  );
  return (
    <div className="relative ms-auto flex items-center gap-2 text-[var(--text-primary)] xs:gap-3 xl:gap-4 justify-end">
      <NotificationDropdown>
        <button
          aria-label="Notification"
          className={cn(
            "flex justify-center items-center relative h-[34px] w-[34px] backdrop-blur-md bg-[var(--surface-bg-secondary)] shadow-sm sm:w-10 md:h-9 md:w-9",
            "focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px rounded-md outline-none"
          )}
        >
          <RingBellSolidIcon className="h-[18px] w-auto" />
        </button>
      </NotificationDropdown>
      <ProfileMenuDropDown>
        <button
          className={
            "w-9 shrink-0 overflow-hidden rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10"
          }
        >
          <div className="w-8 h-8 p-5 aspect-square bg-[var(--surface-bg-secondary)] rounded-full flex justify-center items-center">
            <p className="!font-bold"> {studentName?.split(" ")?.map((w) => w[0] || "")}</p>
          </div>
        </button>
      </ProfileMenuDropDown>
    </div>
  );
};

export default HeaderMenuRight;
