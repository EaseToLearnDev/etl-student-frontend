// Types
import type { Topic } from "../../../shared/types";
import type { FilterType, Content } from "../sm.types";

// Icons
import { FiFilter } from "react-icons/fi";

// Components
import TopicContentItem from "./TopicContentItem";
import FilterDropdown from "./FilterDropdown";
import EmptyState from "../../../../components/EmptyState";
import { LuBookOpen } from "react-icons/lu";
import { pushToDataLayer } from "../../../../utils/gtm";
import { gtmEvents } from "../../../../utils/gtm-events";

interface TopicContentPanelProps {
  selectedTopic: Topic;
  setSelectedContent: (contentType: Content) => void;
  topicContentList: Content[];
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
  if (!topicContentList || topicContentList.length === 0) {
    return <EmptyState title="No Content Available" />;
  }

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
            <div className="relative" 
              onClick={() => {
                pushToDataLayer({
                  event: gtmEvents[`study_material_filter_button_click`],
                  id: `study_material_filter_button_id`,
                });
              }}>
              <FiFilter size={20} className="cursor-pointer" />
              {contentFilterType !== "All" ? (
                <div className="absolute top-0 right-0 w-2 h-2 aspect-square rounded-full bg-[var(--sb-ocean-bg-active)]" />
              ) : (
                <></>
              )}
            </div>
          </FilterDropdown>
        </div>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden pr-3 scrollbar-hide">
        {filteredContentList?.length && filteredContentList?.length > 0 ? (
          filteredContentList?.map((content, index) => (
            <TopicContentItem
              key={index}
              content={content}
              onClickHandler={setSelectedContent}
            />
          ))
        ) : (
      <EmptyState
      title="No content available"
      description="No content are available right now. Please check back later or contact your instructor for updates!"
      icon={<LuBookOpen className="w-24 h-24" />}
      className="max-w-md"
    />
        )}
      </div>
    </div>
  );
};

export default TopicContentPanel;
