export interface TestLastReport {
  y: number;
  name: string;
  color: string;
}

export interface TestPerformance {
  y: number;
  color: string;
  testDetails: string;
}

export interface TestAccuracy {
  y: number;
  name: string;
  color: string;
}

export interface TestData {
  testType: string;
  testLastTopic: string;
  lastPerformance: string;
  testLastReport: TestLastReport[];
  testLastTestsY: TestPerformance[];
  testLastTestsX: string[];
  testAccuracy: TestAccuracy[];
}

export interface DashboardResponse {
  responseTxt: string;
  message: string;
  obj: TestData[];
}
