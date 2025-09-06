// Types
import { QuestionStatus } from "../test_simulator.types";
import type {
  TestData,
  Pointer,
  SectionUI,
  Question,
} from "../test_simulator.types";

export interface InitializeTestDataResult {
  statusMap: Record<number, QuestionStatus>;
  responseMap: Record<number, string>;
  timeMap: Record<number, number>;
  sectionsUI: SectionUI[];
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
  const responseMap: Record<number, string> = {};
  const timeMap: Record<number, number> = {};

  testData?.questionSet?.forEach((q) => {
    statusMap[q.questionId] = QuestionStatus.NOT_VISITED;
    responseMap[q?.questionId] = q.studentResponse ?? "";
    timeMap[q.questionId] = q.timeSpent ?? 0;
  });

  const sectionsUI = convertDataToSections(testData);

  // Default pointer
  let initialPointer: Pointer = {
    sectionPos: -1,
    questionPos: -1,
  };

  // Mark first question as visited
  const firstSection = testData?.sectionSet?.find(
    (sec) => sec.questionNumbers.length > 0
  );
  if (firstSection) {
    const firstQId = firstSection?.questionNumbers[0]?.questionId;
    statusMap[firstQId] = QuestionStatus.VISITED;
    initialPointer = {
      sectionPos: 0,
      questionPos: 0,
    };
  }

  return {
    statusMap,
    responseMap,
    timeMap,
    sectionsUI,
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
