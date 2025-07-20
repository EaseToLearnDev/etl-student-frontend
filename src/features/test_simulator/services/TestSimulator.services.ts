import { QuestionStatus, type QuestionType, type TestDataType } from "../types";

// Convert raw test data into UI-friendly section structure
export const convertDataToSections = (data: TestDataType | null | undefined) => {
  if (!data) return [];
  return data.sectionSet.map((section) => ({
    sectionName: section.sectionName,
    questionList: section.questionNumbers
      .map((qn) => data.questionSet.find((q) => q.questionId === qn.questionId))
      .filter((q): q is QuestionType => Boolean(q)),
  }));
};


export const updateStatusOnVisit = (
  statusMap: Record<number, QuestionStatus>,
  questionId: number
): Record<number, QuestionStatus> => {
  return statusMap[questionId] === QuestionStatus.NOT_VISITED
    ? { ...statusMap, [questionId]: QuestionStatus.VISITED }
    : statusMap;
};