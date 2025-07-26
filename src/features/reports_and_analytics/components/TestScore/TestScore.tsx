// Icons
import { FaBook } from "react-icons/fa";

// Utils
import { colors, Theme } from "../../../../utils/colors";
import { generateRemark } from "./test_score.utils";
import Badge from "../../../../components/Badge";

type TestScoreProps = {
  name?: string;
  type?: string;
  score?: number;
};

/**
 * Displays a test score card with an icon, title, tag, score, and grade.
 */

const TestScore = ({ name, type, score }: TestScoreProps) => {
  const remark = generateRemark(score || 0);
  const gradeTheme = colors[remark.theme || Theme.Neutral];

  return (
    <div className="flex items-center gap-5 px-4 py-3 md:px-3 md:py-2  bg-[var(--surface-bg-primary)] hover:bg-[var(--surface-bg-secondary)] rounded-lg transition-colors duration-100 ease-in">
      {/* Icon section */}
      <div className="bg-[var(--surface-bg-secondary)] rounded-md p-[12px]">
        {/* Book icon representing the test/subject */}
        <FaBook size={20} />
      </div>

      {/* Details section: title and tag */}
      <div className="flex flex-1 flex-col gap-[8px] items-start">
        {/* Test or subject title */}
        <h6 className="text-ellipsis line-clamp-1">{name}</h6>
        {/* Tag for the test, e.g., term or type */}
        <Badge theme={Theme.Ocean}>
          <span>{type}</span>
        </Badge>
      </div>

      {/* Score and grade section */}
      <div className="flex flex-col items-end">
        {/* Numeric score */}
        <h4>{score}</h4>
        {/* Grade with dynamic color */}
        <p style={{ color: gradeTheme.bg.active }}>{remark.text}</p>
      </div>
    </div>
  );
};

export default TestScore;
