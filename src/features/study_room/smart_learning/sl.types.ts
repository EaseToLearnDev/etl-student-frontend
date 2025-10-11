export type ModeType = "Learning Session" | "Competitive Session";

export interface TestOptions {
  totalQuestion: number;
  totalTime: number;
  marksCorrectAns: number;
  marksIncorrectAns: number;
  marksNotAttempted: number;
  questionTypeList: string[];
}