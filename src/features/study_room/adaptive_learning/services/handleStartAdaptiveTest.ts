import type { NavigateFunction } from "react-router";
import { useStudentStore } from "../../../shared/hooks/useStudentStore";
import { adaptiveCreateTest } from "../api/adaptiveCreateTest.api";
import { useALStore } from "../hooks/useALStore";
import { useToastStore } from "../../../../global/hooks/useToastStore";
import { ToastType } from "../../../shared/types";

export const handleStartAdaptiveTest = async (navigate: NavigateFunction) => {
  try {
    const { setToast } = useToastStore.getState();
    const { studentData, activeCourse } = useStudentStore.getState();
    if (!activeCourse || !studentData) return;

    const { loginId, token } = studentData;
    const { templateId, courseId } = activeCourse;

    const { getSelectedTopic } = useALStore.getState();
    const topic = getSelectedTopic();

    if (!loginId || !token || !templateId || !courseId || !topic) return;

    const data = await adaptiveCreateTest({
      loginId,
      token,
      templateId,
      courseId,
      topicId: topic?.topicId,
    });

    if (data?.responseTxt === "success") {
      navigate(
        `/test-simulator-adaptive?testSession=${data?.obj?.testSession}`
      );
    } else {
      setToast({
        title: "Error",
        description: "Failed to start adaptive session",
        type: ToastType.DANGER,
      });
    }
  } catch (error: any) {
    console.log("Error handling adaptive create test: ", error.message);
  }
};
