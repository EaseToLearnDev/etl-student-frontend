type SubjectReportProps = {
  subject?: string;
  description?: string;
  progress?: number;
  strengths?: string[];
  areas_of_improvement?: string[];
};

/**
 * SubjectReport Component
 * 
 * A reusable UI component to visually display a subject's performance report.
 * This includes the subject title, description, progress status (as a percentage),
 * strengths, and areas that require improvement.
 * 
 * Props:
 * @param {string} [subject] - The name or title of the subject.
 * @param {string} [description] - A short description providing context for the subject.
 * @param {number} [progress] - A numeric value (0–100) indicating the subject's progress percentage.
 * @param {string[]} [strengths] - A list of key strengths or positive areas for the subject.
 * @param {string[]} [areas_of_improvement] - A list of areas that need improvement for the subject.
 */


const SubjectReport = ({
  subject,
  description,
  progress=0,
  strengths,
  areas_of_improvement,
}: SubjectReportProps) => {
  return (
    <>
      <div className="flex max-w-[400px] flex-col items-start gap-[20px]">
        {/* Title Section */}
        <div>
          <h3 className="font-bold leading-[40px] mb-2 text-ellipsis line-clamp-1">{subject}</h3>
          <h6 className="text-[var(--text-tertiary)] font-semibold text-ellipsis line-clamp-2">
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
          <div className="relative h-[12px] w-full max-w-[400px] rounded-full bg-[var(--surface-bg-secondary)]">
            <div
              className="absolute left-0 rounded-full bg-[var(--sb-ocean-bg-active)] transition-all duration-500 ease-in-out h-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Strengths */}
        <div>
          <h6 className="font-semibold mb-2 text-ellipsis line-clamp-2">
            {strengths ? "Strengths" : null}
          </h6>
          <div className="flex items-center gap-[12px]">
            {(Array.isArray(strengths) && strengths.length > 0) && strengths?.map((strength, index) => (
              <p
                key={index}
                className="flex px-[8px] justify-center items-center gap-[10px] rounded-[100px] bg-[#FDE6F0] py-[4px] font-medium text-[#FC6AA1] text-ellipsis line-clamp-2"
                style={{ fontSize: "11px" }}
              >
                {strength}
              </p>
            ))}
          </div>
        </div>

        {/* Areas of Improvements */}
        <div>
          <h6 className="font-semibold mb-2 text-ellipsis line-clamp-2">
            {areas_of_improvement && areas_of_improvement? "Areas of Improvements" : null}
          </h6>
          <div className="flex items-center gap-[12px]">
            {(Array.isArray(areas_of_improvement) && areas_of_improvement.length > 0) && areas_of_improvement?.map((area, index) => (
              <p
                key={index}
                className="flex px-[8px] justify-center items-center gap-[10px] rounded-[100px] bg-[#FDECD7] py-[4px] font-medium text-[#F07225] text-ellipsis line-clamp-2"
                style={{ fontSize: "11px" }}
              >
                {area}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectReport;
