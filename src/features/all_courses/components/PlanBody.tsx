import { useEffect } from "react";
import { PlanCard } from "./PlanCard";
import Tabs from "../../../components/Tabs";
import { applyPromoCode } from "../services/VerifyPromoCode";
import type { FeaturesList, PriceList } from "../../shared/types";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import cn from "../../../utils/classNames";
import Button from "../../../components/Button";
import { BiCheck } from "react-icons/bi";
import WidgetCard from "../../report/components/newreports/WidgetCard";
import PlanFeature from "../../shared/components/PlanFeature";
import { MdClose } from "react-icons/md";
import { useCoursesStore } from "../hooks/useCoursesStore";
import { processCourseSelection } from "../services/processCourseSelection";
import { useNavigate } from "react-router";

// Constants
const deviceType = "web";

// utility to normalize order of plans
const orderPlans = (plans: PriceList[]) => {
  const planOrder = ["FREE", "PRO", "ACE"];
  return planOrder.map((type) => {
    const match = plans.find((p) => p.packType?.toUpperCase() === type);
    return match || { packType: type, list: [] };
  });
};

interface PlanBodyProps {
  features?: FeaturesList[];
  coursePlan: PriceList[];
  courseTitle: string;
  courseId: number;
}

export const PlanBody = ({
  features,
  coursePlan,
  courseTitle,
  courseId,
}: PlanBodyProps) => {
  const navigate = useNavigate();

  const selectedTabIndex = useCoursesStore((s) => s.selectedTabIndex);
  const setSelectedTabIndex = useCoursesStore((s) => s.setSelectedTabIndex);

  const code = useCoursesStore((s) => s.code);
  const setCode = useCoursesStore((s) => s.setCode);

  const applied = useCoursesStore((s) => s.applied);
  const setApplied = useCoursesStore((s) => s.setApplied);

  const selectedPlanId = useCoursesStore((s) => s.selectedPlanId);
  const setSelectedPlanId = useCoursesStore((s) => s.setSelectedPlanId);

  const selPriceList = useCoursesStore((s) => s.selPriceList);
  const setSelPriceList = useCoursesStore((s) => s.setSelPriceList);

  const error = useCoursesStore((s) => s.error);

  const studentData = useStudentStore((s) => s.studentData);

  if (!studentData) return null;

  const effectivePlan = orderPlans(
    selPriceList && selPriceList.length > 0 ? selPriceList : coursePlan
  );

  useEffect(() => {
    if (effectivePlan[selectedTabIndex]?.list?.length > 0) {
      setSelectedPlanId(effectivePlan[selectedTabIndex].list[0].packId);
    }
  }, [selectedTabIndex, effectivePlan, setSelectedPlanId]);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const promocode = code.trim();
    if (!applied && promocode) {
      applyPromoCode(promocode, courseId);
    }
  };

  return (
    <>
      <div className="relative w-full h-full max-h-[800px] overflow-y-auto lg:overflow-hidden">
        <div className="sticky top-0 left-0 bg-[var(--surface-bg-primary)] p-4">
          <h3 className="px-4 text-center">{courseTitle}</h3>
          <div className="px-4 mt-4">
            <Tabs
              tabs={["FREE", "PRO", "ACE"]}
              selectedIndex={selectedTabIndex}
              onSelect={setSelectedTabIndex}
              activeTabClassName="bg-blue-500 border-none text-white"
              containerClassName="flex justify-center items-center"
            />
          </div>
        </div>

        {/* Body Section Start*/}
        <div
          className={cn(
            "p-4 grid grid-cols-1 gap-4",
            selectedTabIndex !== 0 ? "lg:grid-cols-2" : ""
          )}
        >
          <div className="grid grid-cols-1 max-h-[350px] overflow-y-auto scrollbar-hide">
            {/* Plans Section */}
            {selectedTabIndex !== 0 ? (
              <WidgetCard className="shadow-none mt-4 lg:mt-0" title="Plans">
                <div className="flex flex-col gap-3 mt-4">
                  {effectivePlan?.[selectedTabIndex]?.list.map((plan, idx) => (
                    <PlanCard
                      key={idx}
                      plan={plan}
                      selected={selectedPlanId === plan.packId}
                      onSelect={() => setSelectedPlanId(plan.packId)}
                    />
                  ))}
                </div>
              </WidgetCard>
            ) : null}

            {/* Promo Code Section */}
            {selectedTabIndex !== 0 ? (
              <WidgetCard className="shadow-none mt-4" title="Apply Promo Code">
                <form className="mt-4" onSubmit={handlePromoSubmit}>
                  {applied && (
                    <p className="text-[var(--sb-green-haze-bg-active)] pb-1">
                      Promo applied successfully 🎉
                    </p>
                  )}
                  {error && (
                    <p className="text-[var(--sb-valencia-bg-active)] pb-1">
                      Invalid promo code
                    </p>
                  )}
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter Promo Code"
                      disabled={applied}
                      className={cn(
                        "w-full flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                        "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
                      )}
                    />
                    <Button style="secondary" type="submit" disabled={applied}>
                      {applied ? (
                        <p className="flex gap-1">
                          <BiCheck size={16} /> Applied
                        </p>
                      ) : (
                        <p>Apply</p>
                      )}
                    </Button>
                    {applied ? (
                      <Button
                        style="secondary"
                        type="button"
                        onClick={() => {
                          setApplied(false);
                          setCode("");
                          setSelPriceList([]);
                        }}
                      >
                        <p className="flex gap-1">
                          <MdClose size={16} /> Clear
                        </p>
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                </form>
              </WidgetCard>
            ) : null}
          </div>

          {/* Features Section */}
          <WidgetCard
            className="shadow-none flex flex-col lg:h-[400px] lg:overflow-y-auto scrollbar-hide mb-[50px] lg:mb-0"
            title="Features"
          >
            <div className=" flex flex-col gap-4">
              {features?.map((feat, idx) => (
                <PlanFeature
                  key={idx}
                  feature={feat}
                  packIdx={selectedTabIndex}
                />
              ))}
            </div>
          </WidgetCard>
        </div>
        {/* Body Section End */}

        {/* PayU form */}
        <form
          name="pgform"
          action="https://secure.payu.in/_payment"
          method="post"
          className="hidden"
        >
          <input type="hidden" name="key" />
          <input type="hidden" name="txnid" />
          <input type="hidden" name="amount" />
          <input type="hidden" name="productinfo" />
          <input type="hidden" name="firstname" />
          <input type="hidden" name="email" />
          <input type="hidden" name="phone" />
          <input type="hidden" name="surl" />
          <input type="hidden" name="furl" />
          <input type="hidden" name="hash" />
        </form>
      </div>
      {/* Actions */}
      <div
        className={cn(
          "sticky bottom-0 left-0 right-0 h-[80px] bg-[var(--surface-bg-primary)]",
          "w-full flex justify-center items-center lg:items-center gap-3"
        )}
      >
        {selectedTabIndex === 0 ? (
          <div className="w-full px-4 flex lg:justify-end">
            <Button
              style="primary"
              className="w-full lg:w-fit"
              onClick={() => {
                processCourseSelection({
                  option: 1,
                  courseId,
                  courseTitle,
                  selectedPlanId,
                  code,
                  navigate,
                });
              }}
            >
              Start Free Trial
            </Button>
          </div>
        ) : (
          <div className="w-full px-4 flex lg:justify-end">
            <Button
              style="primary"
              className="w-full lg:w-fit"
              onClick={() => {
                processCourseSelection({
                  option: deviceType === "web" ? 2 : 3,
                  courseId,
                  courseTitle,
                  selectedPlanId,
                  code,
                  navigate,
                });
              }}
            >
              Proceed To Pay
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
