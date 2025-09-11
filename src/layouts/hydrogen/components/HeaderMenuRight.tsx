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
  const profilePic = useStudentStore((state) => state.studentData?.profilePic);
  return (
    <div className="relative ml-2 md:ms-auto flex items-center gap-2 text-[var(--text-primary)] xs:gap-3 xl:gap-4 justify-end">
      <NotificationDropdown>
        <button
          aria-label="Notification"
          className={cn(
            "flex justify-center items-center relative h-9 w-9 backdrop-blur-md bg-[var(--surface-bg-secondary)] shadow-sm",
            "focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px rounded-md outline-none"
          )}
        >
          <RingBellSolidIcon className="h-[18px] w-auto" />
        </button>
      </NotificationDropdown>
      <ProfileMenuDropDown>
        <button
          className={cn(
            "overflow-hidden rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px",
            profilePic ? "w-9 h-9" : "w-10 h-10"
          )}
        >
          <div className="w-full h-full aspect-square bg-[var(--surface-bg-secondary)] flex justify-center items-center overflow-hidden">
            {profilePic ? (
              <img
                width={32}
                height={32}
                src={profilePic}
                className="w-full h-full object-cover"
                style={{ imageRendering: "crisp-edges" }}
              />
            ) : (
              <p className="!font-bold">
                {studentName?.split(" ")?.map((w) => w[0] || "")}
              </p>
            )}
          </div>
        </button>
      </ProfileMenuDropDown>
    </div>
  );
};

export default HeaderMenuRight;
