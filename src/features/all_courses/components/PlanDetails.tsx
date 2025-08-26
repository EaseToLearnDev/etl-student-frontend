import { PlanBody } from "./PlanBody";
import { PlanFeatures } from "./PlanFeatures";

interface PlanDetailsProps {
  course: {
    courseId: number;
    courseTitle: string;
    courseSubTitle: string;
    categoryName: string;
    image: string;
    featuresList?: string[];
    twoPriceList: string[];
  };
}


export const PlanDetails = ({ course }: PlanDetailsProps) => {
  return (
    <div className="flex gap-4">
      <div className="max-h-[500px] w-1/2 overflow-y-scroll">
        <PlanFeatures features={course.featuresList ?? []} />
      </div>
      <div className="w-1/2">
        <PlanBody coursePlan={course.twoPriceList} courseTitle={course.courseTitle} courseId={course.courseId} />
      </div>
    </div>
  );
};
