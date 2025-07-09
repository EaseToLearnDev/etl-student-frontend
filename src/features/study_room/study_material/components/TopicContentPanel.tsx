// Icons
import {FiFilter, FiLock} from "react-icons/fi";

// Hooks
import useTopicStore from "../../../shared/store/useTopicStore";

// Components
import TopicContentItem from "./TopicContentItem";

// Sample data
const dummyData = {
  obj: {
    list: [
      {
        id: 1,
        contentTitle: "Introduction to React",
        contentDescription: "A beginner's guide to building UI with React.",
        contentType: "Video",
        rating: 4.5,
        language: "English",
      },
      {
        id: 2,
        contentTitle: "Advanced Node.js",
        contentDescription: "Deep dive into backend development using Node.js.",
        contentType: "Article",
        rating: 4.7,
        language: "English",
      },
      {
        id: 3,
        contentTitle: "Python for Data Science",
        contentDescription:
          "Learn how Python is used in data science and analytics.",
        contentType: "Course",
        rating: 4.8,
        language: "English",
      },
      {
        id: 4,
        contentTitle: "Machine Learning Basics",
        contentDescription:
          "An introduction to the key concepts of machine learning.",
        contentType: "Video",
        rating: 4.6,
        language: "Hindi",
      },
      {
        id: 5,
        contentTitle: "CSS Grid Layout",
        contentDescription: "Master layout design using modern CSS Grid.",
        contentType: "Blog",
        rating: 4.2,
        language: "English",
      },
      {
        id: 6,
        contentTitle: "JavaScript Closures Explained",
        contentDescription: "Understand closures with simple examples.",
        contentType: "Article",
        rating: 4.3,
        language: "English",
      },
      {
        id: 7,
        contentTitle: "Docker Essentials",
        contentDescription: "Containerization for beginners using Docker.",
        contentType: "Course",
        rating: 4.4,
        language: "English",
      },
      {
        id: 8,
        contentTitle: "Kubernetes Crash Course",
        contentDescription: "Learn how to manage containerized applications.",
        contentType: "Video",
        rating: 4.6,
        language: "English",
      },
      {
        id: 9,
        contentTitle: "Linux Command Line",
        contentDescription: "Basic to advanced Linux shell commands.",
        contentType: "Article",
        rating: 4.1,
        language: "Hindi",
      },
      {
        id: 10,
        contentTitle: "Building REST APIs",
        contentDescription: "Design and build RESTful APIs with Express.",
        contentType: "Video",
        rating: 4.5,
        language: "English",
      },
    ],
  },
};

/**
 * TopicContentPanel displays a list of study materials for a selected topic.
 * The panel header shows the topic name and filter/lock icons.
 */
const TopicContentPanel = () => {
  const topic = useTopicStore((state) => state.topic);
  return (
    <div className="grid gap-6 h-full">
      <div className="flex items-center justify-between">
        <h5 className="!font-semibold text-[var(--text-primary)]">
          {topic?.topicName}
        </h5>
        <div className="flex gap-4">
          <FiFilter size={20} className="cursor-pointer" />
          <FiLock size={20} className="cursor-pointer" />
        </div>
      </div>
      <div
        className="grid gap-4 overflow-y-auto overflow-x-hidden pr-3 scrollbar-thin"
      >
        {dummyData?.obj?.list?.length ? (
          dummyData?.obj?.list?.map((content, index) => (
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
