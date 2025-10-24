import { useToastStore } from "../../../global/hooks/useToastStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { ToastType } from "../../shared/types";
import { updateMarksTest } from "../api/updateMarksTest.api";
import useTestStore from "../store/useTestStore";

export const handleUpdateMarksTest = async (isTestFinish: boolean = false) => {
  try {
    const { setToast } = useToastStore.getState();
    const { studentData } = useStudentStore.getState();
    const { testConfig, getCurrentQuestion, questionMarksMap } =
      useTestStore.getState();

    const question = getCurrentQuestion();

    if (!studentData || !testConfig || !question) return;

    const { loginId, token } = studentData;

    const testSession = testConfig?.testSession?.slice(2);
    const questionId = question.questionId;
    const questionType = question?.questionType || "";

    const marksObj = questionMarksMap[questionId];

    if (!testSession || !questionId || !marksObj || !loginId || !token) return;

    const marks = marksObj.totalMark || 0;
    const marksOption = marksObj.options.join(",") || "";

    const formData = new FormData();
    formData.append("testSession", testSession);
    formData.append("questionId", String(questionId));
    formData.append("marks", String(marks));
    formData.append(
      "marksoption",
      marksObj.options?.every((mark) => mark === "no")
        ? "NotAnswer"
        : marksOption,
    );
    formData.append("finishTest", String(+isTestFinish));
    formData.append("questionType", questionType);

    const data = await updateMarksTest({ data: formData, loginId, token });
    if (!data || data.responseTxt !== "success") {
      setToast({
        title: "Error Updating Marks",
        description: "Failed to update marks",
        type: ToastType.DANGER,
      });
    }
  } catch (error: any) {
    console.log("Failed to handle update marks service: ", error.message);
  }
};
