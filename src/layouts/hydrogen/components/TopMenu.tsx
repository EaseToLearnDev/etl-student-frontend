import { Link, useLocation } from "react-router";
import { menuItems } from "./MenuItems";
import cn from "../../../utils/classNames";
import { useStudentStore } from "../../../features/shared/store/useStudentStore";
import { getFilteredSubMenuItems } from "../../../utils/menuFilter";

/**
 * Renders the top navigation menu with permitted sub-menu items for the active course.
 */
const TopMenu = () => {
  const location = useLocation();
  const url = location.pathname;
  const page = url.split("/").filter(Boolean)[0];
  const match = menuItems.find((item) => item.href.includes(page));
  const activeCourse = useStudentStore((state) => state.getActiveCourse());

  const permittedSubItems = getFilteredSubMenuItems(
    match?.id || "",
    activeCourse
  );

  // Find the most specific menu item that matches the current URL
  let activeItemHref: string | null = null;
  let longestMatch = 0;

  permittedSubItems.forEach((item) => {
    const fullPath = `/${page}${item.href}`;
    // Check if current URL matches this menu item path and find the longest match
    if (
      (url === fullPath || url.startsWith(fullPath + "/")) &&
      fullPath.length > longestMatch
    ) {
      activeItemHref = item.href;
      longestMatch = fullPath.length;
    }
  });

  // Don't render if no permitted sub-items
  if (permittedSubItems.length === 0) return null;

  return (
    <div className="flex gap-3 items-center">
      {permittedSubItems?.map((item) => {
        const isActive = activeItemHref === item.href;
        return (
          <Link
            key={item?.href}
            to={page + item?.href}
            className={cn(
              "flex gap-2 items-center px-3 py-2 cursor-pointer",
              isActive ? "text-[var(--sb-ocean-bg-active)]" : ""
            )}
          >
            {item.icon}
            {item?.name}
          </Link>
        );
      })}
    </div>
  );
};

export default TopMenu;
