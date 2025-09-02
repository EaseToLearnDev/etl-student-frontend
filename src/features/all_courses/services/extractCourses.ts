import type { CategoryType } from "../../shared/types";

/**
 * Flattens an array of categories into a single array of courses, each enriched with its category information.
 */
export const extractCourses = (data: CategoryType[]) => {
  return (
    data?.flatMap((category) =>
      category.coursesList.map((course) => ({
        ...course,
        categoryName: category.categoryName,
        categoryId: category.categoryId,
      }))
    ) || []
  );
};
