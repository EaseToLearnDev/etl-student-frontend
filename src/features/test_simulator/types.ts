export interface ResponseType {
  responseId: string;
  responseText: string;
}

export interface QuestionType {
  questionId: number;
  questionDisplayId: string | number;
  questionType: string;
  questionTypeLabel: string;
  sectionId: number;
  sectionName: string;
  sectionOrder: number;
  sectionTime: number;
  topicId: string;
  timeSpent?: number;
  correctAnswerMarks: number;
  incorrectAnswerMarks: number;
  notAnswerMarks: number;
  questionBody: string;
  responseChoice: ResponseType[];
  backgroundImg?: string;
  cssName?: string;
  noQuestionAttempt?: number;
  noQuestion: number;
  studentResponse?: ResponseType;
}

export interface SectionType {
  sectionName: string;
  questionNumbers: {
    questionIndex: number;
    questionId: number;
  }[];
}

export interface SectionUIType {
  sectionName: string;
  questionList: QuestionType[];
}

export interface TestDataType {
  testId: number;
  testName: string;
  testType: number;
  testOption: number;
  totalTime: number;
  noQuestionAttempt: number;
  remainingTime: number;
  lastQuestionIndex: number;
  sectionLock: string;
  sectionSet: SectionType[];
  questionSet: QuestionType[];
}

export interface CurrentPointerType {
  currentSectionPos: number;
  currentQuestionPos: number;
}

export enum QuestionStatus {
  NOT_ATTEMPTED = "not_attempted",
  ATTEMPTED = "attempted",
  NOT_VISITED = "not_visited",
  VISITED = "visited",
  MARKED_FOR_REVIEW = "marked_for_review",
  HELP = "help",
}
