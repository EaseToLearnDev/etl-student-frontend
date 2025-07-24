import { FaBook } from "react-icons/fa";
// Color mapping for different grades
const gradeColorMap: Record<string, string> = {
  Good: "var(--sb-sunglow-bg-active)",
  Excellent: "var(--sb-pumpkin-bg-active)",
  "Need of Improvement": "var(--sb-sakura-bg-active)",
};

type TestScoresProps = {
    title?: string;
    tag?: string;
    score?: number;
    grade?: string;
};

/**
 * TestScores Component
 *
 * Displays a test score card with an icon, title, tag, score, and grade.
 * The grade is color-coded based on its value (e.g., Good, Excellent, Need of Improvement).
 *
 * ## Props:
 * @param {string} [title] - The title of the test or subject (e.g., "Math Test").
 * @param {string} [tag] - A short descriptor or tag for the test (e.g., "Term 1").
 * @param {number} [score] - The numeric score achieved (e.g., 85).
 * @param {string} [grade] - The grade category (e.g., "Good", "Excellent", "Need of Improvement").
 *
 * ## Notes:
 * - The color of the grade text is determined by a predefined mapping in `gradeColorMap`.
 * - If `grade` is not recognized or not provided, a default blue color (`--sb-ocean-bg-active`) is used.
 * - Uses `react-icons` for the book icon.
 */

const TestScores = ({title, tag, score, grade}: TestScoresProps) => {
    // Selects the color for the grade text based on the grade value; defaults to blue if not found
    const gradeColor = grade ? gradeColorMap[grade] : "var(--sb-ocean-bg-active)";
    const gradeText = grade || "N/A";
  return (
    <>
      {/* Card container for the test score */}
      <div className="flex items-center px-[12px] py-[8px] gap-[20px] max-w-xl sm:gap-5 sm:px-4 sm:py-3">
        {/* Icon section */}
        <div className="bg-gray-100 rounded-md p-[12px]">
          {/* Book icon representing the test/subject */}
          <FaBook size={40} />
        </div>

        {/* Details section: title and tag */}
        <div className="flex flex-1 flex-col gap-[8px] items-start">
          {/* Test or subject title */}
          <h5 className="text-ellipsis line-clamp-1">{title}</h5>
          {/* Tag for the test, e.g., term or type */}
          <p
            className="flex px-[8px] justify-center items-center gap-[10px] rounded-[100px] bg-[var(--sb-ocean-bg-disabled)] text-[var(--sb-ocean-bg-active)] py-[4px] font-medium text-ellipsis line-clamp-1"
          >
            {tag}
          </p>
        </div>

        {/* Score and grade section */}
        <div className="flex flex-col items-end">
            {/* Numeric score */}
            <h4>{score}</h4>
            {/* Grade with dynamic color */}
            <p style={{color: gradeColor}}>{gradeText}</p>
        </div>
      </div>
    </>
  );
};

export default TestScores;
