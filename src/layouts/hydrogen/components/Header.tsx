// React
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

// Icons
import { MdCheck, MdClose } from "react-icons/md";

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
import { Modal } from "../../../components/Modal";
import { useInviteTeacherStore } from "../../../global/hooks/useInviteTeacherStore";
import Button from "../../../components/Button";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { handleStudentInvite } from "../../../global/services/handleStudentInvite";
import FeedbackModal from "./FeedbackModal";

export default function Header({ className }: { className?: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  const courses = useStudentStore((s) => s.studentData?.courses);
  const openedCourse = useStudentStore((s) => s.studentData?.openedCourse);
  const teacherLoginId = useInviteTeacherStore((s) => s.teacherLoginId);
  const setTeacherLoginId = useInviteTeacherStore((s) => s.setTeacherLoginId);
  const showInviteTeacherModal = useInviteTeacherStore(
    (s) => s.showInviteTeacherModal
  );
  const setShowInviteTeacherModal = useInviteTeacherStore(
    (s) => s.setShowInviteTeacherModal
  );

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
      <Modal
        isOpen={showInviteTeacherModal}
        onClose={() => setShowInviteTeacherModal(false)}
        size="md"
        className="p-4"
      >
        <div className="relative p-2 px-4">
          <h5>Invite Teacher</h5>
          <div className="mt-4 flex flex-col gap-2">
            <label className="!font-medium text-[var(--text-secondary)]">
              Teacher User-ID / Email / Mobile
            </label>
            <input
              value={teacherLoginId}
              onChange={(e) => setTeacherLoginId(e.target.value)}
              className={cn(
                "w-full flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
              )}
              placeholder="example@domain.com"
            />
          </div>
          <div className="flex justify-end mt-4">
            <div className="flex gap-4 items-center">
              <Button
                style="primary"
                onClick={() => handleStudentInvite({ teacherLoginId })}
              >
                <PiPaperPlaneTiltFill size={16} />
                Invite
              </Button>
              <Button
                style="secondary"
                onClick={() => setShowInviteTeacherModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <div
          onClick={() => setShowInviteTeacherModal(false)}
          className={cn(
            "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
            " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
          )}
        >
          <MdClose size={20} />
        </div>
      </Modal>
      <FeedbackModal />
    </StickyHeader>
  );
}
