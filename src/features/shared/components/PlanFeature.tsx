import { MdCheck, MdClose } from "react-icons/md";
import type { FeaturesList } from "../../shared/types";
import WidgetCard from "../../report/components/newreports/WidgetCard";

interface PlanFeatureProps {
  feature: FeaturesList;
  packIdx: number;
}

const PlanFeature = ({ feature, packIdx }: PlanFeatureProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h5 className="text-center">{feature?.sectionType}</h5>
      <div className="flex flex-col gap-4">
        {feature?.list?.map((feat, idx) => (
          <WidgetCard key={idx} className="shadow-none">
            <h6 className="text-center">{feat?.title}</h6>
            <p className="mt-1 text-[var(--text-secondary)]">
              {feat?.description}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {feat?.list?.map((subfeat, idx) => {
                const label = subfeat?.list[packIdx]?.optionLabel;
                const flag = subfeat?.list[packIdx]?.optionFlag;
                return (
                  <div
                    key={idx}
                    className="flex gap-3 justify-between items-center"
                  >
                    <p className="w-full">{subfeat?.title}</p>
                    {label ? (
                      <span className="text-end whitespace-pre-line">
                        {label}
                      </span>
                    ) : flag ? (
                      <div className="w-5 h-5 aspect-square rounded-full bg-[var(--sb-green-haze-bg-active)]/30 text-[var(--sb-green-haze-bg-active)] flex justify-center items-center">
                        <MdCheck size={14} />
                      </div>
                    ) : (
                      <div className="w-5 h-5 aspect-square rounded-full bg-[var(--sb-valencia-bg-active)]/30 text-[var(--sb-valencia-bg-active)] flex justify-center items-center">
                        <MdClose size={14} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </WidgetCard>
        ))}
      </div>
    </div>
  );
};

export default PlanFeature;
