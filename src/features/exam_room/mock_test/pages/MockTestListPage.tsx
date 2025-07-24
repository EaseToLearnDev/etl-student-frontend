// React
import { useState } from "react";

// Types
import type { MockTestCategoryType } from "../../../shared/types";

// Hooks
import useIsMobile from "../../../../hooks/useIsMobile";

// Layouts & Components
import ChildLayout from "../../../../layouts/child-layout/ChildLayout";
import TopicTestInstructions from "../../topic_test/components/TopicTestInstructions";
import TestCardList from "../../../shared/components/TestCardList";
import Tabs from "../../../../components/Tabs";
import Select from "../../../../components/Select";

// Sample Data
const dummyData: MockTestCategoryType[] = [
  {
    categoryId: 11,
    categoryName: "NEET UG COMPLETE MOCK TESTS",
    testList: [
      {
        mocktestId: 5508,
        testName: "NEET UG 2025 COMPLETE MOCK TEST 1",
        instanceUuid: "e9c08905ba7b446cb3ba447db416f857402",
        totalQuestions: 180,
        noQuestionAttempt: 0,
        testTotalTime: 180,
        totalMarks: 720.0,
        correctAnsMark: 0.0,
        wrongAnsMark: 0.0,
        noAnsMark: 0.0,
        sectionSet: [
          {
            sectionId: 564,
            sectionName: "PHYSICS",
            questionRange: "1-45",
            correctMarks: 4.0,
            incorrectMarks: -1.0,
            notAnswerMarks: 0.0,
            totalTime: 0,
            noQuestionAttempt: 0,
          },
          {
            sectionId: 565,
            sectionName: "CHEMISTRY",
            questionRange: "46-90",
            correctMarks: 4.0,
            incorrectMarks: -1.0,
            notAnswerMarks: 0.0,
            totalTime: 0,
            noQuestionAttempt: 0,
          },
          {
            sectionId: 566,
            sectionName: "BIOLOGY",
            questionRange: "91-180",
            correctMarks: 4.0,
            incorrectMarks: -1.0,
            notAnswerMarks: 0.0,
            totalTime: 0,
            noQuestionAttempt: 0,
          },
        ],
      },
      {
        mocktestId: 5509,
        testName: "NEET UG 2025 COMPLETE MOCK TEST 2",
        instanceUuid: "862c06ae57cb4e7d9c868284baf9cb17231",
        totalQuestions: 180,
        noQuestionAttempt: 0,
        testTotalTime: 180,
        totalMarks: 720.0,
        correctAnsMark: 0.0,
        wrongAnsMark: 0.0,
        noAnsMark: 0.0,
        sectionSet: [
          {
            sectionId: 564,
            sectionName: "PHYSICS",
            questionRange: "1-45",
            correctMarks: 4.0,
            incorrectMarks: -1.0,
            notAnswerMarks: 0.0,
            totalTime: 0,
            noQuestionAttempt: 0,
          },
          {
            sectionId: 565,
            sectionName: "CHEMISTRY",
            questionRange: "46-90",
            correctMarks: 4.0,
            incorrectMarks: -1.0,
            notAnswerMarks: 0.0,
            totalTime: 0,
            noQuestionAttempt: 0,
          },
          {
            sectionId: 566,
            sectionName: "BIOLOGY",
            questionRange: "91-180",
            correctMarks: 4.0,
            incorrectMarks: -1.0,
            notAnswerMarks: 0.0,
            totalTime: 0,
            noQuestionAttempt: 0,
          },
        ],
      },
    ],
  },
  {
    categoryId: 347,
    categoryName: "NEET UG BIOLOGY MOCK TESTS",
    testList: [
      {
        mocktestId: 5488,
        testName: "NEET UG 2025 BIOLOGY MOCK TEST 1",
        instanceUuid: "cdb8e5fafdfa4fd98d272efbd446244e376",
        totalQuestions: 90,
        noQuestionAttempt: 0,
        testTotalTime: 90,
        totalMarks: 360.0,
        correctAnsMark: 4.0,
        wrongAnsMark: -1.0,
        noAnsMark: 0.0,
      },
      {
        mocktestId: 5489,
        testName: "NEET UG 2025 BIOLOGY MOCK TEST 2",
        instanceUuid: "1ebf28f8bb474c46820abd47114cd1f6376",
        totalQuestions: 90,
        noQuestionAttempt: 0,
        testTotalTime: 90,
        totalMarks: 360.0,
        correctAnsMark: 4.0,
        wrongAnsMark: -1.0,
        noAnsMark: 0.0,
      },
    ],
  },
  {
    categoryId: 9,
    categoryName: "NEET UG CHEMISTRY MOCK TESTS",
    testList: [
      {
        mocktestId: 5498,
        testName: "NEET UG 2025 CHEMISTRY MOCK TEST 1",
        instanceUuid: "7b301578a5e64cfc80eae667e2ea5e5b159",
        totalQuestions: 45,
        noQuestionAttempt: 0,
        testTotalTime: 45,
        totalMarks: 180.0,
        correctAnsMark: 4.0,
        wrongAnsMark: -1.0,
        noAnsMark: 0.0,
      },
      {
        mocktestId: 5499,
        testName: "NEET UG 2025 CHEMISTRY MOCK TEST 2",
        instanceUuid: "5c8e2210149648bcacc3720f6cf4b048690",
        totalQuestions: 45,
        noQuestionAttempt: 0,
        testTotalTime: 45,
        totalMarks: 180.0,
        correctAnsMark: 4.0,
        wrongAnsMark: -1.0,
        noAnsMark: 0.0,
      },
    ],
  },
  {
    categoryId: 10,
    categoryName: "NEET UG PHYSICS MOCK TESTS",
    testList: [
      {
        mocktestId: 5493,
        testName: "NEET UG 2025 PHYSICS MOCK TEST 1",
        instanceUuid: "9abda56526974de089aa8d2e843ff886438",
        totalQuestions: 45,
        noQuestionAttempt: 0,
        testTotalTime: 45,
        totalMarks: 180.0,
        correctAnsMark: 4.0,
        wrongAnsMark: -1.0,
        noAnsMark: 0.0,
      },
      {
        mocktestId: 5494,
        testName: "NEET UG 2025 PHYSICS MOCK TEST 2",
        instanceUuid: "bd7e66d05dc54b3589164e2e27e338be383",
        totalQuestions: 45,
        noQuestionAttempt: 0,
        testTotalTime: 45,
        totalMarks: 180.0,
        correctAnsMark: 4.0,
        wrongAnsMark: -1.0,
        noAnsMark: 0.0,
      },
    ],
  },
];

