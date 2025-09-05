import { create } from "zustand";
import type { TestData } from "../report.types";

interface ReportOveviewStore {
  overviewData: TestData[] | null;
  setOverviewData: (data: TestData[] | null) => void;

  reset: () => void;
}

export const useReportOverviewStore = create<ReportOveviewStore>((set) => ({
  overviewData: null,
  setOverviewData: (data) => set({ overviewData: data }),
  reset: () =>
    set({
      overviewData: null,
    }),
}));
