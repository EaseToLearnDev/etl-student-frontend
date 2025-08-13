const getValidityFormatted = (
  dateStr: string,
  subscriptionType: string,
  courseTitle: string
): string => {
  const type = subscriptionType?.toUpperCase() ?? "";
  const title = courseTitle?.toUpperCase() ?? "";

  if (
    type === "FREEFOREVER" ||
    (type === "FREE" && title.includes("FREE FOREVER"))
  ) {
    return "FREE";
  }

  if (dateStr && type && !type.includes("FREE")) {
    // Expecting "DD-MM-YYYY" → convert to "YYYY-MM-DD"
    const [day, month, year] = dateStr.split("-");
    if (day && month && year) {
      return `${type}, ${year}-${month}-${day}`;
    }
  }

  return "FREE TRIAL";
};

export default getValidityFormatted;
