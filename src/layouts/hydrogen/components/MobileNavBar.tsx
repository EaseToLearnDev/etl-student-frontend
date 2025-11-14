// React
import { Link } from "react-router";

// Utils
import cn from "../../../utils/classNames";
import { getFilteredMenuItems } from "../../../utils/menuFilter";

// Hooks
import useIsMobile from "../../../hooks/useIsMobile";
import { useStudentStore } from "../../../features/shared/hooks/useStudentStore";
import useDarkModeStore from "../../../store/useDarkModeStore";

/**
 * Responsive bottom navigation bar for mobile and small screens.
 */
const MobileNavBar = () => {
  const isMobile = useIsMobile();
  const darkMode = useDarkModeStore((s) => s.darkMode);
  const activeCourse = useStudentStore((state) => state.activeCourse);
  const filteredMenuItems = getFilteredMenuItems(activeCourse);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-[var(--surface-bg-secondary)] xl:hidden py-1 px-2 border-t-2",
        darkMode ? "border-white/5" : "border-black/5"
      )}
    >
      <div
        className="w-full h-full sm:flex justify-center gap-2 sm:gap-4"
        style={
          isMobile
            ? {
                display: "grid",
                gridTemplateColumns: `repeat(${
                  filteredMenuItems.length || 5
                }, 1fr)`,
              }
            : {
                display: "flex",
              }
        }
      >
        {filteredMenuItems?.map((item) => {
          const isActive = location.pathname.includes(item?.href as string);

          return (
            <Link key={item.href} to={item.href}>
              {/* Design 1 */}
              {/* <div
          className={cn(
            "w-fit flex gap-1 items-center px-3 py-2 rounded-full",
            isActive ?  "bg-[var(--surface-bg-tertiary)]": ""
          )}
          >
          <div
            className={cn(
            "text-lg",
            isActive
              ? "text-[var(--text-primary)]"
              : "text-[var(--text-secondary)]"
            )}
          >
            {isActive ? item.icon : item.iconOutline}
          </div>
          {isActive && <div className="text-sm">{item.name}</div>}
          </div> */}

              {/* Design 2 */}
              <div
                className={cn(
                  "app-navbar-px-fix h-full sm:px-4 py-2 flex flex-col items-center gap-1",
                  isActive
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)]"
                )}
              >
                <div className="text-3xl">
                  {isActive ? item.icon : item.iconOutline}
                </div>
                <div className="text-[10px] leading-[12px] text-center text-nowrap">
                  {item.name}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavBar;
