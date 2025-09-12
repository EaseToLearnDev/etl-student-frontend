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
import { getPriceValue } from "../utils/getPrice";
import { getSelectedPlan } from "../utils/getSelectedPlan";
import { resetPromocode } from "../services/resetPromocode";

// Constants
const deviceType = "web";

// utility to normalize order of plans
const orderPlans = (plans?: PriceList[]) => {
  const planOrder = ["FREE", "PRO", "ACE"];
  return planOrder.map((type) => {
    const match = plans?.find((p) => p?.packType?.toUpperCase() === type);
    return match || { packType: type, list: [] };
  });
};

interface PlanBodyProps {
  features?: FeaturesList[];
  coursePlan?: PriceList[];
  courseTitle?: string;
  courseId?: number;
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

  const selectedPlanId = useCoursesStore((s) => s.selectedPlanId);
  const setSelectedPlanId = useCoursesStore((s) => s.setSelectedPlanId);

  const selPriceList = useCoursesStore((s) => s.selPriceList);

  const payableAmount = useCoursesStore((s) => s.payableAmount);
  const setPayableAmount = useCoursesStore((s) => s.setPayableAmount);

  const error = useCoursesStore((s) => s.error);

  const studentData = useStudentStore((s) => s.studentData);

  if (!studentData) return null;

  const effectivePlan = orderPlans(
    selPriceList && selPriceList.length > 0 ? selPriceList : coursePlan
  );

  useEffect(() => {
    const selectedPlan = getSelectedPlan(effectivePlan, selectedTabIndex);
    if (selectedPlan && selectedPlan?.list?.length > 0) {
      const plan = selectedPlan.list[0];
      setSelectedPlanId(plan.packId);
      const price = getPriceValue(plan?.salePrice);
      setPayableAmount(price);
    }
  }, [selectedTabIndex]);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const promocode = code.trim();
    if (!applied && promocode) {
      applyPromoCode(promocode, courseId);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] lg:h-[calc(100dvh-2rem)] overflow-y-auto">
      <div className="w-full h-[150px] p-4">
        <h3 className="px-4 text-center">{courseTitle}</h3>
        <div className="px-4 mt-4">
          <Tabs
            tabs={["FREE", "PRO", "ACE"]}
            selectedIndex={selectedTabIndex}
            onSelect={setSelectedTabIndex}
            activeTabClassName="bg-blue-500 border-none text-white !font-semibold"
            containerClassName="flex justify-center items-center"
          />
        </div>
      </div>

      <div className="w-full h-[calc(100%-250px)] flex flex-col justify-center items-center">
        <div className="flex flex-col-reverse gap-4 max-w-[1400px] lg:flex-row lg:h-full overflow-y-auto py-4 lg:py-0">
          {/* Features Section */}
          <WidgetCard
            className={cn(
              "shadow-none flex flex-col scrollbar-hide",
              // mobile: full width, auto height
              "w-full h-auto",
              // desktop: flex-1 and scrollable
              "lg:max-h-full lg:overflow-y-auto lg:flex-1"
            )}
            title="Features"
          >
            <div className="flex flex-col gap-4">
              {features?.map((feat, idx) => (
                <PlanFeature
                  key={idx}
                  feature={feat}
                  packIdx={selectedTabIndex}
                />
              ))}
            </div>
          </WidgetCard>

          {/* Right Column (only if plans exist) */}
          {effectivePlan[selectedTabIndex]?.list?.length > 0 && (
            <div className="flex flex-col gap-4 w-full h-auto lg:flex-1 lg:h-full lg:overflow-y-auto scrollbar-hide">
              {selectedTabIndex !== 0 && (
                <WidgetCard
                  className="shadow-none h-auto lg:flex-1 lg:overflow-y-auto scrollbar-hide"
                  title="Plans"
                >
                  <div className="flex flex-col gap-3 mt-4">
                    {effectivePlan?.[selectedTabIndex]?.list.map(
                      (plan, idx) => (
                        <PlanCard
                          key={idx}
                          plan={plan}
                          selected={selectedPlanId === plan.packId}
                          onSelect={() => {
                            setSelectedPlanId(plan.packId);
                            const price = getPriceValue(plan?.salePrice);
                            setPayableAmount(price);
                          }}
                        />
                      )
                    )}
                  </div>
                </WidgetCard>
              )}

              {selectedTabIndex !== 0 && (
                <WidgetCard
                  className="shadow-none h-auto lg:flex-none lg:overflow-y-auto scrollbar-hide"
                  title="Apply Promo Code"
                >
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
                      <Button
                        style="secondary"
                        type="submit"
                        disabled={applied}
                      >
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
                            resetPromocode();
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
              )}
            </div>
          )}
        </div>
        {/* Actions Section*/}
        <div className="w-full py-4 flex items-center">
          <div className="w-full max-w-[1400px] mx-auto px-4 flex lg:justify-end">
            {selectedTabIndex === 0 ? (
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
            ) : (
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
                {payableAmount !== null && payableAmount < 1 && applied
                  ? "Get It Free"
                  : payableAmount !== null && payableAmount > 0 && applied
                  ? `Just Pay ₹ ${payableAmount}`
                  : "Proceed To Pay"}
              </Button>
            )}
          </div>
        </div>
      </div>

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
  );
};
