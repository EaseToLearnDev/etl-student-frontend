// React
import { useState } from "react";

// Types
import type { TopicType } from "../types";

// Icons
import { PiCaretUpBold } from "react-icons/pi";

// Utils
import cn from "../../../utils/classNames";

// Store
import useTopicStore from "../store/useTopicStore";
import useIsMobile from "../../../hooks/useIsMobile";

type TopicProps = {
  topic: TopicType | null;
};

/**
 * Renders a single topic node with expand/collapse functionality and selection state.
 */
const Topic = ({ topic }: TopicProps) => {
  // Hooks
  const setTopic = useTopicStore((state) => state.setTopic);
  const _topic = useTopicStore((state) => state.topic);
  const isMobile = useIsMobile();

  //   States
  const [expanded, setExpanded] = useState<boolean>(false);
  const isActive = _topic?.topicId === topic?.topicId;

  //   Handlers
  const handleSelect = () => setTopic(topic);
  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  return topic ? (
    <div className={cn("mt-2", isMobile ? "ml-[20px]" : "ml-[40px]")}>
      <div
        onClick={handleSelect}
        className={cn(
          "flex items-center gap-3 p-2",
          isActive
            ? "bg-[var(--surface-bg-secondary)] rounded-md"
            : "bg-[var(--surface-bg-primary)]"
        )}
      >
        <div
          onClick={handleExpand}
          className={cn(
            "w-[24px] h-[24px] flex justify-center items-center rounded-md  cursor-pointer",
            topic?.children?.length ? "visible" : "invisible",
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
              isActive && "font-semibold text-[var(--sb-ocean-bg-active)]"
            )}
          />
        </div>
        {topic?.children.length === 0 && (
          <div
            className={cn(
              "w-[8px] h-[8px] rounded-full",
              isActive
                ? "bg-[var(--sb-ocean-bg-active)]"
                : "bg-[var(--text-tertiary)]"
            )}
          />
        )}
        <h6
          className={cn(
            "text-ellipsis line-clamp-2 select-none",
            isActive ? "font-semibold" : ""
          )}
        >
          {topic?.topicName}
        </h6>
      </div>

      {/* children Topic container */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          expanded ? "max-h-[1000px]" : "max-h-0"
        )}
      >
        {topic?.children?.length
          ? topic?.children?.map((childTopic: any, index: number) => (
              <Topic key={index} topic={childTopic} />
            ))
          : null}
      </div>
    </div>
  ) : null;
};

export default Topic;
