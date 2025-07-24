// Types
import type { TopicType } from "../types";

// Components
import Topic from "./Topic";

type TopicListProps = {
  subjectName?: string;
  topics: TopicType[];
};

/**
 * Renders a list of topics for a selected subject.
 */
const TopicList = ({topics, subjectName}: TopicListProps) => {
  // Replace with subject name from api response
  
  return (
    <div>
      <h5 className="!font-semibold text-[var(--text-primary)]">
        Selected Subject - {subjectName}
      </h5>
      {topics?.map((topic: any, index: number) => (
        <Topic
          key={index}
          topic={topic}
        />
      ))}
    </div>
  );
};

export default TopicList;