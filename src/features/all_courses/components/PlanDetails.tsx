import { MdClose } from "react-icons/md";
import cn from "../../../utils/classNames";
import type { CourseType } from "../../shared/types";
import { PlanBody } from "./PlanBody";

interface PlanDetailsProps {
  course: CourseType;
  deviceType: string | undefined;
  onClose: () => void;
}
export const PlanDetails = ({ deviceType, course, onClose }: PlanDetailsProps) => {
  const features = course?.featuresList;
  return (
    <div className="relative">
      <PlanBody
        deviceType={deviceType}
        features={features}
        coursePlan={course?.twoPriceList}
        courseTitle={course?.courseTitle}
        courseId={course?.courseId}
      />
      <div
        onClick={() => onClose()}
        className={cn(
          "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
          " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
        )}
      >
        <MdClose size={20} />
      </div>
    </div>
  );
};