/**
 * MockTestListPage component displays a list of mock tests categorized into "Complete Mock Tests" and "Subject Wise Mock Tests".
 */
const MockTestListPage = () => {
  const isMobile = useIsMobile();
  const [hideSecondary, setHideSecondary] = useState<boolean>(
    isMobile ? true : false
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState(0);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const subjectSpecificMockTests = dummyData.slice(1);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between md:w-[60%] lg:w-[70%] xl:w-[75%] pr-5">
        {/* Tabs */}
        <Tabs
          tabs={["Complete Mock Tests", "Subject Wise Mock Tests"]}
          selectedIndex={selectedTabIndex}
          onSelect={setSelectedTabIndex}
        />
        {selectedTabIndex === 1 && (
          <Select
            type="Subjects"
            items={subjectSpecificMockTests.map((item) => item.categoryName)}
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen((prev) => !prev)}
            selectedIndex={selectedDropdownIndex}
            onSelect={setSelectedDropdownIndex}
          />
        )}
      </div>

      {/* Layout */}
      <div className="w-full h-full overflow-y-auto mt-4">
        {selectedTabIndex === 0 ? (
          <ChildLayout
            primaryContent={
              <TestCardList
                tests={dummyData[0]}
                infoClickHandler={() => setHideSecondary(false)}
              />
            }
            secondaryContent={<TopicTestInstructions title="Instructions" />}
            hideSecondary={hideSecondary}
            onSecondaryHide={() => setHideSecondary(true)}
          />
        ) : (
          <ChildLayout
            primaryContent={
              <TestCardList
                tests={subjectSpecificMockTests[selectedDropdownIndex]}
                infoClickHandler={() => setHideSecondary(false)}
              />
            }
            secondaryContent={<TopicTestInstructions title="Instructions" />}
            hideSecondary={hideSecondary}
            onSecondaryHide={() => setHideSecondary(true)}
          />
        )}
      </div>
    </div>
  );
};

export default MockTestListPage;
