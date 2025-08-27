import { create } from "zustand";
import type { TestData } from "../report.types";

interface ReportOveviewStore {
  overviewData: TestData[] | null;
  setOverviewData: (data: TestData[] | null) => void;
}

export const useReportOverviewStore = create<ReportOveviewStore>((set) => ({
  overviewData: null,
  setOverviewData: (data) => set({ overviewData: data }),
}));
