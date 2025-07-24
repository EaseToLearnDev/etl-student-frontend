// Reset
import { useEffect } from "react";

// Types
import type { TopicType } from "../../../shared/types";

// Store
import useTopicStore from "../../../shared/store/useTopicStore";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicContentPanel from "../components/TopicContentPanel";
import TopicList from "../../../shared/components/TopicList";

// Sample Data
export const dummyData: TopicType[] = [
  {
    topicId: 2,
    topicName: "Physical Chemistry",
    topicUrl: "physical-chemistry",
    questionCount: 40,
    subjectiveCount: 10,
    pathIds: "1/2",
    children: [
      {
        topicId: 3,
        topicName: "States of Matter",
        topicUrl: "states-of-matter",
        questionCount: 15,
        subjectiveCount: 5,
        pathIds: "1/2/3",
        children: [
          {
            topicId: 4,
            topicName: "Gas Laws",
            topicUrl: "gas-laws",
            questionCount: 8,
            subjectiveCount: 2,
            pathIds: "1/2/3/4",
            children: [],
          },
          {
            topicId: 5,
            topicName: "Kinetic Theory",
            topicUrl: "kinetic-theory",
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
        topicUrl: "thermodynamics",
        questionCount: 25,
        subjectiveCount: 5,
        pathIds: "1/2/6",
        children: [
          {
            topicId: 7,
            topicName: "Laws of Thermodynamics",
            topicUrl: "laws-of-thermodynamics",
            questionCount: 12,
            subjectiveCount: 3,
            pathIds: "1/2/6/7",
            children: [],
          },
          {
            topicId: 8,
            topicName: "Entropy and Enthalpy",
            topicUrl: "entropy-and-enthalpy",
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
    topicUrl: "organic-chemistry",
    questionCount: 50,
    subjectiveCount: 20,
    pathIds: "1/9",
    children: [
      {
        topicId: 10,
        topicName: "Hydrocarbons",
        topicUrl: "hydrocarbons",
        questionCount: 30,
        subjectiveCount: 10,
        pathIds: "1/9/10",
        children: [
          {
            topicId: 11,
            topicName: "Alkanes",
            topicUrl: "alkanes",
            questionCount: 15,
            subjectiveCount: 5,
            pathIds: "1/9/10/11",
            children: [],
          },
          {
            topicId: 12,
            topicName: "Alkenes and Alkynes",
            topicUrl: "alkenes-and-alkynes",
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
        topicUrl: "haloalkanes",
        questionCount: 20,
        subjectiveCount: 10,
        pathIds: "1/9/13",
        children: [
          {
            topicId: 14,
            topicName: "Reactions of Haloalkanes",
            topicUrl: "reactions-of-haloalkanes",
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
    topicUrl: "inorganic-chemistry",
    questionCount: 30,
    subjectiveCount: 10,
    pathIds: "1/15",
    children: [
      {
        topicId: 16,
        topicName: "Periodic Table",
        topicUrl: "periodic-table",
        questionCount: 10,
        subjectiveCount: 4,
        pathIds: "1/15/16",
        children: [
          {
            topicId: 17,
            topicName: "Periodic Trends",
            topicUrl: "periodic-trends",
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
        topicUrl: "chemical-bonding",
        questionCount: 20,
        subjectiveCount: 6,
        pathIds: "1/15/18",
        children: [
          {
            topicId: 19,
            topicName: "Ionic and Covalent Bonds",
            topicUrl: "ionic-and-covalent-bonds",
            questionCount: 20,
            subjectiveCount: 6,
            pathIds: "1/15/18/19",
            children: [],
          },
        ],
      },
    ],
  },
];

/**
 * SMTopicListPage component displays a hierarchical list of study topics for selection.
 * - Renders a back button, a heading, and a two-panel layout:
 *   - Primary panel: TopicList for browsing/selecting topics.
 *   - Secondary panel: TopicContentPanel for displaying topic details, shown only if a topic is selected.
 */
const SMTopicListPage = () => {
  const topic = useTopicStore((state) => state.topic);
  const reset = useTopicStore((state) => state.reset);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div className="h-full flex flex-col flex-grow">
      <div className="flex items-center gap-4">
        <h3 className="!font-bold items-end">Select Your Topic</h3>
      </div>
      <div className="mt-5 h-full overflow-y-auto">
        <ChildLayout
          primaryContent={<TopicList topics={dummyData} />}
          secondaryContent={<TopicContentPanel />}
          hideSecondary={topic === null}
          onSecondaryHide={reset}
          secondaryInitialHeight={1}
        />
      </div>
    </div>
  );
};

export default SMTopicListPage;
