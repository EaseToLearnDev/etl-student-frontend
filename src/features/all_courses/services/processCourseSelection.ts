import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { handleFreeCourse } from "../services/handleFreeCourse";
import { handlePaymentButton } from "../services/handlePaymentButton";
import type { Course, CourseResponse } from "../../shared/types";
import { ToastType } from "../../../components/Toast";
import { useToastStore } from "../../../global/hooks/useToastStore";

export const processCourseSelection = async ({
  option,
  courseId,
  courseTitle,
  selectedPlanId,
  code,
  navigate,
}: {
  option: number;
  courseId: number;
  courseTitle: string;
  selectedPlanId: number | null;
  code: string;
  navigate: (path: string) => void;
}) => {
  const { studentData, setStudentData } = useStudentStore.getState();
  const { setToast } = useToastStore.getState();
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

      const courses: Course[] = res.obj.map((c: CourseResponse) => ({
        templateId: c.templateId,
        validityId: c.validityId,
        courseId: c.courseId,
        packTypeId: c.packTypeId,
        benchmark: c.benchmark,
        organisationName: c.organisationName,
        validTillDate: c.validTillDate,
        packTypeTitle: c.packTypeTitle,
        tabs: {
          dashboard: !!c.dashboard,
          report: !!c.report,
          studyMaterial: !!c.studyMaterial,
          selfTest: !!c.selfTest,
          topicTest: !!c.topicTest,
          mockTest: !!c.mockTest,
          dynamicMockTest: !!c.dynamicMockTest,
          classTest: !!c.classTest,
          teacherHelp: !!c.teacherHelp,
          tonyHelp: !!c.tonyHelp,
          otherCourses: !!c.otherCourses,
        },
      }));

      setStudentData({ ...studentData, courses });
      return navigate("/dashboard");
    } catch (err) {
      return console.error("Error enrolling in free course:", err);
    }
  }

  // ---------------- Paid course flow ----------------
  if (!selectedPlanId) return console.warn("Please select a plan first");

  try {
    const res = await handlePaymentButton({
      option,
      courseId,
      courseTitle,
      packId: selectedPlanId,
      apiQuery: code ? `&promoCode=${code}` : "",
    });

    if (option === 3) {
      // mobile in-app flow
      window.location.href =
        `inapppayment?orderId=${res.orderId}&token=${res.token}` +
        `&amount=${res.amount}&firstname=${studentData.studentName}` +
        `&email=${studentData.emailId}&phone=${studentData.phoneNo}` +
        `&productinfo=${res.productinfo}`;
      return;
    }

    // PayU form flow
    let form = document.forms.namedItem("pgform") as HTMLFormElement | null;
    if (!form) return console.error("PayU form not found in DOM");

    form.key.value = res.key;
    form.txnid.value = res.token;
    form.amount.value = res.amount;
    form.firstname.value = studentData.studentName;
    form.email.value = studentData.emailId;
    form.phone.value = studentData.phoneNo;
    form.productinfo.value = res.productinfo;
    form.surl.value = import.meta.env.VITE_PAYMENT_GATEWAY_SUCCESS_URL;
    form.furl.value = import.meta.env.VITE_URL + "/student/pgcancelled";
    // setToast({
    //     type: ToastType.DANGER,
    //     title: "Payment Failed",
    //     description: "Something went wrong with your payment. Please try again.",
    //   });
    form.hash.value = res.hashCode;

    form.submit();
  } catch (err) {
    console.error("Error directing to Payment Gateway:", err);
  }
};
