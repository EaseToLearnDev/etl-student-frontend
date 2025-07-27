// Types
import type { TopicType } from "../types";

// Components
import Topic from "./Topic";

type TopicListProps = {
  topics: TopicType[];
};

/**
 * Renders a list of topics for a selected subject.
 */
const TopicList = ({topics}: TopicListProps) => {
  // Replace with subject name from api response
  
  return (
    <div>
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