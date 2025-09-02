import { makeRequest } from "../../../utils/http";

/**
 * https://userapi.easetolearn.com/helpcontent?templateId=435&searchFlag=Topic&searchQuery=CHEMISTRY&topicId=988
 *  */

interface HelpContentParams {
  templateId: number;
  searchQuery: string;
  searchFlag: string;
  topicId: number;
  loginId: string;
  token: string;
}

export const helpContent = async ({
  templateId,
  searchQuery,
  searchFlag,
  topicId,
  loginId,
  token,
}: HelpContentParams) => {
  try {
    const res = await makeRequest("get", "helpcontent", null, {
      params: {
        templateId,
        searchQuery,
        searchFlag,
        topicId,
      },
      headers: { loginId, token, device: "web" },
    });
    return res?.data?.obj ?? null;
  } catch (error) {
    console.log("Failed to call help content api:", error);
    return null;
  }
};
