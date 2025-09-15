import { useStudentStore } from "../../features/shared/hooks/useStudentStore";

export const getCourseAccessStatus = (
  validTillDate?: string,
  packType?: string,
  title?: string
) => {
  // Free courses
  if (!validTillDate || !packType || !title) return;

  if (
    packType === "FREEFOREVER" ||
    (packType === "FREE" && title.includes("FREE FOREVER"))
  ) {
    return "accessible";
  }

  // Paid or limited-time courses
  if (!packType.includes("FREE") && !title.includes("FREE FOREVER")) {
    const now = new Date();
    const expiry = new Date(validTillDate);
    expiry.setDate(expiry.getDate() + 1); // add 1-day grace period

    return now > expiry ? "renew" : "accessible";
  }

  return "upgrade"; // default case
};

export const getActiveCourseAccessStatus = () => {
  const { activeCourse } = useStudentStore.getState();
  if (!activeCourse) return;

  const { packTypeTitle, validTillDate, organisationName } = activeCourse;
  if (!packTypeTitle || !validTillDate || !organisationName) return;

  // Free courses
  if (
    packTypeTitle === "FREEFOREVER" ||
    (packTypeTitle === "FREE" && organisationName.includes("FREE FOREVER"))
  ) {
    return "accessible";
  }

  // Paid or limited-time courses
  if (!packTypeTitle.includes("FREE") && !organisationName.includes("FREE FOREVER")) {
    const now = new Date();
    const expiry = new Date(validTillDate);
    expiry.setDate(expiry.getDate() + 1); // add 1-day grace period

    return now > expiry ? "renew" : "accessible";
  }

  return "upgrade"; // default case
};
