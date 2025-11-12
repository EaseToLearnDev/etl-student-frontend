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
  markCorrectAns?: number;
  markIncorrectAns?: number;
  markNotAttempt?: number;
  questionType?: string;
  criteriaList?: CriteriaList[];
}

export interface CriteriaList {
  noOfQuestion: number;
  questionTypes: string;
  marksCorrectAns: number;
  marksIncorrectAns: number;
  marksNotAns: number;
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
  courses?: Course[];
  deviceType?: string;
}

export interface School {
  schoolName?: string;
  className?: string;
  schoolId?: number;
  classId?: number;
  admissionNumber?: string;
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
  adaptiveLearning?: number;
  adaptiveAssess?: number;
  mockTest: number;
  dynamicMockTest: number;
  classTest: number;
  teacherHelp: number;
  teacherHelpcourse: any;
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

export type TreeViewType = "topic" | "learning" | "mock" | "smart" | "test";

export interface CategoryType {
  categoryId: number;
  categoryName: string;
  coursesList: CourseType[];
}

export interface CourseType {
  courseId?: number;
  courseTitle?: string;
  courseSubTitle?: string;
  courseImageUrl?: string;
  categoryName?: string;
  image?: string;
  promoList?: any[];
  featuresList?: FeaturesList[];
  twoPriceList?: PriceList[];
  priceList?: PriceDetailsList[];
}

export interface PriceList {
  packType: string;
  list: PriceDetailsList[];
  index?: number;
}

export interface PriceDetailsList {
  courseId: number;
  description: string;
  discount: number;
  packId: number;
  retailPrice:
    | number
    | {
        source: string;
        parsedValue: number;
      };
  salePrice:
    | number
    | {
        source: string;
        parsedValue: number;
      };
  title: string;
  validityDate: string;
  validityDuration: number;
  validityType: number;
}

export interface FeaturesList {
  sectionType: string;
  list: SectionList[];
}

export interface SectionList {
  autoId: number;
  courseId: number;
  description: string;
  list: ChileSectionList[];
  sectionType: number;
  sequence: number;
  title: string;
}

export interface ChileSectionList {
  autoId: number;
  list: OptionalFlagsList[];
  title: string;
}

// For checking if course is purchased or not
export interface OptionalFlagsList {
  optionFlag: boolean;
  optionLabel: string;
}

export interface PrevRunningTest {
  responseTxt: string;
  testMode?: string;
  testName?: string;
  testSession?: string;
  testType?: number;
}

export interface InputFieldType {
  id: string;
  data: string;
  error: string;
}

export enum ToastType {
  SUCCESS = "success",
  DANGER = "danger",
  PRIMARY = "primary",
  WARNING = "warning",
  PATCH = "patch",
}

export interface ToastData {
  type?: ToastType;
  title: string;
  description?: string;
  button?: string;
  onClick?: () => void;
  duration?: number;
  redirect?: string;
}

export type Option<T> = T | null | undefined;

export type ModeType = "Learning Session" | "Competitive Session";
export interface TestOption {
  examType: "objective" | "subjective";
  duration: number;
  totalQuestions: number;
  totalQuestionsKwd: number;
  marksCorrectAns: number;
  marksIncorrectAns: number;
  marksNotAnswer: number;
  questionTypeList: string[];
}

export type TestOptions = TestOption[];