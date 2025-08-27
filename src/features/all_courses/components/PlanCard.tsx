import type { PriceDetailsList } from "../../shared/types";

interface PlanCardProps {
  plan: PriceDetailsList;
  selected: boolean;
  onSelect: () => void;
}

export const PlanCard = ({ plan, selected, onSelect }: PlanCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`w-full mt-2 rounded-2xl cursor-pointer overflow-hidden min-h-[120px] flex flex-col items-start justify-start border-2 transition
        ${
          selected
            ? "border-[var(--sb-green-haze-bg-active)]"
            : "border-gray-300"
        }
        bg-[var(--surface-bg-primary)]
      `}
    >
      <div className="flex-[0.6] w-full px-5 py-3.5">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`w-[18px] h-[18px] flex items-center justify-center rounded-full border mr-4
                ${
                  selected
                    ? "bg-[var(--sb-green-haze-bg-active)] border-[var(--sb-green-haze-bg-active)]"
                    : "border-gray-300"
                }
              `}
            ></div>
            <h5 className="text-[var(--text-primary)] m-0">{plan?.title}</h5>
          </div>
          <h6 className="text-[var(--text-primary)]">
            Total: ₹ {plan?.salePrice}
          </h6>
        </div>

        <div className="w-full flex items-center justify-between mt-2.5">
          <p className="text-[var(--sb-green-haze-bg-active)]">
            {plan?.discount ? `Save ${plan?.discount}%` : ""}
          </p>
          <p
            className={`flex items-center ${
              plan?.discount
                ? "line-through text-[var(--sb-valencia-bg-active)]"
                : "no-underline text-[var(--text-secondary)]"
            }`}
          >
            <b className="text-[var(--text-secondary)]">
              ₹ {plan?.retailPrice}
            </b>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-[0.4] w-full h-full p-5 bg-[var(--sb-ocean-bg-disabled)]">
        <div className="w-full flex items-center justify-between">
          <p className="text-[var(--sb-ocean-bg-active)]">
            {plan?.description || ""}
          </p>
          <p className="text-[var(--text-secondary)]">
            Price per day: ₹{Math.floor(plan?.salePrice/plan?.validityDuration)}
          </p>
        </div>
      </div>
    </div>
  );
};
