// React
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

// Rizz UI
import { Title } from "rizzui/typography";
import { Collapse } from "rizzui/collapse";

// Icons
import { PiCaretDownBold, PiGearFill, PiSignOutBold } from "react-icons/pi";

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
          const isActive = location.pathname.includes(item?.href as string);
          const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
            (dropdownItem) => dropdownItem.href === location.pathname
          );
          const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

          return (
            <Fragment key={item.name + "-" + index}>
              {item?.href ? (
                <>
                  {item?.dropdownItems ? (
                    <Collapse
                      defaultOpen={isDropdownOpen}
                      header={({ open, toggle }) => (
                        <div
                          onClick={toggle}
                          className={cn(
                            "group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-4 font-medium lg:my-1 2xl:mx-5 2xl:my-2 hover:bg-[var(--surface-bg-secondary)]",
                            isDropdownOpen
                              ? "text-[var(--sb-ocean-bg-active)] before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-[var(--sb-ocean-bg-active)] 2xl:before:-start-5"
                              : "text-[var(--text-primary)] transition-colors duration-200"
                          )}
                        >
                          <p className="flex items-center">
                            {item?.icon && (
                              <p
                                className={cn(
                                  "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                                  isDropdownOpen
                                    ? "text-[var(--sb-ocean-bg-active)]"
                                    : "text-[var(--text-tertiary)]  group-hover:text-[var(--text-primary)]"
                                )}
                              >
                                {item?.icon}
                              </p>
                            )}
                            {item.name}
                          </p>

                          <PiCaretDownBold
                            strokeWidth={3}
                            className={cn(
                              "h-3.5 w-3.5 -rotate-90 text-[var(--text-tertiary)] transition-transform duration-200 rtl:rotate-90",
                              open && "rotate-0 rtl:rotate-0"
                            )}
                          />
                        </div>
                      )}
                    >
                      {item?.dropdownItems?.map((dropdownItem, index) => {
                        const isChildActive =
                          location.pathname.includes(dropdownItem?.href as string);

                        return (
                          <Link
                            to={dropdownItem?.href}
                            key={dropdownItem?.name + index}
                            className={cn(
                              "mx-3.5 mb-2 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5 hover:bg-[var(--surface-bg-secondary)]",
                              isChildActive
                                ? "text-[var(--sb-ocean-bg-active)]"
                                : "text-[var(--text-secondary)] transition-colors duration-200"
                            )}
                          >
                            <div className="flex items-center truncate">
                              <p
                                className={cn(
                                  "me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200",
                                  isChildActive
                                    ? "bg-[var(--sb-ocean-bg-active)] ring-[1px] ring-[var(--sb-ocean-bg-active)]"
                                    : "opacity-40"
                                )}
                              />{" "}
                              <p className="truncate">
                                {dropdownItem?.name}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </Collapse>
                  ) : (
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
                  )}
                </>
              ) : (
                <Title
                  as="h6"
                  className={cn(
                    "mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8",
                    index !== 0 && "mt-6 3xl:mt-7"
                  )}
                >
                  {item.name}
                </Title>
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
