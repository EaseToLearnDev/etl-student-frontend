import { useEffect, useState } from "react";
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
import useIsMobile from "../../../hooks/useIsMobile";

// Constants
const deviceType = "web";

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
  const isMobile = useIsMobile();

  const selectedTabIndex = useCoursesStore((s) => s.selectedTabIndex);
  const setSelectedTabIndex = useCoursesStore((s) => s.setSelectedTabIndex);

  const [selectedPlan, setSelectedPlan] = useState<PriceList | null>(null);
  const [coursePriceList, setCoursePriceList] = useState<PriceList[] | null>(
    null
  );

  const code = useCoursesStore((s) => s.code);
  const setCode = useCoursesStore((s) => s.setCode);

  const applied = useCoursesStore((s) => s.applied);

  const selectedPlanId = useCoursesStore((s) => s.selectedPlanId);
  const setSelectedPlanId = useCoursesStore((s) => s.setSelectedPlanId);

  const discountedPriceList = useCoursesStore((s) => s.discountedPriceList);

  const payableAmount = useCoursesStore((s) => s.payableAmount);
  const setPayableAmount = useCoursesStore((s) => s.setPayableAmount);

  const error = useCoursesStore((s) => s.error);

  const studentData = useStudentStore((s) => s.studentData);

  if (!studentData) return null;

  useEffect(() => {
    const newTabIndex = 0;
    setSelectedTabIndex(newTabIndex);
    // Plan with or without applied discount
    const priceList =
      discountedPriceList && discountedPriceList.length > 0
        ? discountedPriceList
        : coursePlan;
    if (!priceList) return;
    setCoursePriceList(priceList);

    // Added free option at beginning manually
    if (priceList.findIndex((p) => p.packType === "FREE") === -1) {
      priceList?.unshift({ packType: "FREE", list: [] });
    }

    // get current plan (free, pro or ace) based on tab index
    const newPlan = getSelectedPlan(tabs, priceList, newTabIndex) || null;

    // set current plan
    setSelectedPlan(newPlan);

    // Load Razorpay script dynamically if not already present
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!coursePriceList) return;

    const newPlan = getSelectedPlan(tabs, coursePriceList, selectedTabIndex);
    if (newPlan) {
      setSelectedPlan(newPlan);
      if (newPlan?.list?.length > 0) {
        const plan = newPlan.list[0];
        setSelectedPlanId(plan.packId);
        const price = getPriceValue(plan?.salePrice);
        setPayableAmount(price);
      }
    }
  }, [selectedTabIndex]);

  useEffect(() => {
    const priceList =
      discountedPriceList && discountedPriceList.length > 0
        ? discountedPriceList
        : coursePlan;
    if (!priceList) return;
    setCoursePriceList(priceList);

    // Added free option at beginning manually
    if (priceList.findIndex((p) => p.packType === "FREE") === -1) {
      priceList?.unshift({ packType: "FREE", list: [] });
    }

    // get current plan (free, pro or ace) based on tab index
    const newPlan = getSelectedPlan(tabs, priceList, selectedTabIndex) || null;

    // set current plan
    setSelectedPlan(newPlan);
  }, [discountedPriceList]);

  const handlePromoSubmit = () => {
    const promocode = code.trim();
    if (!applied && promocode) {
      applyPromoCode(tabs, promocode, courseId);
    }
  };

  const isCourseOwned = Boolean(
    studentData?.courses?.find((c) => c.courseId === courseId)
  );
  const tabs = isCourseOwned ? ["ACE", "PRO"] : ["FREE", "ACE", "PRO"];

  return (
    <div
      className={cn(
        "relative w-full h-[90dvh] lg:h-[calc(100dvh-5rem)] scrollbar-hide",
        isMobile ? "overflow-y-auto" : "overflow-hidden"
      )}
    >
      <div className="w-full h-[120px] p-4">
        <h3 className="px-4 text-center">{courseTitle}</h3>
        <div className="px-4 mt-4">
          <Tabs
            tabs={tabs}
            selectedIndex={selectedTabIndex}
            onSelect={setSelectedTabIndex}
            activeTabClassName="bg-blue-500 border-none text-white !font-semibold"
            containerClassName="flex justify-center items-center"
          />
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center mb-[120px] lg:max-h-[calc(100vh-19rem)]">
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:h-full overflow-y-auto lg:py-0">
          {/* Features Section */}
          <WidgetCard
            className={cn(
              "shadow-none flex flex-col scrollbar-hide !p-4",
              // mobile: full width, auto height
              "w-full h-auto",
              // desktop: flex-1 and scrollable
              "lg:max-h-full lg:overflow-y-auto lg:flex-1"
            )}
            title="Features"
          >
            <div className="flex flex-col gap-4 mt-4">
              {features?.map((feat, idx) => {
                const packIdx = isCourseOwned
                  ? selectedTabIndex === 0
                    ? 2
                    : 1
                  : selectedTabIndex === 1
                  ? 2
                  : selectedTabIndex === 2
                  ? 1
                  : 0;
                return (
                  <PlanFeature key={idx} feature={feat} packIdx={packIdx} />
                );
              })}
            </div>
          </WidgetCard>

          {/* Right Column (only if plans exist) */}
          {selectedPlan && selectedPlan?.list?.length > 0 ? (
            <div className="flex flex-col gap-4 w-full lg:flex-1 lg:min-h-full lg:overflow-y-auto scrollbar-hide">
              {tabs[selectedTabIndex] !== "FREE" && (
                <WidgetCard
                  className="shadow-none h-auto lg:flex-1 lg:overflow-y-auto scrollbar-hide !p-4"
                  title="Plans"
                >
                  <div className="flex flex-col gap-3 mt-4">
                    {selectedPlan?.list?.map((plan, idx) => (
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
                    ))}
                  </div>
                </WidgetCard>
              )}

              {tabs[selectedTabIndex] !== "FREE" && isMobile ? (
                <WidgetCard
                  className="shadow-none h-auto lg:flex-none lg:overflow-y-auto scrollbar-hide !p-4"
                  title="Have a Promo Code?"
                >
                  <form
                    className="mt-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      applied ? resetPromocode() : handlePromoSubmit();
                    }}
                  >
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
                        className="cursor-pointer"
                      >
                        {applied ? (
                          <p className="flex gap-1 items-center">
                            <MdClose size={16} /> Clear
                          </p>
                        ) : (
                          <p>Apply</p>
                        )}
                      </Button>
                    </div>
                  </form>
                </WidgetCard>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* Actions Section*/}
        <div className="w-full py-4 flex items-center fixed bottom-0 min-h-[120px] bg-[var(--surface-bg-secondary)]">
          <div className="w-full max-w-[1400px] mx-auto px-4 flex lg:justify-between gap-4 items-center">
            {!isMobile && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  applied ? resetPromocode() : handlePromoSubmit();
                }}
              >
                {applied && (
                  <p className="text-[var(--sb-green-haze-bg-active)] pb-1 pl-1">
                    Promo applied successfully 🎉
                  </p>
                )}
                {error && (
                  <p className="text-[var(--sb-valencia-bg-active)] pb-1 pl-1">
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
                      "w-full flex px-4 py-2 items-center gap-2 self-stretch rounded-md border-1 border-[var(--border-secondary)] text-base",
                      "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
                    )}
                  />
                  <Button
                    style="secondary"
                    type="submit"
                    className="cursor-pointer !px-4 !py-2"
                  >
                    {applied ? (
                      <p className="flex gap-1 items-center">
                        <MdClose size={16} /> Clear
                      </p>
                    ) : (
                      <p>Apply</p>
                    )}
                  </Button>
                </div>
              </form>
            )}
            {tabs[selectedTabIndex] === "FREE" ? (
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
                    // option: deviceType === "web" ? 2 : 3,
                    option: 3,
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
      {/* <form
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
      </form> */}
    </div>
  );
};
