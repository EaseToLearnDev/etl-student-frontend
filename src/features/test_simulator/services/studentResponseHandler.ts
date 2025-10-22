import type { ResponseType } from "../test_simulator.types";
/**
 * Serializes a StudentResponse object into a plain string
 */

export const serializeStudentSubjectiveResponse = (
  response: ResponseType,
): string => {
  let result = "";
  const textPart =
    response.text && response.text.length > 0 ? response.text.join(" ") : "";

  result = `${textPart}$$$$$`;

  // Only push fileName if it exists
  if (response.fileName) result += `${response.fileName}$$$$$`;
  // Only push url if it exists
  if (response.url) result += `${response.url}`;
  return result;
};

/**
 * Deserializes a student response string into a structured ResponseType object.
 * The input string is expected to be delimited by '$$$$$', with the format:
 * 'text$$$$$fileName$$$$$url'.
 *
 */
export const deserializeStudentSubjecitveResponse = (
  serializedString: string,
): ResponseType => {
  if (serializedString === "") {
    return { text: [""], fileName: null, url: null };
  }

  const parts = serializedString.split("$$$$$");

  let fileName: string | null = null;
  let url: string | null = null;

  // Text part is always the first element (parts[0]).
  const text =
    parts[0] !== undefined && parts[0] !== "" ? parts[0].split("~") : [""];

  // FileName part is the second element (parts[1]), if it exists and is not an empty string.
  if (parts[1] !== undefined && parts[1] !== "") {
    fileName = parts[1];
  }

  // URL part is the third element (parts[2]), if it exists and is not an empty string.
  if (parts[2] !== undefined && parts[2] !== "") {
    url = parts[2];
  }

  return { text, fileName, url };
};
