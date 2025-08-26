import { useEffect, useState } from "react";
import { PlanCard } from "./PlanCard";
import { PlanSubmit } from "./PlanSubmit";
import Tabs from "../../../components/Tabs";
import { handlePaymentButton } from "../services/handlePaymentButton";
import { useStudentStore } from "../../shared/store/useStudentStore";
import { VerifyPromoCode } from "../services/VerifyPromoCode";

import.meta.env.VITE_BASE_URL;

interface CoursePlanListItem {
  packId: number;
  packName: string;
  price: number;
}

interface CoursePlan {
  packType: string;
  list: CoursePlanListItem[];
}

interface PlanBodyProps {
  coursePlan: CoursePlan[];
  courseTitle: string;
  courseId: number;
}

export const PlanBody = ({
  coursePlan,
  courseTitle,
  courseId,
}: PlanBodyProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [selPriceList, setSelPriceList] = useState([]);
  const [error, setError] = useState(false);

  const { studentData } = useStudentStore.getState();

  if (!studentData) return null;

  useEffect(() => {
    if (coursePlan[selectedTabIndex]?.list?.length > 0) {
      setSelectedPlanId(coursePlan[selectedTabIndex].list[0].packId);
    }
  }, [selectedTabIndex, coursePlan]);

  const effectivePlan =
    selPriceList && selPriceList.length > 0
      ? selPriceList
      : coursePlan;

  const promo = async (promoCode: string) => {
    try {
      const res = await VerifyPromoCode({ promoCode, courseId });
      if (res?.responseTxt === "success" && res?.obj) {
        console.log(res)
        setSelPriceList(res.obj);
        setApplied(true);
      } else {
        setApplied(false);
        setError(true)
      }
    } catch (error) {
      console.log("Failed to Apply Coupon", error);
      setError(true)
      setApplied(false);
    }
  };

  const handleCourseSelect = async () => {
    if (selectedPlanId === null) {
      console.log("Please select a plan first");
      return;
    }
    const packId = selectedPlanId;

    let apiQuery = "";
    if (code) {
      apiQuery += "&promoCode=" + code;
    }

    const deviceType = "web";

    const option = deviceType === "ios" ? 3 : 2;
    try {
      const res = await handlePaymentButton({
        option,
        courseId,
        courseTitle,
        packId,
        apiQuery,
      });
      if (option === 3) {
        window.location.href =
          "inapppayment?orderId=" +
          res.orderId +
          "&token=" +
          res.token +
          "&amount=" +
          res.amount +
          "&firstname=" +
          studentData.studentName +
          "&email=" +
          studentData.emailId +
          "&phone=" +
          studentData.phoneNo +
          "&productinfo=" +
          res.productinfo;
        return false;
      } else {
        const form = document.forms["pgform"];
        if (!form) {
          console.error("PayU form not found in DOM");
          return;
        }

        form.key.value = res.key;
        form.txnid.value = res.token;
        form.amount.value = res.amount;
        form.firstname.value = studentData.studentName;
        form.email.value = studentData.emailId;
        form.phone.value = studentData.phoneNo;
        form.productinfo.value = res.productinfo;
        form.surl.value = import.meta.env.VITE_PAYMENT_GATEWAY_SUCCESS_URL;
        form.furl.value = import.meta.env.VITE_BASE_URL + "/pgcancelled";
        form.hash.value = res.hashCode;

        form.submit();
      }
    } catch (error) {
      console.log("Error Directing to Payment Gateway: ", error);
      return null;
    }
  };

  return (
    <div className="h-full sticky top-0 right-0 overflow-y-visible">
      <div className="flex items-center justify-start flex-col w-full py-[10px] max-h-max">
        <h3 className="mb-3">{courseTitle} Subscriptions</h3>
        <div className="w-[150px] border border-gray-400 rounded-full bg-gray-100 flex items-center justify-evenly mx-auto mb-6">
          <Tabs
            tabs={effectivePlan.map((plan) => plan.packType)}
            selectedIndex={selectedTabIndex}
            onSelect={setSelectedTabIndex}
          />
        </div>

        <div className="w-full max-h-[320px] overflow-y-scroll">
          {effectivePlan[selectedTabIndex]?.list.map((plan, idx) => (
            <PlanCard
              key={idx}
              plan={plan}
              selected={selectedPlanId === plan.packId}
              onSelect={() => setSelectedPlanId(plan.packId)}
            />
          ))}
        </div>

        <PlanSubmit
          submit={handleCourseSelect}
          promo={promo}
          code={code}
          setCode={setCode}
          applied={applied}
          setApplied={setApplied}
          error={error}
        />
      </div>

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
