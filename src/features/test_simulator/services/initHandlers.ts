// Types
import { QuestionStatus, QuestionStatusMap } from "../test_simulator.types";
import type {
  TestData,
  Pointer,
  SectionUI,
  Question,
  ResponseType,
  MarksType,
} from "../test_simulator.types";
import { deserializeStudentSubjecitveResponse } from "./studentResponseHandler";

export interface InitializeTestDataResult {
  statusMap: Record<number, QuestionStatus>;
  responseMap: Record<number, ResponseType>;
  timeMap: Record<number, number>;
  marksMap: Record<number, MarksType>;
  sectionsUI: SectionUI[];
  subjectiveSectionsUI: SectionUI[];
  initialPointer: Pointer;
}

/**
 * Initializes maps (status, response, time) and sections UI from test data.
 */
export const initializeTestData = ({
  testData,
}: {
  testData: TestData;
}): InitializeTestDataResult => {
  const statusMap: Record<number, QuestionStatus> = {};
  const responseMap: Record<number, ResponseType> = {};
  const timeMap: Record<number, number> = {};
  const marksMap: Record<number, MarksType> = {};

  testData?.questionSet?.forEach((q) => {
    statusMap[q.questionId] =
      QuestionStatusMap[q.backgroundImg ?? ""] ?? QuestionStatus.NOT_VISITED;

    const response = deserializeStudentSubjecitveResponse(
      q.studentResponse || "",
    );
    responseMap[q.questionId] = response;

    timeMap[q.questionId] = q.timeSpent ?? 0;

    // Only create marksObj if responseChoices are available
    if (q.responseChoice && q?.responseChoice?.length > 0) {
      const marksObj: MarksType =
        q.answerStatus && q.answerStatus === "NotAnswer"
          ? {
              options: Array(q?.responseChoice?.length).fill("no"),
              totalMark: 0,
            }
          : {
              options: q.answerStatus?.split(",") ?? [],
              totalMark: q.marks ?? 0,
            };

      marksMap[q.questionId] = marksObj;
    }
  });

  const sectionsUI = convertDataToSections(testData);

  const subjectiveSectionsUI = sectionsUI
    .map((section) => ({
      ...section,
      questionList: section.questionList.filter((q) =>
        [
          "Subjective-Type-Very-Short",
          "Subjective-Type-Short-Answer-I",
          "Subjective-Type-Short-Answer-II",
          "Subjective-Type-Long",
        ].includes(q.questionType),
      ),
    }))
    .filter((section) => section.questionList.length > 0);

  // Default pointer
  let initialPointer: Pointer = {
    sectionPos: -1,
    questionPos: -1,
  };

  // Mark first question as visited
  const firstSection = testData?.sectionSet?.find(
    (sec) => sec.questionNumbers.length > 0,
  );
  if (firstSection) {
    initialPointer = {
      sectionPos: 0,
      questionPos: 0,
    };
  }
  return {
    statusMap,
    responseMap,
    timeMap,
    marksMap,
    sectionsUI,
    subjectiveSectionsUI,
    initialPointer,
  };
};

// Convert raw test data into UI-friendly section structure
export const convertDataToSections = (data: TestData | null) => {
  if (!data) return [];
  return data?.sectionSet?.map((section) => ({
    sectionName: section.sectionName,
    questionList: section.questionNumbers
      .map((qn) => data.questionSet.find((q) => q.questionId === qn.questionId))
      .filter((q): q is Question => Boolean(q)),
  })) as SectionUI[];
};
