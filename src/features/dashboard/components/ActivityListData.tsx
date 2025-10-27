import EmptyState from "../../../components/EmptyState";
import type { IGhActivityByDayResults } from "../services/getGhActivityByDay";
import Badge from "../../../components/Badge";
import { Theme } from "../../../utils/colors";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";
import { LuArrowRight, LuFilePenLine } from "react-icons/lu";
import TestEndedModalContent from "../../test_simulator/components/TestEndedModalContent";

function Test({
  testData,
  onNavigate,
}: {
  testData: IGhActivityByDayResults;
  onNavigate: (testSession: string, testMode: string, testType: number) => void;
}) {
  const getTestType = (testType: number, testMode: string) => {
    switch (testType) {
      case 1:
        return testMode;
      case 2:
        return "Topic Test";
      case 3:
        return "Mock Test";
      case 4:
        return "Class Test";
      default:
        return "N/A";
    }
  };

  return (
    <div className="w-full pb-4 md:pb-2 pt-5  border-(--border-primary) flex flex-col gap-1 md:flex-row justify-between items-start md:items-start shadow-sm dark:shadow-white/10 border  rounded-lg  px-4">
      <div>
        <div className="flex items-center">
          <div className="flex flex-row gap-2 items-center justify-between">
            <p title={testData?.testTitle}>
              {testData?.testTitle.length > 20
                ? testData?.testTitle?.slice(0, 20) + "..."
                : testData?.testTitle}
            </p>
            <Badge
              theme={Theme.Neutral}
              className="text-xs py-2 !bg-amber-100 !border !border-amber-600 !text-amber-600"
              style="filled"
            >
              {getTestType(testData?.testType, testData?.testMode)}
            </Badge>
          </div>
        </div>
        <div className="flex gap-3 py-4 flex-wrap max-w-[80%] overflow-x-scroll">
          <Badge
            theme={Theme.Amethyst}
            className="text-xs h-8 opacity-80"
            style="filled"
          >
            Total Questions: {testData.totalQuestions}
          </Badge>
          <Badge
            theme={Theme.GreenHaze}
            className="text-xs h-8 opacity-80"
            style="filled"
          >
            Correct: {testData.correctCount}
          </Badge>
          <Badge
            theme={Theme.Pumpkin}
            className="text-xs h-8 opacity-80"
            style="filled"
          >
            Incorrect: {testData.incorrectCount}
          </Badge>
          <Badge
            theme={Theme.Ocean}
            className="text-xs h-8 opacity-80"
            style="filled"
          >
            Not Answered: {testData.notAnsweredCount}
          </Badge>
        </div>
      </div>

      <Button
        style="secondary"
        type="button"
        onClick={() =>
          onNavigate(testData.testSession, testData.testMode, testData.testType)
        }
        className="text-xs rounded-full py-2"
      >
        View test
        <LuArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

function ActivityListData({
  dataByDay,
}: {
  dataByDay: IGhActivityByDayResults[] | null;
}) {
  const navigate = useNavigate();

  if (!dataByDay) {
    return (
      <EmptyState
        title="No test data available"
        description="It looks like there aren’t any tests available right now. Please select a valid day."
        icon={<LuFilePenLine className="w-20 h-20" />}
        className="max-w-md"
      />
    );
  }

  const handleTestNavigation = (
    testSession: string,
    testMode: string,
    testType: number
  ) => {
    if (testMode === "Learning Session") {
      navigate(
        `/learning-testanalytics?testSession=${testSession}&testType=${testType}`
      );
    } else {
      navigate(
        `/testanalytics?testSession=${testSession}&testType=${testType}`
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4 px-2 max-h-[260px] overflow-y-auto">
      {dataByDay.map((testData: IGhActivityByDayResults, index: number) => {
        return (
          <Test
            key={index}
            testData={testData}
            onNavigate={handleTestNavigation}
          />
        );
      })}
    </div>
  );
}

export default ActivityListData;
