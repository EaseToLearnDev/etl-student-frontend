import { useStudentStore } from "../../../shared/store/useStudentStore";
import { getTextContent } from "../api/textContent.api";
import type { TextContentType } from "../sm.types";
import { useSMStore } from "../store/useSMStore";

export const loadTextContent = async () => {
  const { studentData } = useStudentStore.getState();
  const { selectedContent, setTextContent } = useSMStore.getState();

  if (!studentData || !selectedContent) {
    setTextContent(null);
    return;
  }

  const { id } = selectedContent;
  const { loginId, token } = studentData;
  if (!loginId || !token || !id) {
    setTextContent(null);
    return;
  }

  try {
    const data = (await getTextContent({
      id,
      loginId,
      token,
    })) as TextContentType;

    if (!data) {
      setTextContent(null);
      return;
    }

    setTextContent(data);
  } catch (error) {
    console.log("Failed to load text content: ", error);
    setTextContent(null);
  }
};
