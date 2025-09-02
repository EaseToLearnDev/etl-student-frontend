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
  count: number;
}

/**
 * Renders a group of status indicators for test questions, displaying the count of questions
 * in each status category (Not Visited, Not Attempted, Attempted, Marked for Review).
 *
 * Uses Zustand store to retrieve the counts for each status and displays them with themed
 * colors and labels.
 */
const StatusGroup = () => {
  const counts = useTestStore(
    useShallow((s) => ({
      notVisited: s.getQuestionCountByStatus(QuestionStatus.NOT_VISITED),
      notAttempted: s.getQuestionCountByStatus(QuestionStatus.NOT_ATTEMPTED),
      attempted: s.getQuestionCountByStatus(QuestionStatus.ATTEMPTED),
      markedForReview: s.getQuestionCountByStatus(QuestionStatus.MARKED_FOR_REVIEW),
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
  return (
    <div className="relative w-full grid grid-cols-2 gap-5">
      {statusList.map((status) => {
        const statusTheme = colors[status.theme];
        return (
          <div key={status.id} className="flex gap-2 items-center">
            <div
              className="size-[24px] aspect-square flex justify-center items-center rounded-full"
              style={{
                background: statusTheme.bg.active,
                color: statusTheme.content.primary,
              }}
            >
              {status.count}
            </div>
            <p>{status.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatusGroup;
