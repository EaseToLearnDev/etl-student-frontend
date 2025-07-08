import { Link, useLocation } from "react-router";
import { menuItems } from "./MenuItems";
import cn from "../../../utils/classNames";

const TopMenu = () => {
  const location = useLocation();
  const url = location.pathname;
  const page = url.split("/").filter(Boolean)[0];
  const match = menuItems.find((item) => item.href.includes(page));

  return (
    <div className="flex gap-4 items-center">
      {match?.menuItems?.map((item) => (
        <Link
          to={page + item?.href}
          className={cn(
            "flex gap-2 items-center px-3 py-2 cursor-pointer",
            url.includes(item?.href) ? "text-[var(--sb-ocean-bg-active)]" : null
          )}
        >
          {item.icon}
          {item?.name}
        </Link>
      ))}
    </div>
  );
};

export default TopMenu;
