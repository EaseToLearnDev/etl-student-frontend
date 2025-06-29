// Types
import type { TopicType } from "../types";

// Components
import Topic from "./Topic";

type TopicListProps = {
  topics: TopicType[];
};

/**
 * Renders a list of topics for a selected subject.
 *
 * @component
 * @param {TopicListProps} props - The props for the TopicList component.
 * @param {TopicType[]} props.topics - An array of topic objects to display.
 * @returns {JSX.Element} The rendered list of topics with the subject name.
 */
const TopicList = ({topics}: TopicListProps) => {
  // Replace with subject name from api response
  const subject = "Chemistry";
  
  return (
    <div>
      <h5 className="!font-semibold text-[var(--text-primary)]">
        Selected Subject - {subject}
      </h5>
      {topics?.map((topic: any, index: number) => (
        <Topic
          key={index}
          topic={topic}
          isRoot={true}
        />
      ))}
    </div>
  );
};

export default TopicList;