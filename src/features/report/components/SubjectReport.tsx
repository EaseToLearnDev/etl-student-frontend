import { Link } from "react-router";
import Badge from "../../../components/Badge";
import { Theme } from "../../../utils/colors";

interface SubjectReportProps {
  subject?: string;
  description?: string;
  progress?: number;
  strengths?: string[];
  areas_of_improvement?: string[];
}

/**
 * SubjectReport Component
 *
 * A reusable UI component to visually display a subject's performance report.
 * This includes the subject title, description, progress status (as a percentage),
 * strengths, and areas that require improvement.
 */
const SubjectReport = ({
  subject,
  description,
  progress = 0,
  strengths,
  areas_of_improvement,
}: SubjectReportProps) => {
  return (
    <Link to={`/report/overview/performance/${subject?.toLowerCase()}`}>
      <div className="flex max-w-[550px] flex-col items-start gap-[20px] p-5 bg-[var(--surface-bg-primary)] hover:bg-[var(--surface-bg-secondary)] rounded-xl transition-colors duration-200 ease-in-out">
        {/* Title Section */}
        <div>
          <h5 className="font-bold leading-[40px] mb-2 text-ellipsis line-clamp-1">
            {subject}
          </h5>
          <h6 className="text-[var(--text-tertiary)] font-semibold">
            {description}
          </h6>
        </div>

        {/* Progress Status */}
        <div className="w-full">
          <div className="flex justify-between items-center w-full mb-2">
            <h6 className="font-semibold text-ellipsis line-clamp-2">
              Subject Progress
            </h6>
            <p
              className="text-[var(--sb-ocean-bg-active)] text-right font-bold text-ellipsis line-clamp-2"
              style={{ fontSize: "18px" }}
            >
              {progress}%
            </p>
          </div>
          <div className="relative h-[12px] w-full max-w-[550px] rounded-full bg-[var(--surface-bg-secondary)]">
            <div
              className="absolute left-0 rounded-full bg-[var(--sb-ocean-bg-active)] transition-all duration-550 ease-in-out h-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Strengths */}
        {strengths && Array.isArray(strengths) && strengths?.length > 0 ? (
          <div>
            <h6 className="font-semibold mb-2 text-ellipsis line-clamp-2">
              Strengths
            </h6>
            <div className="flex flex-wrap items-center gap-[12px]">
              {strengths?.map((strength, index) => (
                <Badge key={index} theme={Theme.Sakura} style="filled">
                  <span>{strength}</span>
                </Badge>
              ))}
            </div>
          </div>
        ) : null}

        {/* Areas of Improvements */}
        {areas_of_improvement &&
        Array.isArray(areas_of_improvement) &&
        areas_of_improvement?.length > 0 ? (
          <div>
            <h6 className="font-semibold mb-2 text-ellipsis line-clamp-2">
              Areas of Improvements
            </h6>
            <div className="flex flex-wrap items-center gap-[12px]">
              {areas_of_improvement?.map((item, index) => (
                <Badge key={index} theme={Theme.Pumpkin} style="filled">
                  <span>{item}</span>
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default SubjectReport;
