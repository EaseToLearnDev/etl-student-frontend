// React
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

// Utils
import cn from "../../../utils/classNames";

// Services
import { loadNotificationList } from "../../../global/services/loadNotificationList";

// Components
import HamburgerButton from "./HamburgerButton";
import Sidebar from "./Sidebar";
import HeaderMenuRight from "./HeaderMenuRight";
import StickyHeader from "./StickyHeader";
import FeedbackModal from "./FeedbackModal";
import { StudentRatingCourseModal } from "./StudentRatingCourseModal";
import InviteTeacherModal from "./InviteTeacherModal";
import CourseMenu from "./CourseMenu";
import { loadStudentSelectedCourses } from "../../../global/services/loadStudentSelectedCourses";

export default function Header({ className }: { className?: string }) {
  const location = useLocation();

  const [isCourseSelectionOpen, setIsCourseSelectionOpen] = useState(false);

  useEffect(() => {
    loadNotificationList();
    loadStudentSelectedCourses();
  }, [location.pathname]);

  return (
    <StickyHeader
      className={cn("z-[990] 2xl:py-5", className)}
    >
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full border-none" />}
        />
        <CourseMenu
          isOpen={isCourseSelectionOpen}
          onToggle={() => setIsCourseSelectionOpen((prev) => !prev)}
        />
      </div>

      <HeaderMenuRight />
      <InviteTeacherModal />
      <FeedbackModal />
      <StudentRatingCourseModal />
    </StickyHeader>
  );
}
