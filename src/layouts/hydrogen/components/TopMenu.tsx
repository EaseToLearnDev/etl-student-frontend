// React
import { Link, useLocation } from "react-router";
import { useLayoutEffect, useRef, useState } from "react";

// Hooks
import { useStudentStore } from "../../../features/shared/hooks/useStudentStore";

// Utils
import cn from "../../../utils/classNames";
import { getFilteredSubMenuItems } from "../../../utils/menuFilter";

// Components
import { menuItems } from "./MenuItems";

const TopMenu = () => {
  const location = useLocation();
  const activeCourse = useStudentStore((state) => state.activeCourse);
  const menuRef = useRef<HTMLDivElement>(null);
  const url = location.pathname;
  const page = url.split("/").filter(Boolean)[0];

  const match = menuItems.find((item) => item.href.includes(page));
  const permittedSubItems = getFilteredSubMenuItems(
    match?.id || "",
    activeCourse
  );

  const [indicatorStyle, setIndicatorStyle] = useState<{
    x?: number;
    scaleX?: number;
  }>({});

  // Find the current active submenu item
  const activeItem = permittedSubItems.find((item) => {
    const fullPath = `/${page}${item.href}`;
    return url === fullPath || url.startsWith(fullPath + "/");
  });
  const activeItemHref = activeItem ? `/${page}${activeItem.href}` : null;

  // Position indicator under active link
  useLayoutEffect(() => {
    if (!menuRef.current || !activeItemHref) return;
    const activeElement = menuRef.current.querySelector(
      `[data-href="${activeItemHref}"]`
    ) as HTMLElement | null;

    if (activeElement) {
      setIndicatorStyle({
        x: activeElement.offsetLeft,
        scaleX: activeElement.offsetWidth,
      });

      // Ensure active tab is visible
      activeElement.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeItemHref]);
  return (
    <div className="flex flex-col gap-2">
      {/* Page Title */}
      {!match?.hideTitle && (
        <h3 className="pl-2">{match?.name}</h3>
      )}
      {permittedSubItems.length ? (
        // Scrollable Tabs
        <div className="relative">
          <div
            ref={menuRef}
            className="relative flex gap-3 items-center border-b border-b-[var(--border-tertiary)] overflow-x-auto scrollbar-hide"
          >
            {/* Moving indicator */}
            <div
              className="absolute bottom-0 h-[2px] bg-[var(--sb-ocean-bg-active)] transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(${indicatorStyle.x || 0}px) scaleX(${
                  (indicatorStyle.scaleX || 1) / 100
                })`,
                width: "100px",
                transformOrigin: "left",
              }}
            />

            {/* Tabs */}
            {permittedSubItems.map((item) => {
              const fullPath = `/${page}${item.href}`;
              const isActive = activeItemHref === fullPath;

              return (
                <Link
                  key={item.href}
                  to={fullPath}
                  data-href={fullPath}
                  className={cn(
                    "flex gap-2 items-center px-2 py-4 cursor-pointer text-[var(--text-secondary)] rounded-md transition-colors duration-200 whitespace-nowrap",
                    isActive && "text-[var(--sb-ocean-bg-active)]"
                  )}
                >
                  <div className="w-[12px] h-[12px] aspect-square">
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TopMenu;
