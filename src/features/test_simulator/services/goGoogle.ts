import type { Response } from "../test_simulator.types";

interface GoGoogleParams {
  questionText?: string;
  responseChoices?: Response[];
}
export const goGoogle = ({
  questionText,
  responseChoices = [],
}: GoGoogleParams) => {
  const alphaArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  if (!questionText) return;

  // Format options like "A. Paris", "B. London"...
  const options = responseChoices
    .map((choice, i) => `${alphaArr[i]}. ${choice.responseText}`)
    .join(" ");

  // Clean question text (remove extra spaces)
  const cleanedQuestion = questionText.replace(/\s+/g, " ").trim();

  // Build query
  const query = `${cleanedQuestion} ${options}`.trim();

  // Open Google search
  window.open(
    `https://www.google.com/search?igu=1&q=${encodeURIComponent(query)}`
  );
};
