import { MdClose } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import cn from "../../../utils/classNames";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
interface FirstTimeUserProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}
const FirstTimeUserModal = ({
  isOpen,
  onClose,
  className = "",
}: FirstTimeUserProps) => {
  const studentName = useStudentStore((s) => s.studentData?.studentName);
  const courseName = useStudentStore((s) => s.activeCourse?.organisationName);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      className={cn("p-4", className)}
    >
      <div className="relative w-full p-2 px-4">
        <h4 className="text-center">
          🎉 Welcome to your Dashboard, {studentName}!
        </h4>
        <p className="mt-2 text-center">
          Let's show you how to use this platform to boost your {courseName}{" "}
          rank.
        </p>
        <div className="aspect-video rounded-xl ring-0 mt-7">
          <iframe
            width="100%"
            height="100%"
            src={
              "https://www.youtube.com/embed/yIv08xYOGss?si=BC_EiLK1JzKBt7_K"
            }
            title={"Youtube Video Player"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl ring-0 outline-0"
          ></iframe>
        </div>
        {/* Close Button */}
        <div
          onClick={onClose}
          className={cn(
            "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
            " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full",
          )}
        >
          <MdClose size={20} />
        </div>
      </div>
    </Modal>
  );
};

export default FirstTimeUserModal;
