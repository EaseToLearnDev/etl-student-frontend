export interface Response {
  responseId: string;
  responseText: string;
}

export interface Question {
  itemId?: number;
  questionId: number;
  questionDisplayId: number;
  questionType: string;
  questionTypeLabel: string;
  topicId: number;
  questionBody: string;
  responseChoice: Response[];
  timeSpent?: number;
  correctAnswerMarks?: number;
  incorrectAnswerMarks?: number;
  notAnswerMarks?: number;
  marks?: number;
  studentResponse?: string;
  correctResponse?: string;
  explanations?: string;
  answerStatus?: string; // Correct | Incorrect | NotAnswer
  sectionId?: number;
  sectionName?: string;
  sectionOrder?: number;
  sectionTime?: number;
  backgroundImg?: string;
  cssName?: string;
  noQuestionAttempt?: number;
  noQuestion?: number;
  bloomId: number;
  commonDataDescription?: string;
  columns?: QuestionColumn[];
}

export interface QuestionColumn {
  columnHeader?: string;
  columnRows?: ColumnRow[];
}
export interface ColumnRow {
  rowId?: string;
  rowName?: string;
}

export interface Section {
  sectionName?: string;
  sectionTime?: number;
  questionNumbers: {
    questionIndex: number;
    questionId: number;
    answerStatus: string;
  }[];
}

export interface SectionUI {
  sectionName?: string;
  sectionTime?: number;
  questionList: Question[];
}

export interface TestData {
  courseId: number;
  testId: string;
  testName: string;
  testType: number;
  testOption: number;
  totalTime: number;
  remainingTime: number;
  lastQuestionIndex?: number;
  sectionLock: string;
  modelTestId?: string;
  bloom?: number;
  subject?: string;
  scheduleId?: string;
  notAnsweredCount?: number;
  incorrectCount?: number;
  correctCount?: number;
  noQuestionAttempt?: number;
  testStatus?: number;
  sectionSet: Section[];
  questionSet: Question[];
}

export interface Pointer {
  sectionPos: number | -1;
  questionPos: number | -1;
}

export enum QuestionStatus {
  NOT_ATTEMPTED = "not_attempted",
  ATTEMPTED = "attempted",
  NOT_VISITED = "not_visited",
  VISITED = "visited",
  MARKED_FOR_REVIEW = "marked_for_review",
  ANSWERED_AND_REVIEW = "answered_and_review",
  HELP = "help",
}

export const QuestionStatusMap: Record<string, QuestionStatus> = {
  "url('./not-visited.png')": QuestionStatus.NOT_VISITED,
  "url('./not-answered.png')": QuestionStatus.NOT_ATTEMPTED,
  "url('./review.png')": QuestionStatus.MARKED_FOR_REVIEW,
  "url('./answered.png')": QuestionStatus.ATTEMPTED,
  "url('./answered-review.png')": QuestionStatus.ANSWERED_AND_REVIEW,
};

export const QuestionStatusReverseMap: Record<string, string> = {
  [QuestionStatus.NOT_VISITED]: "url('./not-visited.png')",
  [QuestionStatus.NOT_ATTEMPTED]: "url('./not-answered.png')",
  [QuestionStatus.MARKED_FOR_REVIEW]: "url('./review.png')",
  [QuestionStatus.ATTEMPTED]: "url('./answered.png')",
  [QuestionStatus.ANSWERED_AND_REVIEW]: "url('./answered-review.png')",
};

export type QuestionType =
  | "Multiple Choice"
  | "Multiple Choice (5)"
  | "MC Assertion Reason"
  | "MC Matching Type"
  | "Selection Type"
  | "Integer Type"
  | "Multiple Response"
  | "MR Matching Type"
  | "Common Data"
  | "Common Data (5)"
  | "True False"
  | "Fill in Blank"
  | "Subjective Type Very Short"
  | "Subjective Type Short Answer I"
  | "Subjective Type Short Answer II"
  | "Subjective Type Long";

export type SearchFlag = "Topic" | "Keyword";
export type ExamType = "objective" | "subjective";
export type AssessmentMode = "beginner" | "advance";
export type PackTypeTitle = "FREE" | "PRO" | "ACE";

export interface TestConfig {
  templateId?: number;
  testId?: string;
  testType?: number;
  testSession?: string;
  testUid?: string;
  classTestId?: string;
  questionType?: QuestionType;
  totalQuestion?: number;
  totalTime?: number;
  marksCorrectAnswer?: number;
  marksIncorrectAnswer?: number;
  marksNotAttempted?: number;
  searchFlag?: SearchFlag;
  searchQuery?: string;
  topicId?: number;
  examType?: ExamType;
  utmSource?: string;
  courseId?: number;
  courseUrl?: string;
  assessmentMode?: AssessmentMode;
  packTypeTitle?: PackTypeTitle;
}

export interface TestSubmitRequest {
  courseId: number;
  templateId: number;
  packTypeId: number;
  packTypeTitle: PackTypeTitle;
  testId: string;
  modelTestId?: string;
  testType: number;
  testOption: number;
  testMode: string;
  totalTime: number;
  remainingTime: number;
  totalQuestion: number;
  testTitle: string;
  bloom: number;
  questionSet: {
    questionId: number;
    itemId?: number;
    sectionId?: number;
    sectionName?: string;
    topicId: number;
    timeSpent: number;
    studentResponse?: string;
    correctAnswerMarks: number;
    incorrectAnswerMarks: number;
    notAnswerMarks: number;
    bloomId: number;
    noQuestionAttempt: number;
  }[];
  noQuestionAttempt: number;
  admissionNumber?: string;
  schoolId?: number;
  schoolName?: string;
  className?: string;
  subject?: string;
  scheduleId?: string;
  helpCounter: number;
}

export interface TestSubmitResponse {
  responseTxt: string;
  message: string;
  obj: {
    testSession: string;
    examType: ExamType;
    testMode: string;
    testType: number;
  };
}

export enum AIModalView {
  Main,
  AIContent,
  StudyMaterialContent,
}

export interface OpenAiSolution {
  solution: string;
  questionId: number;
}

export interface ContentType {
  id: number;
  contentTitle: string;
  contentType: string;
  contentUrl?: string;
  description: string;
  language?: string;
  links: LinkItem[];
}

export interface LinkItem {
  title: string;
  id: string;
  tag: string;
  children?: LinkItem[];
}

export type SimulatorMode = "guest" | "registered" | "review";
export interface Features {
  timerEnabled: boolean;
  correctResponseEnabled: boolean;
  showDynamicStatusEnabled: boolean;
  fullScreenEnabled: boolean;
}
