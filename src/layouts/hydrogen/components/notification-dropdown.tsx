import { useState, type ReactElement, type RefObject } from "react";
import { AiFillNotification } from "react-icons/ai";
import useIsMobile from "../../../hooks/useIsMobile";
import { Popover } from "../../../components/Popover/Popover";
import { PopoverTrigger } from "../../../components/Popover/PopoverTrigger";
import { PopoverContent } from "../../../components/Popover/PopoverContent";
import { FaBoxOpen } from "react-icons/fa";
import useNotificationStore from "../../../global/hooks/useNotificationStore";

function NotificationsList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const notifications = useNotificationStore((state) => state.notifcations);
  return (
    <div className="w-[320px] text-left sm:w-[360px] 2xl:w-[420px] rtl:text-right">
      <div className="mb-3 flex items-center justify-between ps-6">
        <h5 className="font-semibold text-[var(--text-primary)]">
          Notifications
        </h5>
      </div>
      <div className="custom-scrollbar max-h-[420px] min-h-[100px] w-full flex overflow-y-auto scroll-smooth">
        <div className="w-full h-full grid grid-cols-1 gap-1 ps-4">
          {notifications && notifications?.length > 0 ? (
            notifications?.map((item, index) => (
              <div
                onClick={() => setIsOpen(false)}
                key={index}
                className="h-full group cursor-pointer grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2 pe-3 transition-colors hover:bg-[var(--surface-bg-tertiary)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded bg-[var(--surface-bg-primary)] p-1 [&>svg]:h-auto [&>svg]:w-5">
                  <AiFillNotification className="text-[var(--text-secondary)]" />
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                  <p className="text-[var(--text-tertiary)] text-ellipsis line-clamp-2">
                    {item}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full min-h-[100px] flex flex-col gap-2 justify-center items-center text-[var(--text-tertiary)]">
              <FaBoxOpen size={40} />
              <p>You have no unread messages!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NotificationDropdown({
  children,
}: {
  children: ReactElement & { ref?: RefObject<any> };
}) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      open={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement={isMobile ? "bottom" : "bottom-end"}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="z-[9999] px-0 pb-4 pe-6 pt-5 bg-[var(--surface-bg-secondary)] [&>svg]:hidden [&>svg]:dark:fill-[var(--surface-bg-secondary)] sm:[&>svg]:inline-flex">
        <NotificationsList setIsOpen={setIsOpen} />
      </PopoverContent>
    </Popover>
  );
}
