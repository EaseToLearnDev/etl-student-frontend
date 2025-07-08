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
  progress,
  strengths,
  areas_of_improvement,
}: SubjectReportProps) => {
  return (
    <>
      <div className="flex w-[415px] flex-col items-start gap-[20px]">
        {/* Title Section */}
        <div>
          <h3 className="font-bold leading-[40px] mb-2">{subject}</h3>
          <h6 className="text-[var(--text-tertiary)] font-semibold leading-[24px]">
            {description}
          </h6>
        </div>

        {/* Progress Status */}
        <div className="w-full">
          <div className="flex justify-between items-center w-full mb-2">
            <h6 className="leading-[24px] tracking-[var(--ls-015)] font-semibold">
              Subject Progress
            </h6>
            <p
              className="text-[var(--sb-ocean-bg-active)] text-right font-bold"
              style={{ fontSize: "18px" }}
            >
              {progress}%
            </p>
          </div>
          <div className="relative h-[12px] rounded-full bg-[var(--surface-bg-secondary)] overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-[var(--sb-ocean-bg-active)] transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Strengths */}
        <div>
          <h6 className="leading-[24px] tracking-[0.15px] font-semibold mb-2">
            Strengths
          </h6>
          <div className="flex items-center gap-[12px]">
            {strengths?.map((strength, index) => (
              <p
                key={index}
                className="flex px-[8px] justify-center items-center gap-[10px] rounded-[100px] bg-[#FDE6F0] py-[4px] font-medium text-[#FC6AA1] leading-[16px] tracking-[var(--ls-05)]"
                style={{ fontSize: "11px" }}
              >
                {strength}
              </p>
            ))}
          </div>
        </div>

        {/* Areas of Improvements */}
        <div>
          <h6 className="leading-[24px] tracking-[0.15px] font-semibold mb-2">
            Areas of Improvements
          </h6>
          <div className="flex items-center gap-[12px]">
            {areas_of_improvement?.map((area, index) => (
              <p
                key={index}
                className="flex px-[8px] justify-center items-center gap-[10px] rounded-[100px] bg-[#FDECD7] py-[4px] font-medium text-[#F07225] leading-[16px] tracking-[var(--ls-05)]"
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
