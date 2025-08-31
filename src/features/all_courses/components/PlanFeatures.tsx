import { BiCheck } from "react-icons/bi";
import type { FeaturesList, SectionList } from "../../shared/types";
import cn from "../../../utils/classNames";

interface PlanFeaturesProps {
  features: FeaturesList[];
  className?: string;
}

export const PlanFeatures = ({
  features,
  className = "",
}: PlanFeaturesProps) => {
  if (features.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <h4>No Table Found</h4>
      </div>
    );
  }

  const renderTable = (sub: SectionList) => (
    <div className="overflow-x-auto">
      <table className="w-full border border-[#cdcecf] rounded-[16px] border-separate border-spacing-0 overflow-hidden">
        <thead>
          <tr className="bg-[var(--surface-bg-tertiary)]">
            <th className="w-[40%] border-b border-[#cdcecf] text-center p  x-2 py-4 text-[16px] font-semibold">
              Features
            </th>
            <th className="border-b border-[#cdcecf] text-center px-2 py-4 text-[16px] font-semibold">
              Pro
            </th>
            <th className="border-b border-[#cdcecf] text-center px-2 py-4 text-[16px] font-semibold">
              Ace
            </th>
          </tr>
        </thead>
        <tbody>
          {sub.list.map((row, k) => (
            <tr key={k}>
              <td className="border-b border-[#cdcecf] text-left px-4 py-2 text-[14px] font-normal">
                {row.title}
              </td>
              {row.list.slice(1).map((opt, m: number) => (
                <td
                  key={m}
                  className="border-b border-[#cdcecf] text-center px-4 py-2 text-[14px] font-normal"
                >
                  {opt.optionLabel ? (
                    opt.optionLabel
                  ) : opt.optionFlag ? (
                    <BiCheck color="#22436e" />
                  ) : (
                    "✖"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className={cn("w-full", className)} id="features">
      {features.map((section, i) =>
        section?.sectionType !== "Others" && section?.list?.length > 0 ? (
          <div
            key={i}
            className="bg-[var(--surface-bg-primary)] border border-[#ccc] rounded-[19px] mt-5 mb-14 p-5 pb-10 transition-all duration-300 ease-[cubic-bezier(0,0,0.5,1)] hover:shadow-[2px_4px_16px_#00000029] hover:scale-[1.01]"
          >
            <h4 className="text-center mb-4">{section.sectionType}</h4>
            {section.list.map((sub, j) => (
              <div
                key={j}
                className="bg-[var(--surface-bg-primary)] mb-4 border border-[#ccc] rounded-[16px] p-8 transition-all duration-300 ease-[cubic-bezier(0,0,0.5,1)] hover:shadow-[2px_4px_16px_#00000029] hover:scale-[1.01]"
              >
                <h5>{sub.title}</h5>
                <p className="mb-4">{sub.description}</p>
                {renderTable(sub)}
              </div>
            ))}
          </div>
        ) : section?.sectionType === "Others" && section?.list?.length > 0 ? (
          section.list.map((sub, j) => (
            <div
              key={j}
              className="bg-[var(--surface-bg-primary)] border border-[#ccc] rounded-[16px] my-12 p-8 transition-all duration-300 ease-[cubic-bezier(0,0,0.5,1)] hover:shadow-[2px_4px_16px_#00000029] hover:scale-[1.01]"
            >
              <h5>{sub.title}</h5>
              <p className="my-4">{sub.description}</p>
              {renderTable(sub)}
            </div>
          ))
        ) : null
      )}
    </div>
  );
};
