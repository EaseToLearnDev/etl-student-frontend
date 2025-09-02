import { makeRequest } from "../../utils/http";

interface NotificationListParams {
  loginId: string;
  token: string;
}
export const notificationList = async ({
  loginId,
  token,
}: NotificationListParams) => {
  const res = await makeRequest("get", "/student-panel-notifications", null, {
    headers: {
      loginId,
      token,
      device: "web",
    },
  });
  return res?.data?.obj ?? null;
};