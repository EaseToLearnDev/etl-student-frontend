export type TopicType = {
  topicId: number;
  questionCount?: number;
  subjectiveCount?: number;
  topicName: string;
  pathIds: string;
  children: TopicType[];
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

export interface StudentDataResponseType {
  openedCourse: number;
  firstTimeUser: number;
  websiteId: number;
  studentId: number;
  token: string;
  studentName: string;
  emailId: string;
  phoneNo: string;
  status: string;
  loginId: string;
  schools: SchoolType[];
  courses: CourseResponseType[];
}

export interface StudentDataType {
  openedCourse: number;
  firstTimeUser: number;
  websiteId: number;
  studentId: number;
  token: string;
  studentName: string;
  emailId: string;
  phoneNo: string;
  status: string;
  loginId: string;
  schools: SchoolType[];
  courses: CourseType[];
}

export interface SchoolType {
  schoolName: string;
  className: string;
  schoolId: number;
  classId: number;
}

export interface CourseType {
  templateId: number;
  validityId: number;
  courseId: number;
  packTypeId: number;
  benchmark: number;
  organisationName: string;
  validTillDate: string;
  packTypeTitle: string;
  tabs: Record<string, boolean>;
}

export interface CourseResponseType {
  templateId: number;
  validityId: number;
  courseId: number;
  packTypeId: number;
  benchmark: number;
  organisationName: string;
  validTillDate: string;
  packTypeTitle: string;
  dashboard: number;
  report: number;
  studyMaterial: number;
  selfTest: number;
  topicTest: number;
  mockTest: number;
  dynamicMockTest: number;
  classTest: number;
  teacherHelp: number;
  tonyHelp: number;
  otherCourses: number;
}

export enum Severity {
  None = "none",
  Normal = "normal",
  Warning = "warning",
  Alert = "alert",
}
export interface ErrorType {
  severity: Severity;
  message: string;
}

export type TreeViewType = "topic" | "learning" | "mock" | "smart" | "test";
