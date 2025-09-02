// Types
import type { OpenAiSolution } from "../test_simulator.types";

// Hooks
import { useLoadingStore } from "../../../hooks/useLoadingStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";

// Apis
import { openAI } from "../api/openAi.api";

interface HandleOpenAIParams {
  questionId?: number;
  itemId?: number;
}
export const handleOpenAI = async ({
  questionId,
  itemId,
}: HandleOpenAIParams) => {
  const { studentData } = useStudentStore.getState();
  const { setLoading } = useLoadingStore.getState();

  try {
    if (!studentData || !questionId) return null;

    const { loginId, token } = studentData;

    if (!loginId || !token) return null;

    setLoading(true);
    const data = (await openAI({
      questionId,
      itemId: itemId ?? 0,
      loginId,
      token,
    })) as OpenAiSolution;

    return data?.solution ?? null;
  } catch (error) {
    console.log("Failed to handle openAI call", error);
    return null;
  } finally {
    setLoading(false);
  }
};
