// React
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

// Icons
import { PiGearFill, PiSignOutBold } from "react-icons/pi";

// Components
import { menuItems } from "./MenuItems";

// Utils
import cn from "../../../utils/classNames";
import logout from "../../../utils/logout";

export function SidebarMenu() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full mt-4 pb-4 3xl:mt-6">
      <div className="flex-1">
        {menuItems.map((item, index) => {
          console.log("location:",location?.pathname);
          console.log("item-href:",item?.href);
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
      <div className="mt-auto">
        <Link
          to="/settings"
          className={cn(
            "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-4 font-medium capitalize 2xl:mx-5 hover:bg-[var(--surface-bg-secondary)]",
            location.pathname === "/settings"
              ? "text-[var(--sb-ocean-bg-active)] before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-[var(--sb-ocean-bg-active)] 2xl:before:-start-5"
              : "transition-colors duration-200 text-[var(--text-secondary)]"
          )}
        >
          <div className="flex items-center truncate">
            <p
              className={cn(
                "me-2 inline-flex size-5 items-center justify-center rounded-md [&>svg]:size-5",
                location.pathname === "/settings"
                  ? "text-[var(--sb-ocean-bg-active)]"
                  : "text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]"
              )}
            >
              <PiGearFill />
            </p>
            <p className="truncate">Settings</p>
          </div>
        </Link>
        <div
          onClick={logout}
          className={cn(
            "cursor-pointer group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-4 font-medium capitalize 2xl:mx-5 hover:bg-[var(--surface-bg-secondary)] text-[var(--text-secondary)]"
          )}
        >
          <div className="flex items-center truncate">
            <p className="me-2 inline-flex size-5 items-center justify-center rounded-md [&>svg]:size-5 text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]">
              <PiSignOutBold />
            </p>
            <p className="truncate">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
