import type { FeaturesList, SelectedCourse } from "../../shared/types";
import { PlanBody } from "./PlanBody";
import { PlanFeatures } from "./PlanFeatures";


interface PlanDetailsProps {
  course: SelectedCourse;
}

export const PlanDetails = ({ course }: PlanDetailsProps) => {
  console.log(course);

  const features = course.featuresList as FeaturesList[] ?? []
  return (
    <div className="flex gap-4">
      <div className="max-h-[500px] w-1/2 overflow-y-scroll">
        <PlanFeatures features={features} />
      </div>
      <div className="w-1/2">
        <PlanBody
          coursePlan={course.twoPriceList}
          courseTitle={course.courseTitle}
          courseId={course.courseId}
        />
      </div>
    </div>
  );
};
