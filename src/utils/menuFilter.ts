import type { CourseType } from "../features/shared/types";
import { menuItems } from "../layouts/hydrogen/components/MenuItems";

/**
 * Filters main menu items based on the active course and static status.
 */
export const getFilteredMenuItems = (activeCourse: CourseType | null) => {
  if (!activeCourse) return [];

  return menuItems.filter((item) => {
    // Always show static items
    if (item.static) return true;

    // For non-static items, check tabs
    return activeCourse.tabs[item.id];
  });
};

/**
 * Filters submenu items under a parent menu item based on the active course.
 */
export const getFilteredSubMenuItems = (
  parentId: string,
  activeCourse: CourseType | null
) => {
  if (!activeCourse) return [];

  const parentItem = menuItems.find((item) => item.id === parentId);
  if (!parentItem?.menuItems) return [];

  return parentItem.menuItems.filter(
    (subItem) => activeCourse.tabs[subItem.id]
  );
};
