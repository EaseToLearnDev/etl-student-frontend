import { MdClose } from "react-icons/md";
import { Modal } from "../../../components/Modal";
import { useRatingCourseStore } from "../../../global/hooks/useRatingCourseStore";
import cn from "../../../utils/classNames";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import Button from "../../../components/Button";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { submitCourseRating } from "../../../global/services/submitCourseRating";

export const StudentRatingCourseModal = () => {
  const rating = useRatingCourseStore((s) => s.rating);
  const remarks = useRatingCourseStore((s) => s.remarks);
  const showStudentRatingModal = useRatingCourseStore(
    (s) => s.showStudentRatingModal
  );
  const setShowStudentRatingModal = useRatingCourseStore(
    (s) => s.setShowStudentRatingModal
  );
  const setRating = useRatingCourseStore((s) => s.setRating);
  const setRemarks = useRatingCourseStore((s) => s.setRemarks);
  const reset = useRatingCourseStore((s) => s.reset);

  const [hover, setHover] = useState<number | null>(null);

  return (
    <Modal
      isOpen={showStudentRatingModal}
      onClose={() => setShowStudentRatingModal(false)}
      size="md"
      className="p-4"
    >
      <div>
        <h5 className="mb-4">Rate this Course</h5>

        {/* Star Rating */}
        <div className="flex items-center gap-2 mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={25}
              className={cn(
                "cursor-pointer transition-colors duration-200",
                (hover ?? rating) >= star
                  ? "text-[var(--sb-sunglow-bg-active)]"
                  : "text-gray-300"
              )}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
          <span className="ml-2 text-sm text-[var(--text-secondary)]">
            {rating ? `${rating}/5` : "No rating"}
          </span>
        </div>

        {/* Remarks Input */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="!font-medium text-[var(--text-secondary)]"
          >
            Description
          </label>
          <input
            name="description"
            placeholder="Describe your experience"
            className={cn(
              "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-primary)] text-base",
              "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
            )}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-7">
          <div className="flex gap-4 items-center">
            <Button
              disabled={!rating || !remarks.trim()}
              onClick={() => {
                submitCourseRating();
                reset();
                setShowStudentRatingModal(false);
              }}
            >
              <PiPaperPlaneTiltFill size={16} /> Send
            </Button>
            <Button
              style="secondary"
              onClick={() => setShowStudentRatingModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>

        {/* Close Button */}
        <div
          onClick={() => setShowStudentRatingModal(false)}
          className={cn(
            "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
            "text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
          )}
        >
          <MdClose size={20} />
        </div>
      </div>
    </Modal>
  );
};
