// Components
import EmptyState from "../../../components/EmptyState";
import Topic from "./Topic";

interface TopicListProps<T> {
  topics: T[];
  selectedTopic: T | null;
  onClickHandler?: (topic: T) => void;
  getId: (topic: T) => number;
  getLabel: (topic: T) => string;
  getChildren?: (topic: T) => T[] | undefined;
  renderRightSection?: (topic: T, isActive: boolean) => React.ReactNode;
}

/**
 * Renders a list of topics for a selected subject.
 */
const TopicTreeView = <T,>({
  topics,
  selectedTopic,
  onClickHandler,
  getId,
  getLabel,
  getChildren,
  renderRightSection,
}: TopicListProps<T>) => {
  if (!topics || topics.length === 0) {
    return <EmptyState title="No Topics Available" />;
  }
  return (
    <div>
      {topics?.map((topic) => (
        <Topic
          key={getId(topic)}
          topic={topic}
          activeTopic={selectedTopic}
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
