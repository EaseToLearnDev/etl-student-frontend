// React
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

// Types
import type { TopicTestResponseType } from "../../../shared/types";

// Hooks
import useIsMobile from "../../../../hooks/useIsMobile";

// Utils
import { capitalizeWords } from "../../../../utils";
import cn from "../../../../utils/classNames";

// Icons
import { MdArrowBack } from "react-icons/md";

// Layout and Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TestCardList from "../../../shared/components/TestCardList";
import TopicTestInstructions from "../components/TopicTestInstructions";

// Sample Data
const dummyData: TopicTestResponseType = {
  responseTxt: "success",
  message: "Total Found: 10",
  obj: [
    {
      mockTestTitle: "NEET UG CHARACTERISTIC OF LIVING ORGANISMS Test 1",
      mockTestId: 1,
      topicId: 3428,
      patternDetails: {
        totalQuestion: 10,
        totalTime: 10,
        totalMark: 40,
        markCorrectAns: 4,
        markIncorrectAns: -1,
        markNotAttempt: 0,
        questionType: "Multiple Choice",
      },
    },
    {
      mockTestTitle: "NEET UG CELL STRUCTURE Test 1",
      mockTestId: 2,
      topicId: 123,
      patternDetails: {
        totalQuestion: 15,
        totalTime: 15,
        totalMark: 60,
        markCorrectAns: 4,
        markIncorrectAns: -1,
        markNotAttempt: 0,
        questionType: "Multiple Choice",
      },
    },
    {
      mockTestTitle: "NEET UG DNA REPLICATION Test 1",
      mockTestId: 3,
      topicId: 2729,
      patternDetails: {
        totalQuestion: 12,
        totalTime: 12,
        totalMark: 48,
        markCorrectAns: 4,
        markIncorrectAns: -1,
        markNotAttempt: 0,
        questionType: "Multiple Choice",
      },
    },
    {
      mockTestTitle: "NEET UG BIOMOLECULES Test 1",
      mockTestId: 4,
      topicId: 124,
      patternDetails: {
        totalQuestion: 20,
        totalTime: 20,
        totalMark: 80,
        markCorrectAns: 4,
        markIncorrectAns: -1,
        markNotAttempt: 0,
        questionType: "Multiple Choice",
      },
    },
    {
      mockTestTitle: "NEET UG ANIMAL KINGDOM Test 1",
      mockTestId: 5,
      topicId: 274,
      patternDetails: {
        totalQuestion: 18,
        totalTime: 18,
        totalMark: 72,
        markCorrectAns: 4,
        markIncorrectAns: -1,
        markNotAttempt: 0,
        questionType: "Multiple Choice",
      },
    },
    {
      mockTestTitle: "NEET UG PLANT PHYSIOLOGY Test 1",
      mockTestId: 6,
      topicId: 2171,
      patternDetails: {
        totalQuestion: 10,
        totalTime: 10,
        totalMark: 40,
        markCorrectAns: 4,
        markIncorrectAns: -1,
        markNotAttempt: 0,
        questionType: "Multiple Choice",
      },
    },
    {
      mockTestTitle: "NEET UG HUMAN REPRODUCTION Test 1",
      mockTestId: 7,
      topicId: 2307,
      patternDetails: {
        totalQuestion: 25,
        totalTime: 25,
        totalMark: 100,
        markCorrectAns: 4,
        markIncorrectAns: -1,
        markNotAttempt: 0,
        questionType: "Multiple Choice",
      },
    },
    {
      mockTestTitle: "NEET UG GENETICS AND HEREDITY Test 1",
      mockTestId: 8,
      topicId: 177,
      patternDetails: {
        totalQuestion: 14,
        totalTime: 14,
        totalMark: 56,
        markCorrectAns: 4,
        markIncorrectAns: -1,
        markNotAttempt: 0,
        questionType: "Multiple Choice",
      },
    },
    {
      mockTestTitle: "NEET UG EVOLUTION Test 1",
      mockTestId: 9,
      topicId: 1191,
      patternDetails: {
        totalQuestion: 16,
        totalTime: 16,
        totalMark: 64,
        markCorrectAns: 4,
        markIncorrectAns: -1,
        markNotAttempt: 0,
        questionType: "Multiple Choice",
      },
    },
    {
      mockTestTitle: "NEET UG HUMAN PHYSIOLOGY Test 1",
      mockTestId: 10,
      topicId: 1516,
      patternDetails: {
        totalQuestion: 22,
        totalTime: 22,
        totalMark: 88,
        markCorrectAns: 4,
        markIncorrectAns: -1,
        markNotAttempt: 0,
        questionType: "Multiple Choice",
      },
    },
  ],
};

/**
 * TopicTestListPage displays a list of topic tests for a selected topic.
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
            <TestCardList
              tests={dummyData.obj}
              infoClickHandler={() => setHideSecondary(false)}
            />
          }
          secondaryContent={<TopicTestInstructions title={topicName} />}
          hideSecondary={hideSecondary}
          onSecondaryHide={() => setHideSecondary(true)}
        />
      </div>
    </div>
  );
};

export default TopicTestListPage;
