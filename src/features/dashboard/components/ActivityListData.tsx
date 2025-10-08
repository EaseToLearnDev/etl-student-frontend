import EmptyState from "../../../components/EmptyState";
import type { IGhActivityByDayResults } from "../../../global/services/getGhActivityByDay";
import Badge from "../../../components/Badge";
import { Theme } from "../../../utils/colors";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";
import { LuFilePenLine } from "react-icons/lu";

function Test({
    testData,
    onNavigate,
}: {
    testData: IGhActivityByDayResults;
    onNavigate: (testSession: string, testMode: string) => void;
}) {
    return (
        <div className="w-full py-2  border-b  border-(--border-primary) flex justify-between items-center">
            <div>
                <p>{testData.testTitle}</p>
                <div className="flex gap-3 py-4 flex-wrap">
                    <Badge theme={Theme.Amethyst} className="text-xs h-8" style="filled">
                        Total Questions: {testData.totalQuestions}
                    </Badge>
                    <Badge theme={Theme.GreenHaze} className="text-xs h-8" style="filled">
                        Correct: {testData.correctCount}
                    </Badge>
                    <Badge theme={Theme.Pumpkin} className="text-xs h-8" style="filled">
                        Incorrect: {testData.incorrectCount}
                    </Badge>
                    <Badge theme={Theme.Ocean} className="text-xs h-8" style="filled">
                        Not Answered: {testData.notAnsweredCount}
                    </Badge>
                </div>
            </div>
            <Button
                style="secondary"
                type="button"
                onClick={() => onNavigate(testData.testSession, testData.testMode)}
                className="text-xs rounded-full py-2"
            >
                View Test
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
        return <EmptyState
            title='No test data available'
            description='It looks like there aren’t any tests available right now. Please select a valid day.'
            icon={<LuFilePenLine className='w-20 h-20' />}
            className='max-w-md'
        />
    }

    const handleTestNavigation = (testSession: string, testMode: string) => {
        if (testMode === "Learning Session") {
            navigate(`/learning-testanalytics?testSession=${testSession}`);
        } else {
            navigate(`/testanalytics?testSession=${testSession}`);
        }
    }

    return (
        <div className="flex flex-col gap-4 pt-6">
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
