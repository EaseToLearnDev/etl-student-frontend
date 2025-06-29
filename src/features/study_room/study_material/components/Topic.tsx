// React
import { useState } from "react";

// Types
import type { TopicType } from "../../../types";

// Icons
import { PiCaretUpBold } from "react-icons/pi";

// Utils
import cn from "../../../../utils/classNames";

// Store
import useTopicStore from "../store/useTopicStore";
import useIsMobile from "../../../../hooks/useIsMobile";

type TopicProps = {
  topic: TopicType | null;
  isRoot?: boolean;
};

const Topic = ({ topic, isRoot = false }: TopicProps) => {
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
          "flex justify-between items-center p-2",
          !isRoot ? "border-l-[1px] border-[var(--border-secondary)]" : "",
          isActive
            ? "bg-[var(--surface-bg-secondary)] rounded-sm"
            : "bg-[var(--surface-bg-primary)]"
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-[8px] h-[8px] rounded-full",
              isActive
                ? "bg-[var(--sb-ocean-bg-active)]"
                : "bg-[var(--text-tertiary)]"
            )}
          />
          <h6
            className={cn(
              "text-ellipsis line-clamp-1",
              isActive ? "font-semibold" : ""
            )}
          >
            {topic?.topicName}
          </h6>
        </div>
        <div
          onClick={handleExpand}
          className={cn(
            "w-[24px] h-[24px] flex justify-center items-center border-1 border-[var(--border-secondary)] cursor-pointer hover:bg-[var(--surface-bg-secondary)] rounded-md",
            topic?.children?.length ? "visible" : "invisible"
          )}
        >
          <PiCaretUpBold
            size={18}
            className={cn(
              "h-3.5 w-3.5 -rotate-180 text-[var(--text-tertiary)] transition-transform duration-200 rtl:rotate-90",
              expanded && "rotate-0 rtl:rotate-0"
            )}
          />
        </div>
      </div>
      {expanded && topic?.children?.length ? (
        topic?.children?.map((topic: any, index: number) => (
          <Topic key={index} topic={topic} />
        ))
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Topic;
