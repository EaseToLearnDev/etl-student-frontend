export type Topic = {
  topicId: number;
  questionCount?: number;
  subjectiveCount?: number;
  topicName: string;
  pathIds: string;
  children: Topic[];
};

export type Test = {
  testName: string;
  testUrl: string;
  testTime: number;
  questions: number;
  totalMarks: number;
  difficulty: string;
  progress: "not_started" | "in_progress";
  marks?: number;
};

export interface MockTestCategory {
  categoryId: number;
  categoryName: string;
  testList: MockTest[];
}

export interface MockTest {
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
  sectionSet?: MockSection[];
  difficulty?: string;
  marks?: number;
}

export interface MockSection {
  sectionId: number;
  sectionName: string;
  questionRange: string;
  correctMarks: number;
  incorrectMarks: number;
  notAnswerMarks: number;
  totalTime: number;
  noQuestionAttempt: number;
}

export interface TopicTestResponse {
  responseTxt: string;
  message: string;
  obj: TopicTest[];
}

export interface TopicTest {
  mockTestTitle: string;
  mockTestId: number;
  topicId: number;
  patternDetails: PatternDetails;
}
export interface PatternDetails {
  totalQuestion: number;
  totalTime: number;
  totalMark: number;
  markCorrectAns: number;
  markIncorrectAns: number;
  markNotAttempt: number;
  questionType: string;
}

export interface StudentDataResponse {
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
  profilePic: string;
  deleteFlag: number;
  schools: School[];
  courses: CourseResponse[];
}

export interface StudentData {
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
  profilePic: string;
  deleteFlag: number;
  schools: School[];
  courses: Course[];
}

export interface School {
  schoolName: string;
  className: string;
  schoolId: number;
  classId: number;
}

export interface Course {
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

export interface CourseResponse {
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
  Info = "info", // for success and information
  Warning = "warning", // warnings and invalid input fields
  Alert = "alert", // error messages
  Fatal = "fatal", // only for log out
}
export interface Error {
  severity: Severity;
  message: string;
  id?: string;
}

export type TreeView = "topic" | "learning" | "mock" | "smart" | "test";

export interface PrevRunningTest {
  responseTxt: string;
  testMode?: string;
  testName?: string;
  testSession?: string;
  testType?: number;
}
