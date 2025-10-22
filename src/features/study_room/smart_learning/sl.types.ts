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