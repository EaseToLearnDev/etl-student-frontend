// React
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

// Icons
// import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

// Store
import { useStudentStore } from "../../../features/shared/hooks/useStudentStore";

// Utils
import cn from "../../../utils/classNames";
import { getFilteredMenuItems } from "../../../utils/menuFilter";

// Components
// import SidebarDropdown from "./SidebarDropdown";

/**
 * Renders the sidebar menu with navigation links and user info for the student dashboard.
 */
export function SidebarMenu() {
  const location = useLocation();
  // const studentName = useStudentStore(
  //   (state) => state.studentData?.studentName
  // );
  // const emailId = useStudentStore((state) => state.studentData?.emailId);
  const activeCourse = useStudentStore((state) => state.activeCourse);

  const filteredMenuItems = getFilteredMenuItems(activeCourse);

  return (
    <div className="flex flex-col h-full mt-4 pb-4 3xl:mt-6">
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
      {/* Bottom section for Settings and Logout */}
      {/* <div className="mt-auto">
        <div className="flex w-full items-center justify-between px-4 py-2">
          <div className="flex gap-4">
            <div className="w-8 h-8 p-5 aspect-square bg-[var(--surface-bg-tertiary)] rounded-full flex justify-center items-center">
              <p className="!font-bold">
                {studentName?.split(" ")?.map((w) => w[0] || "")}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="!font-semibold block w-[140px] overflow-hidden text-ellipsis  whitespace-nowrap line-clamp-1">
                {studentName}
              </p>
              <span className="block w-[140px] overflow-hidden text-[var(--text-tertiary)] text-ellipsis whitespace-nowrap line-clamp-1">
                {emailId}
              </span>
            </div>
          </div>
          <SidebarDropdown>
            <div className="w-8 h-8 aspect-square rounded-full hover:bg-[var(--surface-bg-tertiary)] flex justify-center items-center cursor-pointer">
              <PiDotsThreeOutlineVerticalFill size={18} />
            </div>
          </SidebarDropdown>
        </div>
      </div> */}
    </div>
  );
}
