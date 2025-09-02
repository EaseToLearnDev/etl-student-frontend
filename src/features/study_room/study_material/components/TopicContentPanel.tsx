// Types
import type { Topic } from "../../../shared/types";
import type { FilterType, TopicContentType } from "../sm.types";

// Icons
import { FiFilter } from "react-icons/fi";

// Components
import TopicContentItem from "./TopicContentItem";
import FilterDropdown from "./FilterDropdown";
import { Skeleton } from "../../../../components/SkeletonLoader";

interface TopicContentPanelProps {
  selectedTopic: Topic;
  setSelectedContent: (contentType: TopicContentType) => void;
  topicContentList: TopicContentType[];
  contentFilterType: FilterType;
}

/**
 * TopicContentPanel displays a list of study materials for a selected topic.
 */
const TopicContentPanel = ({
  selectedTopic,
  setSelectedContent,
  topicContentList,
  contentFilterType,
}: TopicContentPanelProps) => {
  const filteredContentList =
    contentFilterType === "All"
      ? topicContentList
      : topicContentList?.filter(
          (content) => content.contentType === contentFilterType
        );

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <h6 className="!font-semibold text-ellipsis line-clamp-2">
          {selectedTopic?.topicName}
        </h6>
        <div className="flex gap-4">
          <FilterDropdown>
            <FiFilter size={20} className="cursor-pointer" />
          </FilterDropdown>
        </div>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden pr-3 scrollbar-thin">
        {filteredContentList?.length && filteredContentList?.length > 0 ? (
          filteredContentList?.map((content, index) => (
            <TopicContentItem
              key={index}
              content={content}
              onClickHandler={setSelectedContent}
            />
          ))
        ) : (
          <>
            <div className="space-y-3 p-4">
              <Skeleton height={80} variant="rounded" />
              <Skeleton height={80} variant="rounded" />
              <Skeleton height={80} variant="rounded" />
              <Skeleton height={80} variant="rounded" />
              <Skeleton height={80} variant="rounded" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopicContentPanel;
