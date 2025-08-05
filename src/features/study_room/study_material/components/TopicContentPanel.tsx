// Types
import type { TopicType } from "../../../shared/types";
import type { FilterType, TopicContentType } from "../sm.types";

// Icons
import { FiFilter } from "react-icons/fi";

// Components
import TopicContentItem from "./TopicContentItem";
import FilterDropdown from "./FilterDropdown";

interface TopicContentPanelProps {
  selectedTopic: TopicType;
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
        <h5 className="!font-semibold text-[var(--text-primary)] text-ellipsis line-clamp-2">
          {selectedTopic?.topicName}
        </h5>
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
              setSelectedContent={setSelectedContent}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TopicContentPanel;
