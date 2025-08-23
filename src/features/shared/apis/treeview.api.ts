import type { TreeView } from "../types";
import { makeRequest } from "../../../utils/http";

interface GetTopicTreeViewParams {
  type: TreeView;
  mode: 0 | 1;
  loginId: string;
  token: string;
  templateId: number;
}

export const getTopicTreeView = async ({
  type,
  mode,
  loginId,
  token,
  templateId,
}: GetTopicTreeViewParams): Promise<unknown | null> => {
  try {
    const res = await makeRequest("get", "/treeview/get-tree-by-course", null, {
      params: {
        type,
        mode,
        templateId,
      },
      headers: {
        loginId,
        token,
        device: "web",
      },
    });
    return res?.data ?? null;
  } catch (error) {
    console.log("Failed to get topic tree:", error);
    return null;
  }
};
