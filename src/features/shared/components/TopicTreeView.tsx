// Components
import EmptyState from "../../../components/EmptyState";
import Topic from "./Topic";
import GlobalSearch from "../../../components/GlobalSearch";
import { LuFile, LuListTree } from "react-icons/lu";

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
  // Flatten topics for search
  const flattenTopics = (list: T[]): T[] => {
    let result: T[] = [];
    list.forEach((topic) => {
      result.push(topic);
      if (getChildren) {
        const children = getChildren(topic);
        if (children && children.length) {
          result = result.concat(flattenTopics(children));
        }
      }
    });
    return result;
  };

  const allTopics = flattenTopics(topics);

  if (!topics || topics.length === 0) {
    return (
      <EmptyState
        title="No topic tree data available"
        description="No topic tree data is available yet. Explore courses or lessons to see topics populate this section!"
        icon={<LuListTree className="w-24 h-24" />}
        className="max-w-md"
      />
    );
  }
  return (
    <div className="relative">
      <GlobalSearch
        placeholder="Search topics..."
        data={allTopics}
        onSelect={(topic: any) => {
          onClickHandler?.(topic);
        }}
        renderItem={(topic) => <div>{getLabel(topic)}</div>}
      />

      <div className="mt-4 max-h-[calc(100dvh-350px)] overflow-y-auto">
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
    </div>
  );
};

export default TopicTreeView;
