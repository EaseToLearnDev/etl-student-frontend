import { MdCheck, MdClose } from "react-icons/md";
import type { FeatureType } from "../onboarding.types";

interface PlanFeatureProps {
  feature: FeatureType;
}

const PlanFeature = ({ feature }: PlanFeatureProps) => {
  return (
    <div className="w-full rounded-lg p-6 bg-[var(--surface-bg-secondary)]">
      <h5 className="text-center">{feature.title}</h5>
      <div className="flex flex-col gap-5 mt-5">
        {feature.subfeatures.map((subfeat, index) => (
          <div key={index} className="flex justify-between items-center">
            <h6>{subfeat.title}</h6>
            {subfeat.value === "check" ? (
              <div className="w-[20px] h-[20px] bg-[var(--sb-green-haze-bg-disabled)] rounded-full flex justify-center items-center">
                <MdCheck
                  size={16}
                  className="text-[var(--sb-green-haze-bg-active)]"
                />
              </div>
            ) : subfeat.value === "cross" ? (
              <div className="w-[20px] h-[20px] bg-[var(--sb-valencia-bg-disabled)] rounded-full flex justify-center items-center">
                <MdClose
                  size={16}
                  className="text-[var(--sb-valencia-bg-active)]"
                />
              </div>
            ) : (
              <h6>{subfeat.value}</h6>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanFeature;
