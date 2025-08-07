export type ModeType = "learning" | "competitive";

export interface PreviousRunningTestType {
  responseTxt: string;
  testMode?: string;
  testName?: string;
  testSession?: string;
  testType?: number;
}
