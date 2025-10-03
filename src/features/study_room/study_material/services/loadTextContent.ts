// Types
import type { Content } from "../sm.types";

// Hooks
import { useStudentStore } from "../../../shared/hooks/useStudentStore";

// Apis
import { getTextContent } from "../api/textContent.api";

/**
 * Loads text content for the selected topic using student credentials.
 */
export const loadTextContent = async (selectedContent: Content) => {
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
    })) as Content;

    return data ?? null;
  } catch (error) {
    console.log("Failed to load text content: ", error);
    return null;
  }
};
