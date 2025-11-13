import Button from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { useNavigate } from "react-router";
import cn from "../../../utils/classNames";
import { MdClose } from "react-icons/md";
import InputField from "../../../components/InputField";
import { useCoursesStore } from "../hooks/useCoursesStore";
import { useState } from "react";
import { processCourseSelection } from "../services/processCourseSelection";

interface UpdateEmailModalProps {
  deviceType: string | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateEmailModal = ({
  deviceType,
  isOpen,
  onClose,
}: UpdateEmailModalProps) => {
  const navigate = useNavigate();
  const selectedCourse = useCoursesStore((s) => s.selectedCourse);
  const selectedPlanId = useCoursesStore((s) => s.selectedPlanId);
  const payableAmount = useCoursesStore((s) => s.payableAmount);
  const code = useCoursesStore((s) => s.code);

  const [emailTemp, setEmailTemp] = useState<string>("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" className="p-4">
      <div className="relative w-full p-2 px-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h5 className="!font-bold">Update Email</h5>
          <div
            onClick={onClose}
            className={cn(
              "w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
              " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
            )}
          >
            <MdClose size={20} />
          </div>
        </div>
        <h6 className="mt-4 text-[var(--text-secondary)] !font-regular">
          To continue with your course purchase, please update your email
          address in your profile.
        </h6>

        {/* Input Fields */}
        <div className="mt-4">
          <InputField
            type="email"
            value={emailTemp}
            onChange={(e) => setEmailTemp(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end mt-4">
          <div className="flex gap-4 items-center">
            <Button
              disabled={
                !emailTemp ||
                !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                  emailTemp
                )
              }
              onClick={() => {
                processCourseSelection({
                  option: deviceType === "ios" ? 2 : 3,
                  courseId: selectedCourse?.courseId,
                  courseTitle: selectedCourse?.courseTitle,
                  selectedPlanId,
                  code,
                  navigate,
                  payableAmount,
                  email: emailTemp,
                });
                onClose();
              }}
            >
              Submit
            </Button>
            <Button style="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateEmailModal;
