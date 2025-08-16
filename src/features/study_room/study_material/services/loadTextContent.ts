import { useStudentStore } from "../../../shared/store/useStudentStore";
import { getTextContent } from "../api/textContent.api";
import type { TextContentType, TopicContentType } from "../sm.types";

export const loadTextContent = async (selectedContent: TopicContentType) => {
  const { studentData } = useStudentStore.getState();

  if (!studentData || !selectedContent) {
    return null;
  }

  const { id } = selectedContent;
  const { loginId, token } = studentData;
  if (!loginId || !token || !id) {
    return null;
  }

  try {
    const data = (await getTextContent({
      id,
      loginId,
      token,
    })) as TextContentType;

    return data ?? null;
  } catch (error) {
    console.log("Failed to load text content: ", error);
    return null;
  }
};
