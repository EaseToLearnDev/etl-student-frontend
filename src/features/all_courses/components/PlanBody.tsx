import { useEffect, useState } from "react";
import { PlanCard } from "./PlanCard";
import { PlanSubmit } from "./PlanSubmit";
import Tabs from "../../../components/Tabs";

interface PlanBodyProps {
  coursePlan: string[];
  title: string;
}

export const PlanBody = ({ coursePlan, title }: PlanBodyProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  useEffect(() => {
    if (coursePlan[selectedTabIndex]?.list?.length > 0) {
      setSelectedPlanId(coursePlan[selectedTabIndex].list[0].packId);
    }
  }, [selectedTabIndex, coursePlan]);

  // Mock submit handler
  const submit = (promoCode: any) => {
    console.log("Proceeding to pay with promo code:", promoCode || "None");
    alert(`Payment started with promo code: ${promoCode || "None"}`);
  };

  // Mock promo validation handler
  const promo = (promoCode: any) => {
    if (promoCode === "DISCOUNT50") {
      setApplied(true);
      alert("Promo code applied successfully: 50% OFF!");
    } else {
      setApplied(false);
      alert("Invalid promo code!");
    }
  };
  return (
    <div className="h-full sticky top-0 right-0 overflow-y-visible">
      <div className="flex items-center justify-start flex-col w-full py-[10px] max-h-max">
        <h3 className="mb-3">{title} Subscriptions</h3>
        <div className="w-[150px] border border-gray-400 rounded-full bg-gray-100 flex items-center justify-evenly mx-auto mb-6">
          <Tabs
            tabs={coursePlan.map((plan) => plan.packType)}
            selectedIndex={selectedTabIndex}
            onSelect={setSelectedTabIndex}
          />
        </div>

        <div className="w-full max-h-[320px] overflow-y-scroll">
          {coursePlan[selectedTabIndex]?.list.map((plan, idx) => (
            <PlanCard
              key={idx}
              plan={plan}
              selected={selectedPlanId === plan.packId}
              onSelect={() => setSelectedPlanId(plan.packId)}
            />
          ))}
        </div>

        <PlanSubmit
          submit={submit}
          promo={promo}
          code={code}
          setCode={setCode}
          applied={applied}
          setApplied={setApplied}
        />
      </div>
    </div>
  );
};
