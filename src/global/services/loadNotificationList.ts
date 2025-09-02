// Hooks
import { useStudentStore } from "../../features/shared/hooks/useStudentStore";
import useNotificationStore from "../hooks/useNotificationStore";

// Apis
import { notificationList } from "../api/notificationList.api";

/**
 * Loads the list of class tests for the active student and course.
 */
export const loadNotificationList = async () => {
  const { studentData } = useStudentStore.getState();
  const { setNotifications } = useNotificationStore.getState();

  if (!studentData) {
    setNotifications(null);
    return;
  }

  const { loginId, token } = studentData;

  if (!loginId || !token) {
    setNotifications(null);
    return;
  }

  try {
    const list = (await notificationList({
      loginId,
      token,
    })) as string[];

    if (!list) {
      setNotifications(null);
      return;
    }
    setNotifications(list);
  } catch (error) {
    console.log("Failed to load notifications: ", error);
    setNotifications(null);
  }
};
