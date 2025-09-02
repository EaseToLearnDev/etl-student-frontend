import { makeRequest } from "../../../utils/http";

interface OpenAIParams {
  questionId: number;
  itemId: number;
  loginId: string;
  token: string;
}

export const openAI = async ({
  questionId,
  itemId,
  loginId,
  token,
}: OpenAIParams) => {
  try {
    const res = await makeRequest("get", "/app/studentpanel/openai", null, {
      params: {
        questionId,
        itemId,
      },
      headers: { loginId, token, device: "web" },
    });
    return res?.data?.obj ?? null;
  } catch (error) {
    console.log("failed to call openai api: ", error);
    return null;
  }
};
