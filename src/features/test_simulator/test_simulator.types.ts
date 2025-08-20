export interface Response {
  responseId: string;
  responseText: string;
}

export interface Question {
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
  responseChoice: Response[];
  backgroundImg?: string;
  cssName?: string;
  noQuestionAttempt?: number;
  noQuestion: number;
  studentResponse?: Response;
}

export interface Section {
  sectionName: string;
  questionNumbers: {
    questionIndex: number;
    questionId: number;
  }[];
}

export interface SectionUI {
  sectionName: string;
  questionList: Question[];
}

export interface TestData {
  testId: number;
  testName: string;
  testType: number;
  testOption: number;
  totalTime: number;
  noQuestionAttempt: number;
  remainingTime: number;
  lastQuestionIndex: number;
  sectionLock: string;
  bloom: number;
  sectionSet: Section[];
  questionSet: Question[];
}

export interface CurrentPointer {
  currentSectionPos: number | -1;
  currentQuestionPos: number | -1;
}

export enum QuestionStatus {
  NOT_ATTEMPTED = "not_attempted",
  ATTEMPTED = "attempted",
  NOT_VISITED = "not_visited",
  VISITED = "visited",
  MARKED_FOR_REVIEW = "marked_for_review",
  HELP = "help",
}

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
  testId: number;
  testType: number;
  testSession?: string;
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
  assessmentMode?: AssessmentMode;
  packTypeTitle?: PackTypeTitle;
}

export interface TestSubmitRequest {
  courseId: number;
  templateId: number;
  packTypeId: number;
  packTypeTitle: PackTypeTitle;
  testId: number;
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
    topicId: string;
    timeSpent: number;
    studentResponse?: string;
    correctAnswerMarks: number;
    incorrectAnswerMarks: number;
    notAnswerMarks: number;
    bloomId: number;
    noQuestionAttempt: number;
  }[];
  noQuestionAttempt: number;
  schoolId: number;
  schoolName: string;
  className: string;
  helpCounter: number;
}

export interface TestStopRequest {
  courseId: number;
  templateId: number;
  testName: string;
  testType: number;
  testId: number;
  testDetail: {
    testId: number;
    testName: string;
    testType: number;
    testOption: number;
    totalTime: number;
    remainingTime: number;
    lastQuestionIndex: number;
    sectionLock: string;
    bloom: number;
    sectionSet: Section[];
    questionSet: Question[];
  }[];
  helpCounter: number;
  testMode: string;
}
