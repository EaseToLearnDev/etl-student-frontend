// React
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

// Icons
import { MdCheck } from "react-icons/md";

// Store
import { useStudentStore } from "../../../features/shared/hooks/useStudentStore";

// Utils
import cn from "../../../utils/classNames";

// Services
import { handleSwitchCourse } from "../../../global/services/handleSwitchCourse";
import getValidityFormatted from "../../../global/services/getValidityFormatted";
import { loadNotificationList } from "../../../global/services/loadNotificationList";

// Components
import HamburgerButton from "./HamburgerButton";
import Sidebar from "./Sidebar";
import HeaderMenuRight from "./HeaderMenuRight";
import StickyHeader from "./StickyHeader";
import Select from "../../../components/Select";
import FeedbackModal from "./FeedbackModal";
import { StudentRatingCourseModal } from "./StudentRatingCourseModal";
import InviteTeacherModal from "./InviteTeacherModal";

export default function Header({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  const courses = useStudentStore((s) => s.studentData?.courses);
  const openedCourse = useStudentStore((s) => s.studentData?.openedCourse);

  const [isCourseSelectionOpen, setIsCourseSelectionOpen] = useState(false);

  useEffect(() => {
    loadNotificationList();
  }, [location.pathname]);

  return (
    <StickyHeader
      className={cn("z-[990] 2xl:py-5 3xl:px-8 4xl:px-10", className)}
    >
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full border-none" />}
        />
        <Select
          items={courses || []}
          isOpen={isCourseSelectionOpen}
          onSelect={(index) => handleSwitchCourse({ navigate, index })}
          onToggle={() => setIsCourseSelectionOpen((prev) => !prev)}
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
      </div>

      <HeaderMenuRight />
      <InviteTeacherModal />
      <FeedbackModal />
      <StudentRatingCourseModal />
    </StickyHeader>
  );
}
