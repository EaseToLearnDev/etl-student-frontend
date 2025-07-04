// React
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

// Types
import type { TopicTestType } from "../../../shared/types";

// Hooks
import useIsMobile from "../../../../hooks/useIsMobile";

// Utils
import { capitalizeWords } from "../../../../utils";
import cn from "../../../../utils/classNames";

// Icons
import { MdArrowBack } from "react-icons/md";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicTestList from "../components/TopicTestList";
import TopicTestInstructions from "../components/TopicTestInstructions";
import BreadCrumbs from "../../../shared/components/BreadCrumbs";

// Sample Data
const dummyData: TopicTestType[] = [
  {
    testName: "Chemistry Topic Test 1",
    testUrl: "chemistry-topic-test-1",
    testTime: 180,
    questions: 50,
    marks: 87,
    totalMarks: 100,
    difficulty: "hard",
    progress: "not_started",
  },
  {
    testName: "Physics Topic Test 1",
    testUrl: "physics-topic-test-1",
    testTime: 120,
    questions: 40,
    totalMarks: 100,
    difficulty: "medium",
    progress: "in_progress",
  },
  {
    testName: "Mathematics Topic Test 1",
    testUrl: "mathematics-topic-test-1",
    testTime: 150,
    questions: 45,
    marks: 100,
    totalMarks: 100,
    difficulty: "easy",
    progress: "not_started",
  },
  {
    testName: "Biology Topic Test 1",
    testUrl: "biology-topic-test-1",
    testTime: 100,
    questions: 30,
    totalMarks: 100,
    difficulty: "medium",
    progress: "not_started",
  },
  {
    testName: "English Topic Test 1",
    testUrl: "english-topic-test-1",
    testTime: 90,
    questions: 25,
    totalMarks: 50,
    difficulty: "easy",
    progress: "not_started",
  },
  {
    testName: "Chemistry Topic Test 2",
    testUrl: "chemistry-topic-test-2",
    testTime: 160,
    questions: 35,
    totalMarks: 100,
    difficulty: "medium",
    progress: "in_progress",
  },
  {
    testName: "Physics Topic Test 2",
    testUrl: "physics-topic-test-2",
    testTime: 140,
    questions: 38,
    totalMarks: 100,
    difficulty: "hard",
    progress: "not_started",
  },
  {
    testName: "Mathematics Topic Test 2",
    testUrl: "mathematics-topic-test-2",
    testTime: 130,
    questions: 32,
    totalMarks: 100,
    difficulty: "easy",
    progress: "not_started",
  },
  {
    testName: "Biology Topic Test 2",
    testUrl: "biology-topic-test-2",
    testTime: 110,
    questions: 28,
    totalMarks: 100,
    difficulty: "medium",
    progress: "in_progress",
  },
  {
    testName: "English Topic Test 2",
    testUrl: "english-topic-test-2",
    testTime: 95,
    questions: 22,
    totalMarks: 44,
    marks: 44,
    difficulty: "hard",
    progress: "not_started",
  },
];

/**
 * TopicTestListPage displays a list of topic tests for a selected topic.
 *
 * This component:
 * - Uses dummy data to render a list of topic tests.
 * - Retrieves the topic name from the URL parameters.
 * - Manages the visibility of the instructions panel based on device type (mobile/desktop) and user interaction.
 * - Provides navigation back to the previous page.
 * - Utilizes the ChildLayout component to display the test list and instructions side by side (or toggled on mobile).
 *
 * @component
 * @returns {JSX.Element} The rendered TopicTestListPage component.
 */
const TopicTestListPage = () => {
  // Hooks
  const navigate = useNavigate();
  const { topic } = useParams();
  const isMobile = useIsMobile();
  // States
  const [hideSecondary, setHideSecondary] = useState<boolean>(
    isMobile ? true : false
  );
  // Replace with api data
  const topicName: string =
    topic?.split("-").join(" ").replace(/\d+/g, "").trim() || "";

  return (
    <div className="h-full flex flex-col flex-grow">
       <BreadCrumbs/>
      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => navigate(-1)}
          className={cn(
            "w-[34px] h-[34px] aspect-square flex justify-center items-center cursor-pointer",
            "border-1 border-[var(--border-primary)] rounded-full hover:bg-[var(--surface-bg-secondary)]"
          )}
        >
          <MdArrowBack size={20} className="text-[var(--text-primary)]" />
        </div>
        <h3 className="!font-bold items-end">{capitalizeWords(topicName)}</h3>
      </div>
      {/* TopicList */}
      <div className="mt-5 h-full overflow-y-auto">
        <ChildLayout
          primaryContent={
            <TopicTestList
              tests={dummyData}
              infoClickHandler={() => setHideSecondary(false)}
            />
          }
          secondaryContent={<TopicTestInstructions topicName={topicName} />}
          hideSecondary={hideSecondary}
          onSecondaryHide={() => setHideSecondary(true)}
        />
      </div>
    </div>
  );
};

export default TopicTestListPage;
