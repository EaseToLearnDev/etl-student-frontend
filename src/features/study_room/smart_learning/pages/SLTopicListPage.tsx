// Reset
import { useEffect } from "react";

// Types
import type { TopicType } from "../../../shared/types";

// Store
import useTopicStore from "../../../shared/store/useTopicStore"

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicModeSelector from "../components/TopicModeSelector";
import TopicList from "../../../shared/components/TopicList";
import { MdArrowBack } from "react-icons/md";
import cn from "../../../../utils/classNames";
import { useNavigate } from "react-router";

// Sample Data
export const dummyData: TopicType[] = [
  {
    topicId: 1,
    topicName: "Chemistry",
    questionCount: 120,
    subjectiveCount: 40,
    pathIds: "1",
    children: [
      {
        topicId: 2,
        topicName: "Physical Chemistry",
        questionCount: 40,
        subjectiveCount: 10,
        pathIds: "1/2",
        children: [
          {
            topicId: 3,
            topicName: "States of Matter",
            questionCount: 15,
            subjectiveCount: 5,
            pathIds: "1/2/3",
            children: [
              {
                topicId: 4,
                topicName: "Gas Laws",
                questionCount: 8,
                subjectiveCount: 2,
                pathIds: "1/2/3/4",
                children: [],
              },
              {
                topicId: 5,
                topicName: "Kinetic Theory",
                questionCount: 7,
                subjectiveCount: 3,
                pathIds: "1/2/3/5",
                children: [],
              },
            ],
          },
          {
            topicId: 6,
            topicName: "Thermodynamics",
            questionCount: 25,
            subjectiveCount: 5,
            pathIds: "1/2/6",
            children: [
              {
                topicId: 7,
                topicName: "Laws of Thermodynamics",
                questionCount: 12,
                subjectiveCount: 3,
                pathIds: "1/2/6/7",
                children: [],
              },
              {
                topicId: 8,
                topicName: "Entropy and Enthalpy",
                questionCount: 13,
                subjectiveCount: 2,
                pathIds: "1/2/6/8",
                children: [],
              },
            ],
          },
        ],
      },
      {
        topicId: 9,
        topicName: "Organic Chemistry",
        questionCount: 50,
        subjectiveCount: 20,
        pathIds: "1/9",
        children: [
          {
            topicId: 10,
            topicName: "Hydrocarbons",
            questionCount: 30,
            subjectiveCount: 10,
            pathIds: "1/9/10",
            children: [
              {
                topicId: 11,
                topicName: "Alkanes",
                questionCount: 15,
                subjectiveCount: 5,
                pathIds: "1/9/10/11",
                children: [],
              },
              {
                topicId: 12,
                topicName: "Alkenes and Alkynes",
                questionCount: 15,
                subjectiveCount: 5,
                pathIds: "1/9/10/12",
                children: [],
              },
            ],
          },
          {
            topicId: 13,
            topicName: "Haloalkanes",
            questionCount: 20,
            subjectiveCount: 10,
            pathIds: "1/9/13",
            children: [
              {
                topicId: 14,
                topicName: "Reactions of Haloalkanes",
                questionCount: 20,
                subjectiveCount: 10,
                pathIds: "1/9/13/14",
                children: [],
              },
            ],
          },
        ],
      },
      {
        topicId: 15,
        topicName: "Inorganic Chemistry",
        questionCount: 30,
        subjectiveCount: 10,
        pathIds: "1/15",
        children: [
          {
            topicId: 16,
            topicName: "Periodic Table",
            questionCount: 10,
            subjectiveCount: 4,
            pathIds: "1/15/16",
            children: [
              {
                topicId: 17,
                topicName: "Periodic Trends",
                questionCount: 10,
                subjectiveCount: 4,
                pathIds: "1/15/16/17",
                children: [],
              },
            ],
          },
          {
            topicId: 18,
            topicName: "Chemical Bonding",
            questionCount: 20,
            subjectiveCount: 6,
            pathIds: "1/15/18",
            children: [
              {
                topicId: 19,
                topicName: "Ionic and Covalent Bonds",
                questionCount: 20,
                subjectiveCount: 6,
                pathIds: "1/15/18/19",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

/**
 * SLTopicListPage component displays a hierarchical list of study topics for selection.
 *
 * - Utilizes a topic store to manage the selected topic state.
 * - Resets the topic selection on component unmount.
 * - Renders a back button for navigation.
 * - Shows a list of topics using sample `dummyData`.
 * - Integrates `ChildLayout` to display the topic list and a mode selector.
 * - Hides the secondary content (mode selector) if no topic is selected.
 *
 * @component
 * @returns {JSX.Element} The rendered topic selection page.
 */
const SLTopicListPage = () => {
  const topic = useTopicStore((state) => state.topic);
  const reset = useTopicStore((state) => state.reset);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div className="h-full flex flex-col flex-grow">
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
        <h3 className="!font-bold items-end">Select Your Topic</h3>
      </div>
      <div className="mt-5 h-full overflow-y-auto">
        <ChildLayout
          primaryContent={<TopicList topics={dummyData} />}
          secondaryContent={<TopicModeSelector />}
          hideSecondary={topic === null}
          onSecondaryHide={reset}
          secondaryInitialHeight={1}
        />
      </div>
    </div>
  );
};

export default SLTopicListPage;
