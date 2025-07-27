import { Link, useLocation } from "react-router";
import { menuItems } from "./MenuItems";
import cn from "../../../utils/classNames";

const TopMenu = () => {
  const location = useLocation();
  const url = location.pathname;
  const page = url.split("/").filter(Boolean)[0];
  const match = menuItems.find((item) => item.href.includes(page));

  // Find the most specific menu item that matches the current URL
  let activeItemHref: string | null = null;
  let longestMatch = 0;

  match?.menuItems?.forEach((item) => {
    const fullPath = `/${page}${item.href}`;
    if (
      (url === fullPath || url.startsWith(fullPath + "/")) &&
      fullPath.length > longestMatch
    ) {
      activeItemHref = item.href;
      longestMatch = fullPath.length;
    }
  });

  return (
    <div className="flex gap-3 items-center">
      {match?.menuItems?.map((item) => {
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
