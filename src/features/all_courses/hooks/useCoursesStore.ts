import { create } from "zustand";

// Types
import type { CategoryType, CourseType, PriceList } from "../../shared/types";

interface CoursesState {
  search: string;
  setSearch: (search: string) => void;

  isPlanModalOpen: boolean;
  setIsPlanModalOpen: (v: boolean) => void;

  isUpdateEmailModalOpen: boolean;
  setIsUpdateEmailModalOpen: (v: boolean) => void;

  courseList: CourseType[] | null;
  setCourseList: (courses: CourseType[]) => void;

  categoryList: CategoryType[] | null;
  setCategoryList: (categories: CategoryType[]) => void;

  selectedCategory: CategoryType | null;
  setSelectedCategory: (category: CategoryType | null) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  selectedCourse: CourseType | null;
  setSelectedCourse: (course: CourseType | null) => void;

  payableAmount: number | null;
  setPayableAmount: (i: number | null) => void;

  // PlanBody states
  selectedTabIndex: number;
  setSelectedTabIndex: (i: number) => void;

  code: string;
  setCode: (c: string) => void;

  applied: boolean;
  setApplied: (v: boolean) => void;

  selectedPlanId: number | null;
  setSelectedPlanId: (id: number | null) => void;

  selPriceList: PriceList[];
  setSelPriceList: (list: PriceList[]) => void;

  error: boolean;
  setError: (v: boolean) => void;

  reset: () => void;
}

export const useCoursesStore = create<CoursesState>((set) => ({
  search: "",
  courseList: null,
  categoryList: null,
  selectedCategory: null,
  loading: false,
  selectedCourse: null,
  isPlanModalOpen: false,
  isUpdateEmailModalOpen: false,

  setSearch: (search) => set({ search }),

  setIsPlanModalOpen: (v) => set({ isPlanModalOpen: v }),

  setIsUpdateEmailModalOpen: (v) => set({ isUpdateEmailModalOpen: v }),

  setCourseList: (courses) => set({ courseList: courses }),

  setCategoryList: (categories) => set({ categoryList: categories }),

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setLoading: (loading) => set({ loading }),

  setSelectedCourse: (course) => set({ selectedCourse: course }),
  selectedTabIndex: 1,
  setSelectedTabIndex: (i) => set({ selectedTabIndex: i }),

  payableAmount: null,
  setPayableAmount: (i) => set({ payableAmount: i }),

  code: "",
  setCode: (c) => set({ code: c }),

  applied: false,
  setApplied: (v) => set({ applied: v }),

  selectedPlanId: null,
  setSelectedPlanId: (id) => set({ selectedPlanId: id }),

  selPriceList: [],
  setSelPriceList: (list) => set({ selPriceList: list }),

  error: false,
  setError: (v) => set({ error: v }),

  reset: () =>
    set({
      search: "",
      courseList: null,
      categoryList: null,
      selectedCategory: null,
      loading: false,
      selectedCourse: null,
      isPlanModalOpen: false,
      payableAmount: null,
    }),
}));
