/**
 * Capitalizes the first letter of each word in the given text.
 */
export const capitalizeWords = (text: string) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Checks if an HTML element is visible in the viewport.
 */
export const checkVisible = (elm: HTMLElement) => {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

/** Function to check if the provided data has a table inside and wraps it in a div with class table-responsive.
 */

export const checkForTable = (data: string) => {
  // Remove non-breaking spaces
  let body = data?.replace(/&nbsp;/g, "");

  // Split the body into parts before and after each table
  let upperParts = body?.split("<table");

  // Loop through each part and wrap it in a table-responsive div
  for (let i = 0; i < upperParts?.length - 1; i++) {
    upperParts[i] += "<div class='table_responsive'><table";
  }

  // Join the parts back together
  body = upperParts?.join("");

  // Split the body into parts before and after each closing table tag
  let lowerParts = body?.split("</table>");

  // Loop through each part and wrap it in a closing div tag
  for (let i = 0; i < lowerParts?.length - 1; i++) {
    lowerParts[i] += "</table></div>";
  }

  // Join the parts back together
  body = lowerParts?.join("");

  return body;
};

/**
 * Converts an object of query parameters to a URL query string.
 */
export const toQueryString = (params: Record<string, string>) =>
  new URLSearchParams(params).toString().replace(/\+/g, "%20");

/**
 * Converts seconds to a time string in HH:mm:ss format.
 */
export const getTimeFromSeconds = (seconds: number) => {
  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;

  return `${hh.toString().padStart(2, "0")}:${mm
    .toString()
    .padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
};
