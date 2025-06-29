import { useState, type ReactElement, type RefObject } from "react";
import { AiFillNotification } from "react-icons/ai";
import { Popover, Text } from "rizzui";
import useIsMobile from "../../../hooks/useIsMobile";
import BrushSolidIcon from "../../../components/icons/brush-solid-icon";
const notificationsData = [
  {
    id: 1,
    name: "Invitation for crafting engaging designs",
    icon: BrushSolidIcon,
    unRead: true,
    sendTime: "2023-06-01T09:35:31.820Z",
  },
  {
    id: 2,
    name: "Isomorphic dashboard redesign",
    icon: BrushSolidIcon,
    unRead: true,
    sendTime: "2023-05-30T09:35:31.820Z",
  },
  {
    id: 3,
    name: "3 New Incoming Project Files:",
    icon: BrushSolidIcon,
    unRead: false,
    sendTime: "2023-06-01T09:35:31.820Z",
  },
];
function NotificationsList({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="w-[320px] text-left sm:w-[360px] 2xl:w-[420px] rtl:text-right">
      <div className="mb-3 flex items-center justify-between ps-6">
        <h5 className="font-semibold text-[var(--text-primary)]">
          Notifications
        </h5>
      </div>
      <div className="custom-scrollbar max-h-[420px] overflow-y-auto scroll-smooth">
        <div className="grid cursor-pointer grid-cols-1 gap-1 ps-4">
          {notificationsData.map((item) => (
            <div
              key={item.name + item.id}
              className="group grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md px-2 py-2 pe-3 transition-colors hover:bg-[var(--surface-bg-primary)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded bg-[var(--surface-bg-primary)] p-1 [&>svg]:h-auto [&>svg]:w-5">
                <AiFillNotification className="text-[var(--text-secondary)]" />
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                <div className="w-full">
                  <Text className="mb-0.5 w-11/12 truncate text-sm font-semibold text-[var(--text-primary)]">
                    {item.name}
                  </Text>
                  <Text className="ms-auto whitespace-nowrap pe-8 !text-xs text-[var(--text-tertiary)]">
                    MAR 02-2024
                  </Text>
                </div>
                <div className="ms-auto flex-shrink-0">
                  {item.unRead && (
                    <span className="inline-block rounded-full bg-blue-500 p-0.5  w-[12px] h-[12px]"></span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <a
        href={"#"}
        onClick={() => setIsOpen(false)}
        className="-me-6 block px-6 pb-0.5 pt-3 text-center hover:underline text-[var(--text-tertiary)]"
      >
        View All Activity
      </a>
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
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement={isMobile ? "bottom" : "bottom-end"}
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="z-[9999] px-0 pb-4 pe-6 pt-5 dark:bg-[var(--surface-bg-secondary)] [&>svg]:hidden [&>svg]:dark:fill-[var(--surface-bg-secondary)] sm:[&>svg]:inline-flex">
        <NotificationsList setIsOpen={setIsOpen} />
      </Popover.Content>
    </Popover>
  );
}
