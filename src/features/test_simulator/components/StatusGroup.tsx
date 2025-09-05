// React
import { useShallow } from "zustand/react/shallow";

// Types
import { QuestionStatus } from "../test_simulator.types";

// Stores
import useTestStore from "../store/useTestStore";

// Utils
import { colors, Theme } from "../../../utils/colors";

interface Status {
  id: string;
  text: string;
  theme: Theme;
  count?: number;
}

/**
 * Renders a group of status indicators for test questions, displaying the count of questions
 * in each status category (Not Visited, Not Attempted, Attempted, Marked for Review).
 *
 * Uses Zustand store to retrieve the counts for each status and displays them with themed
 * colors and labels.
 */
const StatusGroup = () => {
  const { correctResponseEnabled } = useTestStore((s) => s.features);
  const counts = useTestStore(
    useShallow((s) => ({
      notVisited: s.getQuestionCountByStatus(QuestionStatus.NOT_VISITED),
      notAttempted: s.getQuestionCountByStatus(QuestionStatus.NOT_ATTEMPTED),
      attempted: s.getQuestionCountByStatus(QuestionStatus.ATTEMPTED),
      markedForReview: s.getQuestionCountByStatus(
        QuestionStatus.MARKED_FOR_REVIEW
      ),
      correct: s.testData?.correctCount,
      incorrect: s.testData?.incorrectCount,
      notAnswered: s.testData?.notAnsweredCount,
    }))
  );
  const statusList: Status[] = [
    {
      id: "not-visited",
      text: "Not Visited",
      theme: Theme.Sakura,
      count: counts.notVisited,
    },
    {
      id: "not-attempted",
      text: "Not Attempted",
      theme: Theme.Pumpkin,
      count: counts.notAttempted,
    },
    {
      id: "attempted",
      text: "Attempted",
      theme: Theme.Ocean,
      count: counts.attempted,
    },
    {
      id: "marked-for-review",
      text: "Marked for Review",
      theme: Theme.Sunglow,
      count: counts.markedForReview,
    },
  ];
  const reviewStatusList: Status[] = [
    {
      id: "correct",
      text: "Correct",
      theme: Theme.GreenHaze,
      count: counts.correct,
    },
    {
      id: "incorrect",
      text: "Incorrect",
      theme: Theme.Valencia,
      count: counts.incorrect,
    },
    {
      id: "not_answered",
      text: "Not Answered",
      theme: Theme.Neutral,
      count: counts.notAnswered,
    },
  ];
  return (
    <div className="relative w-full grid grid-cols-2 gap-5">
      {(correctResponseEnabled ? reviewStatusList : statusList)?.map(
        (status) => {
          const statusTheme = colors[status.theme];
          return (
            <div key={status.id} className="flex gap-2 items-center">
              <div
                className="size-[24px] aspect-square flex justify-center items-center rounded-full"
                style={{
                  border: `solid 1px ${statusTheme.bg.active}`,
                }}
              >
                <span>{status.count}</span>
              </div>
              <p>{status.text}</p>
            </div>
          );
        }
      )}
    </div>
  );
};

export default StatusGroup;
