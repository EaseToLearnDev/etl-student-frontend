// Components
import { useState } from "react";
import Topic from "./Topic";

interface TopicListProps<T> {
  topics: T[];
  onClickHandler?: (topic: T) => void;
  getId: (topic: T) => number;
  getLabel: (topic: T) => string;
  getChildren?: (topic: T) => T[] | undefined;
  renderRightSection?: (topic: T, isActive: boolean) => React.ReactNode;
};

/**
 * Renders a list of topics for a selected subject.
 */
const TopicTreeView = <T,>({
  topics,
  onClickHandler,
  getId,
  getLabel,
  getChildren,
  renderRightSection,
}: TopicListProps<T>) => {
  const [activeTopic, setActiveTopic] = useState<T | null>(null);
  const handleSelect = (topic: T) => {
    setActiveTopic(topic);
    onClickHandler?.(topic);
  } 
  return (
    <div>
      {topics?.map((topic) => (
        <Topic
          key={getId(topic)}
          topic={topic}
          activeTopic={activeTopic}
          onClickHandler={handleSelect}
          getId={getId}
          getLabel={getLabel}
          getChildren={getChildren}
          renderRightSection={renderRightSection}
        />
      ))}
    </div>
  );
};

export default TopicTreeView;
