// Apis
import selfTestFormOptions from "../api/selftestformoptions.api";

// Hooks
import { useStudentStore } from "../../../shared/hooks/useStudentStore";
import { useSharedLearningStore } from "../hooks/useSharedLearningStore";

const loadSelfTestOptions = async () => {
  try {
    const { studentData, activeCourse } = useStudentStore.getState();
    const { setTestOptions } = useSharedLearningStore.getState();

    if (!studentData || !activeCourse) return;

    const { loginId, token } = studentData;
    const { templateId } = activeCourse;

    if (!loginId || !token || !templateId) return;

    const data = await selfTestFormOptions({ loginId, token, templateId });
    if (!data || data?.length === 0) return;

    const options = data.map((option: any) => ({
      ...option,
      questionTypeList:
        option?.questionTypeList?.map((q: any) => q.typeTitle) ?? null,
    }));

    setTestOptions(options);
  } catch (error) {
    console.log("failed to load self test options: ", error);
  }
};

export default loadSelfTestOptions;
