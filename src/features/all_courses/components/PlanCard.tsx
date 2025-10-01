// Types
import type { PriceDetailsList } from "../../shared/types";

// Utils
import cn from "../../../utils/classNames";
import { getPriceValue } from "../utils/getPrice";

interface PlanCardProps {
  plan: PriceDetailsList;
  selected: boolean;
  onSelect: () => void;
}

export const PlanCard = ({ plan, selected, onSelect }: PlanCardProps) => {
  const salePrice = getPriceValue(plan.salePrice);
  const retailPrice = getPriceValue(plan.retailPrice);

  return (
    <div
      onClick={onSelect}
      className={`w-full rounded-2xl cursor-pointer overflow-hidden min-h-[100px] flex flex-col items-start justify-start border-1 transition
        ${
          selected
            ? "border-[var(--sb-ocean-bg-active)]/70"
            : "border-[var(--border-secondary)]"
        }
        bg-[var(--surface-bg-primary)]
      `}
    >
      <div className="flex-[0.6] w-full px-5 py-3.5">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={cn(
                "w-4 h-4 aspect-square flex items-center justify-center rounded-full border mr-2 border-[var(--border-secondary)]"
              )}
            >
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  selected ? "bg-[var(--sb-ocean-bg-active)]" : ""
                )}
              />
            </div>
            <h5 className="text-[var(--text-primary)] m-0">{plan?.title}</h5>
          </div>
          <h6 className="text-[var(--text-primary)]">Total: ₹ {salePrice}</h6>
        </div>

        <p className="mt-2">{plan.validityDate}</p>

        <div className="w-full flex items-center justify-between mt-1">
          <p className="text-[var(--sb-green-haze-bg-active)]">
            {plan?.discount ? `Save ${plan?.discount}%` : ""}
          </p>
          <span
            className={`flex items-center text-[var(--text-tertiary)] ${
              plan?.discount ? "line-through" : "no-underline"
            }`}
          >
            ₹ {retailPrice}
          </span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-[0.4] w-full h-full px-4 py-2 bg-[var(--sb-ocean-bg-disabled)]">
        <div className="w-full flex gap-4 items-center justify-between">
          <p className="text-[var(--sb-ocean-bg-active)] max-w-[28ch]">
            {plan?.description || ""}
          </p>
          <p className="text-[var(--text-secondary)]">
            {`₹${Math.floor(salePrice / plan?.validityDuration)}/day`}
          </p>
        </div>
      </div>
    </div>
  );
};
