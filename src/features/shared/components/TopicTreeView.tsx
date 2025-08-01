// Components
import Topic from "./Topic";

interface TopicListProps<T> {
  topics: T[];
  activeTopic: T | null;
  onClickHandler: (topic: T) => void;
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
  activeTopic,
  onClickHandler,
  getId,
  getLabel,
  getChildren,
  renderRightSection,
}: TopicListProps<T>) => {
  return (
    <div>
      {topics?.map((topic) => (
        <Topic
          key={getId(topic)}
          topic={topic}
          activeTopic={activeTopic}
          onClickHandler={onClickHandler}
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
