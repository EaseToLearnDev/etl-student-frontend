import { useStudentStore } from "../../../shared/hooks/useStudentStore";
import selfTestFormOptions from "../api/selftestformoptions.api";
import { useSLStore } from "../hooks/useSLStore";

const loadSelfTestOptions = async () => {
  try {
    const { studentData, activeCourse } = useStudentStore.getState();
    const { setTestOptions } = useSLStore.getState();

    if (!studentData || !activeCourse) return;

    const { loginId, token } = studentData;
    const { templateId } = activeCourse;

    if (!loginId || !token || !templateId) return;

    const data = await selfTestFormOptions({ loginId, token, templateId });
    if (!data || data?.length === 0) return;

    setTestOptions({
      totalQuestion: data[0]?.totalQuestions,
      totalTime: data[0]?.duration,
      marksCorrectAns: data[0]?.marksCorrectAns,
      marksIncorrectAns: data[0]?.marksIncorrectAns,
      marksNotAttempted: data[0]?.marksNotAnswer,
    });
  } catch (error) {
    console.log("failed to load self test options: ", error);
  }
};

export default loadSelfTestOptions;
