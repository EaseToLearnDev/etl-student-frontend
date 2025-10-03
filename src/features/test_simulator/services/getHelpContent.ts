import type { Content } from "../../study_room/study_material/sm.types";
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { helpContent } from "../api/helpContent.api";

interface GetHelpContentParams {
  topicId?: number;
  searchQuery?: string;
  searchFlag?: string;
}
export const getHelpContent = async ({
  topicId,
  searchQuery,
  searchFlag,
}: GetHelpContentParams) => {
  const { studentData, activeCourse } = useStudentStore.getState();
  const { setLoading } = useLoadingStore.getState();

  try {
    if (!studentData || !activeCourse) return null;

    const { loginId, token } = studentData;
    const templateId = activeCourse?.templateId;

    if (
      !loginId ||
      !token ||
      !templateId ||
      !topicId ||
      !searchQuery ||
      !searchFlag
    )
      return null;

    setLoading(true);

    const list = await helpContent({
      templateId,
      searchQuery,
      searchFlag,
      topicId,
      loginId,
      token,
    }) as Content[];

    return list ?? null;
  } catch (error) {
    console.log("Failed to handle help content service: ", error);
    return null;
  } finally {
    setLoading(false);
  }
};
