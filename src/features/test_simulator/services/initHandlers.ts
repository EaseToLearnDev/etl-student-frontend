// Types
import { QuestionStatus, QuestionStatusMap } from "../test_simulator.types";
import type {
  TestData,
  Pointer,
  SectionUI,
  Question,
  ResponseType,
} from "../test_simulator.types";

export interface InitializeTestDataResult {
  statusMap: Record<number, QuestionStatus>;
  responseMap: Record<number, ResponseType>;
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
  const responseMap: Record<number, ResponseType> = {};
  const timeMap: Record<number, number> = {};

  testData?.questionSet?.forEach((q) => {
    statusMap[q.questionId] =
      QuestionStatusMap[q.backgroundImg ?? ""] ?? QuestionStatus.NOT_VISITED;

    let response: ResponseType = {
      text: [],
      fileName: null,
      url: null,
    };
    response.text =
      q.studentResponse && q.studentResponse.length > 0
        ? q.studentResponse.split("~")
        : [];
    responseMap[q.questionId] = response;
    
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
