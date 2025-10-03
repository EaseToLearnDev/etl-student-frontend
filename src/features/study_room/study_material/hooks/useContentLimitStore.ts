import type { ContentLimit, ContentType } from "../sm.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ContentCounterType {
  counter: number;
  courseId: number;
  contentIds: number[];
}
interface CountersType {
  // key = courseId
  PDF: Record<number, ContentCounterType>;
  PPT: Record<number, ContentCounterType>;
  Video: Record<number, ContentCounterType>;
  Text: Record<number, ContentCounterType>;
}
interface ContentLimitStore {
  isLimitReachedModalOpen: boolean;
  counters: CountersType;
  limits: ContentLimit;

  setIsLimitReachedmodalOpen: (v: boolean) => void;
  setLimits: (limits: Partial<ContentLimit>) => void;
  addOrUpdateCounter: (
    courseId: number,
    type: ContentType,
    contentId: number
  ) => void;
  resetCounters: () => void;
  reset: () => void;
}

export const useContentLimitStore = create<ContentLimitStore>()(
  persist(
    (set, get) => ({
      isLimitReachedModalOpen: false,
      limits: {
        pdfMax: 0,
        pptMax: 0,
        videoMax: 0,
        textMax: 0,
      },
      counters: {
        PDF: {},
        PPT: {},
        Text: {},
        Video: {},
      },

      setIsLimitReachedmodalOpen: (v) => set({ isLimitReachedModalOpen: v }),
      setLimits: (newLimits) =>
        set((state) => ({ limits: { ...state.limits, ...newLimits } })),

      addOrUpdateCounter: (courseId, type, contentId) =>
        set((state) => {
          const courseCounters = state.counters[type];
          const existing = courseCounters[courseId];

          if (!existing) {
            return {
              counters: {
                ...state.counters,
                [type]: {
                  ...courseCounters,
                  [courseId]: {
                    counter: 1,
                    courseId,
                    contentIds: [contentId],
                  },
                },
              },
            };
          }

          if (!existing.contentIds.includes(contentId)) {
            return {
              counters: {
                ...state.counters,
                [type]: {
                  ...courseCounters,
                  [courseId]: {
                    ...existing,
                    counter: existing.counter + 1,
                    contentIds: [...existing.contentIds, contentId],
                  },
                },
              },
            };
          }

          //   Already in counted list, no changes
          return state;
        }),

      resetCounters: () =>
        set({ counters: { PDF: {}, PPT: {}, Text: {}, Video: {} } }),
      reset: () => set({ isLimitReachedModalOpen: false }),
    }),
    { name: "content-limit-store" }
  )
);
