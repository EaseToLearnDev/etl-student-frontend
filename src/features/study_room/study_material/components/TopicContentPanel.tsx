// Icons
import {FiFilter, FiLock} from "react-icons/fi";

// Store
import { useSMStore } from "../store/useSMStore";

// Components
import TopicContentItem from "./TopicContentItem";

/**
 * TopicContentPanel displays a list of study materials for a selected topic.
 * The panel header shows the topic name and filter/lock icons.
 */
const TopicContentPanel = () => {
  const selectedTopic = useSMStore((state) => state.selectedTopic);
  const topicContentList = useSMStore((state) => state.topicContentList);
  
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <h5 className="!font-semibold text-[var(--text-primary)] text-ellipsis line-clamp-2">
          {selectedTopic?.topicName}
        </h5>
        <div className="flex gap-4">
          <FiFilter size={20} className="cursor-pointer" />
          <FiLock size={20} className="cursor-pointer" />
        </div>
      </div>
      <div
        className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden pr-3 scrollbar-thin"
      >
        {topicContentList?.length && topicContentList?.length > 0 ? (
          topicContentList?.map((content, index) => (
            <TopicContentItem key={index} content={content} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TopicContentPanel;
