export const getCourseAccessStatus = (
  validTillDate: string,
  packType: string,
  title: string
) => {
  // Free courses
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
