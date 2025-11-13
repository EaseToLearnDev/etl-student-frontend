import type { Course } from "../features/shared/types";
import { menuItems } from "../layouts/hydrogen/components/MenuItems";

/**
 * Filters main menu items based on the active course and static status.
 */
export const getFilteredMenuItems = (activeCourse: Course | null) => {
  if (!activeCourse) return [];

  return menuItems.filter((item) => {
    // Always show static items
    if (item.static) {
      return getFilteredSubMenuItems(item.id, activeCourse).length > 0;
    };

    // For non-static items, check tabs
    return activeCourse.tabs[item.id];
  });
};

/**
 * Filters submenu items under a parent menu item based on the active course.
 */
export const getFilteredSubMenuItems = (
  parentId: string,
  activeCourse: Course | null
) => {
  if (!activeCourse) return [];

  const parentItem = menuItems.find((item) => item.id === parentId);
  if (!parentItem?.menuItems) return [];

  // Special case: Report tabs
  if (parentId === "report" && activeCourse.tabs["report"]) {
    return parentItem.menuItems.filter((subItem) => {
      switch (subItem.id) {
        // Always show overview if report is enabled
        case "reportOverview":
          return true;

        case "reportLearning":
        case "reportCompetitive":
          return !!activeCourse.tabs["selfTest"];

        case "reportTopicTest":
          return !!activeCourse.tabs["topicTest"];

        case "reportMockTest":
          return !!activeCourse.tabs["mockTest"];

        case "reportClassTest":
          return !!activeCourse.tabs["classTest"];

        default:
          return false;
      }
    });
  }

  // Default case: filter by tab id directly
  return parentItem.menuItems.filter(
    (subItem) => activeCourse.tabs[subItem.id]
  );
};
