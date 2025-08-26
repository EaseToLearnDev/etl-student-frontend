"use client";

import { BiCheck } from "react-icons/bi";
import Button from "../../../components/Button";

interface PlanSubmitProps {
  submit: () => void;
  promo: (promoCode: string) => void;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  applied: boolean;
  setApplied: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
}

export const PlanSubmit = ({
  submit,
  promo,
  code,
  setCode,
  applied,
  error,
}: PlanSubmitProps) => {
  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!applied && code.trim()) {
      promo(code.trim());
    }
  };

  return (
    <>
      <div className="w-full p-5 mt-3 flex items-center justify-between bg-[var(--surface-bg-primary)] rounded-md flex-col md:flex-row">
        {/* Promo Code Section */}
        <form
          className="flex items-center justify-start"
          onSubmit={handlePromoSubmit}
        >
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Promo Code"
            className="text-[var(--text-tertiary)] text-sm font-normal w-[145px] p-3 border border-[var(--text-secondary)] rounded-md"
          />
          <Button
            type="submit"
            className={`ml-2 text-white hover:bg-[var(--sb-green-haze-bg-hover)] ${
              applied
                ? "bg-[var(--sb-green-haze-bg-active)]/60 cursor-not-allowed flex items-center gap-1"
                : "bg-[var(--sb-green-haze-bg-active)] cursor-pointer"
            }`}
          >
            {applied ? (
              <>
                <BiCheck size={16} /> Applied
              </>
            ) : (
              "Apply"
            )}
          </Button>
        </form>

        {/* Proceed to Pay */}
        <Button onClick={submit} style="neutral">
          Proceed To Pay
        </Button>
      </div>
      {applied && (
        <p className="text-green-600 mt-2">Promo applied successfully 🎉</p>
      )}
      {error && (
        <p className="text-red-600 mt-2">Invalid promo code</p>
      )}
    </>
  );
};
