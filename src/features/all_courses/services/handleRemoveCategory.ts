import type { CategoryType } from "../../shared/types";

export const handleRemoveCategory = (
  categoryList: CategoryType[],
  target: CategoryType
) => {
  return (
    categoryList?.filter((cat) => cat.categoryId === target.categoryId) ?? []
  );
};
