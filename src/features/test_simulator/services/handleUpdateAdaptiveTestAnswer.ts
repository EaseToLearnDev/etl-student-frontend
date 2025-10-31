import type { NavigateFunction } from "react-router";
import { useToastStore } from "../../../global/hooks/useToastStore";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { ToastType } from "../../shared/types";
import { updateAdaptiveTestAnswer } from "../api/updateAdaptiveTestAnswer.api";
import useTestStore from "../store/useTestStore";
import { subjectiveTypes } from "../test_simulator.types";
import { serializeStudentSubjectiveResponse } from "./studentResponseHandler";

export const handleUpdateAdaptiveTestAnswer = async (
  navigate: NavigateFunction
) => {
  const { setLoading } = useLoadingStore.getState();
  const { setToast } = useToastStore.getState();

  try {
    const { studentData } = useStudentStore.getState();
    const {
      getCurrentQuestion,
      questionResponseMap,
      questionHelpMap,
      testConfig,
    } = useTestStore.getState();

    //   Get Current Question
    const currentQuestion = getCurrentQuestion();

    //   Early return
    if (!studentData || !currentQuestion || !testConfig) return;

    //   Extract fields
    const { loginId, token } = studentData;
    const { testSession } = testConfig;
    const currentResponse = questionResponseMap[currentQuestion?.questionId];
    const studentResponse = subjectiveTypes.includes(
      currentQuestion?.questionType || ""
    )
      ? serializeStudentSubjectiveResponse(currentResponse)
      : currentResponse.text.join("~") || "";
    const helpCount = questionHelpMap[currentQuestion?.questionId];

    //   Early return if fields are null
    if (!loginId || !token || !testSession) return;

    // Enable loading
    setLoading(true);

    //   Create form data
    const formData = new FormData();
    formData.append("testSession", testSession);
    formData.append("questionId", String(currentQuestion?.questionId));
    formData.append("studentResponse", studentResponse);
    formData.append("help", String(+helpCount));

    const data = await updateAdaptiveTestAnswer({
      data: formData,
      loginId,
      token,
    });

    if (!data || data?.responseTxt !== "success") {
      setToast({
        title: "Something Went Wrong!",
        description: "Failed to submit answer.",
        type: ToastType.DANGER,
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate(`/test-simulator-adaptive?testSession=${testSession}`, {replace: true})
  } catch (error: any) {
    console.log("Error updating adaptive test answer: ", error.message);
  }
};
