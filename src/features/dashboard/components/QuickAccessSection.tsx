import { Link } from "react-router";
import { menuItems } from "../../../layouts/hydrogen/components/MenuItems";
import {
  getFilteredMenuItems,
  getFilteredSubMenuItems,
} from "../../../utils/menuFilter";
import WidgetCard from "../../report/components/newreports/WidgetCard";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import type { DashBoardFilterMenuList } from "../dashboard.types";
import { GoArrowUpRight } from "react-icons/go";

const QuickAccessSection = () => {
  const activeCourse = useStudentStore((state) => state.activeCourse);
  const menus = getFilteredMenuItems(activeCourse);

  const filterMenu: DashBoardFilterMenuList[] = [
    // Add parentId manually for submenu items
    ...menuItems.flatMap((item) =>
      getFilteredSubMenuItems(item.id, activeCourse).map((subItem) => ({
        ...subItem,
        parentId: item.id,
        parentHref: item.href,
      }))
    ),

    // Top-level menus like Report or Other Courses
    ...menus.filter(
      (item: DashBoardFilterMenuList) =>
        item.id === "report" || item.id === "otherCourses"
    ),
  ];

  return (
    <WidgetCard title="Quick Access Links">
      <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
        {filterMenu.map((item) => (
          <Link
            key={item.href}
            to={item.parentHref ? `${item.parentHref}/${item.href}` : item.href}
            className="border border-[var(--border-secondary)] px-3 py-2 rounded-lg flex items-center gap-1"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </WidgetCard>
  );
};

export default QuickAccessSection;
