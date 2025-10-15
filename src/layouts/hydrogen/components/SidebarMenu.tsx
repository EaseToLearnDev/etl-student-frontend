// React
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

// Icons
import { MdChevronRight } from "react-icons/md";
import AiIcon from "../../../components/icons/ai-icon";

// Store
import { useStudentStore } from "../../../features/shared/hooks/useStudentStore";
import useReleaseNotesStore from "../../../global/hooks/useReleaseNotesStore";

// Utils
import cn from "../../../utils/classNames";
import { getFilteredMenuItems } from "../../../utils/menuFilter";
import Badge from "../../../components/Badge";
import { Theme } from "../../../utils/colors";
import useDrawerStore from "../../../store/useDrawerStore";

/**
 * Renders the sidebar menu with navigation links and user info for the student dashboard.
 */
export function SidebarMenu() {
  const location = useLocation();
  const activeCourse = useStudentStore((state) => state.activeCourse);
  const setIsReleaseNotesModalOpen = useReleaseNotesStore(
    (s) => s.setIsReleaseNotesModalOpen
  );
  const closeDrawer = useDrawerStore((state) => state.closeDrawer);

  const filteredMenuItems = getFilteredMenuItems(activeCourse);

  return (
    <div className="flex flex-col mt-4 pb-4 h-full 3xl:mt-6">
      <div className="flex-1">
        {filteredMenuItems.map((item, index) => {
          const isActive = location.pathname.includes(item?.href as string);

          return (
            <Fragment key={item.name + "-" + index}>
              {item?.href ? (
                <Link
                  to={item?.href}
                  className={cn(
                    "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-4 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2 hover:bg-[var(--surface-bg-secondary)]",
                    isActive
                      ? "text-[var(--sb-ocean-bg-active)] before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-[var(--sb-ocean-bg-active)] 2xl:before:-start-5"
                      : "transition-colors duration-200 text-[var(--text-secondary)]"
                  )}
                >
                  <div className="flex items-center truncate">
                    {item?.icon && (
                      <p
                        className={cn(
                          "me-2 inline-flex size-5 items-center justify-center rounded-md [&>svg]:size-5",
                          isActive
                            ? "text-[var(--sb-ocean-bg-active)]"
                            : "text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]"
                        )}
                      >
                        {item?.icon}
                      </p>
                    )}
                    <p className="truncate">{item.name}</p>
                  </div>
                </Link>
              ) : (
                <h6
                  className={cn(
                    "mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8",
                    index !== 0 && "mt-6 3xl:mt-7"
                  )}
                >
                  {item.name}
                </h6>
              )}
            </Fragment>
          );
        })}
      </div>
      {/* Bottom section  */}

      {/* What's New Card */}
      <div className="mt-auto mb-2">
        <div className="px-4 w-full">
          <div
            className="w-full h-full p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg cursor-pointer"
            onClick={() => {
              setIsReleaseNotesModalOpen(true);
              closeDrawer();
            }}
          >
            {/* card header */}
            <div className="text-white flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AiIcon fontSize={16} />
                <h6 className="font-semibold">What's New</h6>
              </div>
              <Badge
                className="w-fit !px-2 !py-1 !text-white !border-white"
                style="outline"
                theme={Theme.Neutral}
              >
                <span>BETA</span>
              </Badge>
            </div>
            <p className="text-neutral-100 mt-2 mb-1">
              Discover the latest features and improvements
            </p>
            <span className="text-white font-semibold">
              Version v1.0.0 Available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
