export interface Response {
  responseId: string;
  responseText: string;
}

export interface Question {
  questionId: number;
  questionDisplayId: string;
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
}

export interface Section {
  sectionName?: string;
  questionNumbers: {
    questionIndex: number;
    questionId: number;
    answerStatus: string;
  }[];
}

export interface SectionUI {
  sectionName?: string;
  questionList: Question[];
}

export interface TestData {
  testId: string;
  testName: string;
  testType: number
  testOption: number;
  totalTime: number;
  remainingTime: number;
  lastQuestionIndex?: number;
  sectionLock: string;
  bloom: number;

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