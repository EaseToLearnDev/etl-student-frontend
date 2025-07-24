export type TopicType = {
  topicId: number;
  questionCount: number;
  subjectiveCount: number;
  topicName: string;
  topicUrl: string;
  pathIds: string;
  children: TopicType[];
};

export type ContentType = {
  id: number;
  contentTitle: string;
  contentDescription: string;
  contentType: string;
  rating: number;
  language?: string;
};

export type TestType = {
  testName: string;
  testUrl: string;
  testTime: number;
  questions: number;
  totalMarks: number;
  difficulty: string;
  progress: "not_started" | "in_progress";
  marks?: number;
};

export interface MockTestCategoryType {
  categoryId: number;
  categoryName: string;
  testList: MockTestType[];
}

export interface MockTestType {
  mocktestId: number;
  testName: string;
  instanceUuid: string;
  totalQuestions: number;
  noQuestionAttempt: number;
  testTotalTime: number;
  totalMarks: number;
  correctAnsMark: number;
  wrongAnsMark: number;
  noAnsMark: number;
  sectionSet?: MockSectionType[];
  difficulty?: string;
  progress?: "not_started" | "in_progress";
  marks?: number;
}

export interface MockSectionType {
  sectionId: number;
  sectionName: string;
  questionRange: string;
  correctMarks: number;
  incorrectMarks: number;
  notAnswerMarks: number;
  totalTime: number;
  noQuestionAttempt: number;
}

export interface TopicTestResponseType {
  responseTxt: string;
  message: string;
  obj: TopicTestType[];
}

export interface TopicTestType {
  mockTestTitle: string;
  mockTestId: number;
  topicId: number;
  patternDetails: PatternDetailsType;
}
export interface PatternDetailsType {
  totalQuestion: number;
  totalTime: number;
  totalMark: number;
  markCorrectAns: number;
  markIncorrectAns: number;
  markNotAttempt: number;
  questionType: string;
}