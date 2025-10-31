import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { handleFreeCourse } from "../services/handleFreeCourse";
import { handlePaymentButton } from "../services/handlePaymentButton";
import {
  ToastType,
  type Course,
  type CourseResponse,
  type Option,
} from "../../shared/types";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { useCoursesStore } from "../hooks/useCoursesStore";
import { removePaymentFlag } from "./removePaymentFlag";
import { generateCoursesData } from "../../shared/services/generateCoursesData";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const processCourseSelection = async ({
  option,
  courseId,
  courseTitle,
  selectedPlanId,
  code,
  navigate,
  payableAmount,
  email,
}: {
  option?: number;
  courseId?: number;
  courseTitle?: string;
  selectedPlanId?: number | null;
  code?: string;
  navigate: (path: string) => void;
  payableAmount?: Option<number>;
  email: string;
}) => {
  const { studentData, setStudentData } = useStudentStore.getState();
  const { setIsUpdateEmailModalOpen } = useCoursesStore.getState();
  const { setToast } = useToastStore.getState();

  if (!courseId || !option) return;

  if (!studentData) return console.error("No student data found");

  // ---------------- Free course flow ----------------
  if (option === 1) {
    try {
      const res = await handleFreeCourse(courseId);
      if (res.responseTxt === "course_already_taken") {
        setToast({
          type: ToastType.DANGER,
          title: "Course Already Taken",
          description: "You have already enrolled in this course.",
        });
      }

      const courses = generateCoursesData(res?.obj);
      const purchasedCourse = courses?.find((c) => c.courseId === courseId);
      const openedCourse = purchasedCourse
        ? courses.indexOf(purchasedCourse)
        : 0;
      setStudentData({ ...studentData, courses, openedCourse });
      setToast({
        title: `${purchasedCourse?.organisationName} Course Successfully Added`,
        description: "Start your free trial and practice before you commit",
        type: ToastType.SUCCESS,
      });
      return navigate("/dashboard");
    } catch (err) {
      return console.error("Error enrolling in free course:", err);
    }
  }

  // ---------------- Paid course flow ----------------
  if (!selectedPlanId) return console.warn("Please select a plan first");

  if (!email && payableAmount && payableAmount > 0) {
    setIsUpdateEmailModalOpen(true);
    return;
  }

  try {
    if (!courseTitle) return;
    const data = await handlePaymentButton({
      option,
      courseId,
      courseTitle,
      packId: selectedPlanId,
      promoCode: code ?? "",
    });
    // OPTION 3 FLOW
    // if (option === 3) {
    //   // mobile in-app flow
    //   window.location.href =
    //     `inapppayment?orderId=${data.orderId}&token=${data.token}` +
    //     `&amount=${data.amount}&firstname=${studentData.studentName}` +
    //     `&email=${studentData.emailId}&phone=${studentData.phoneNo}` +
    //     `&productinfo=${data.productinfo}`;
    //   return;
    // }

    // OPTION 2 FLOW
    if (option === 3 && data.amount > 0) {
      // PayU form flow
      // let form = document.forms.namedItem("pgform") as HTMLFormElement | null;
      // if (!form) return console.error("PayU form not found in DOM");

      // form.key.value = data.key;
      // form.txnid.value = data.token;
      // form.amount.value = data.amount;
      // form.firstname.value = studentData.studentName;
      // form.email.value = studentData.emailId;
      // form.phone.value = studentData.phoneNo;
      // form.productinfo.value = data.productinfo;
      // form.surl.value = import.meta.env.VITE_PAYMENT_GATEWAY_SUCCESS_URL;
      // form.furl.value = import.meta.env.VITE_URL + "/student/pgcancelled";
      // form.hash.value = data.hashCode;

      // form.submit();

      // RazorPay Checkout
      const options = {
        key: data?.key,
        order_id: data?.orderId,
        amount: Math.round(Number(data?.amount) * 100),
        currency: "INR",
        name: "EaseToLearn",
        image:
          "https://ik.imagekit.io/rohitsahu/Email-template/Artboard%201HIGH.png",
        callback_url: import.meta.env.VITE_PAYMENT_GATEWAY_SUCCESS_URL,
        description: data?.productinfo,
        prefill: {
          name: studentData.studentName,
          email: email,
          contact: studentData.phoneNo,
        },
        notes: {
          name: studentData.studentName,
          promoCode: code,
          device: "web",
        },
        theme: { color: "#0D6EFD" },
        modal: {
          ondismiss: () => {
            removePaymentFlag();
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        removePaymentFlag();
        setToast({
          title: "Payment Failed!",
          description: "Something went wrong. Try Again Later.",
          type: ToastType.DANGER,
        });
      });
      rzp.open();
    } else if (data.organisations.length > 0) {
      const courses = generateCoursesData(data.organisations);

      const purchasedCourse = courses?.find((c) => c.courseId === courseId);
      const openedCourse = purchasedCourse
        ? courses.indexOf(purchasedCourse)
        : 0;
      setStudentData({ ...studentData, courses, openedCourse });
      setToast({
        title: `${purchasedCourse?.organisationName} Course Successfully Purchased`,
        description: "Thanks for buying and practice before you commit",
        type: ToastType.SUCCESS,
      });
      return navigate("/dashboard");
    }
  } catch (err) {
    console.error("Error directing to Payment Gateway:", err);
  }
};
