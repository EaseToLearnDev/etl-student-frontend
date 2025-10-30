// React
import { useState } from "react";
// ICons
import { PiCaretUpBold } from "react-icons/pi";

// Utils
import cn from "../../../utils/classNames";

// Hooks
import useIsMobile from "../../../hooks/useIsMobile";

interface TopicProps<T> {
  topic: T;
  activeTopic?: T | null;
  onClickHandler?: (topic: T) => void;
  getId: (topic: T) => number;
  getLabel: (topic: T) => string;
  getChildren?: (topic: T) => T[] | undefined;
  renderRightSection?: (topic: T, isActive: boolean) => React.ReactNode;
  level?: number; // added for depth tracking
}

const Topic = <T,>({
  topic,
  activeTopic,
  onClickHandler,
  getId,
  getLabel,
  getChildren,
  renderRightSection,
  level = 0,
}: TopicProps<T>) => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleSelect = () => {
    onClickHandler?.(topic);
  };
  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  const isActive = activeTopic
    ? getId(activeTopic as T) === getId(topic)
    : false;
  const children = getChildren?.(topic);

  return (
    <div
      className={cn(
        "mt-2",
        level > 0 ? (isMobile ? "ml-[20px]" : "ml-[40px]") : "" // only add margin if not root
      )}
    >
      <div
        onClick={handleSelect}
        className={cn(
          "p-2 flex items-center justify-between cursor-pointer",
          isActive
            ? "bg-[var(--surface-bg-secondary)] rounded-md"
            : "bg-[var(--surface-bg-primary)]"
        )}
      >
        <div className="flex items-center gap-3">
          {/* Dot (Leaf) */}
          {!children?.length ? (
            <div
              className={cn(
                "w-[8px] h-[8px] ml-2 aspect-square rounded-full",
                isActive
                  ? "bg-[var(--sb-ocean-bg-active)]"
                  : "bg-[var(--text-tertiary)]"
              )}
            />
          ) : (
            <>
              {/* Expand Button */}
              <div
                onClick={handleExpand}
                className={cn(
                  "w-[24px] h-[24px] aspect-square flex justify-center items-center rounded-md cursor-pointer",
                  children?.length ? "visible" : "invisible",
                  isActive
                    ? "border-1 border-[var(--sb-ocean-bg-active)]"
                    : "border-1 border-[var(--border-secondary)] hover:bg-[var(--surface-bg-secondary)]"
                )}
              >
                <PiCaretUpBold
                  size={18}
                  className={cn(
                    "h-3.5 w-3.5 rotate-90 text-[var(--text-tertiary)] transition-transform duration-200 rtl:-rotate-90",
                    expanded && "rotate-180 rtl:-rotate-180",
                    isActive && "text-[var(--sb-ocean-bg-active)]"
                  )}
                />
              </div>
            </>
          )}

          {/* Label */}
          <h6
            className={cn(
              "text-ellipsis line-clamp-2 select-none",
              isActive ? "font-semibold text-[var(--sb-ocean-bg-active)]" : ""
            )}
          >
            {getLabel(topic)}
          </h6>
        </div>

        {/* Right section (progress, etc.) */}
        {renderRightSection?.(topic, isActive)}
      </div>

      {/* Recursive rendering of children */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          expanded ? "max-h-[1000px]" : "max-h-0"
        )}
      >
        {children?.map((child) => (
          <Topic
            key={getId(child)}
            topic={child}
            activeTopic={activeTopic}
            onClickHandler={onClickHandler}
            getId={getId}
            getLabel={getLabel}
            getChildren={getChildren}
            renderRightSection={renderRightSection}
            level={level + 1} // increment level for children
          />
        ))}
      </div>
    </div>
  );
};

export default Topic;
