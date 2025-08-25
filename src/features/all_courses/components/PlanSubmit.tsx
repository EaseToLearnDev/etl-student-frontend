"use client";

import { useState, useEffect } from "react";
import { BiCheck } from "react-icons/bi";
import Button from "../../../components/Button";

export const PlanSubmit = ({ submit, promo, code, setCode, applied, setApplied }: any) => {
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    const promoCheck = Object.fromEntries(new URLSearchParams(window.location.search));
    if (promoCheck?.promocode) {
      setPromoCode(promoCheck?.promocode);
      setCode(promoCheck?.promocode);
      promo(promoCheck?.promocode);
    }
  }, []);

  return (
    <div className="w-full p-5 mt-3 flex items-center justify-between bg-[var(--surface-bg-primary)] rounded-md flex-col md:flex-row">
      {/* Promo Code Section */}
      <div className="flex items-center justify-start">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
          placeholder="Enter Promo Code"
          className="text-[var(--text-tertiary)] text-sm font-normal w-[145px] p-3 border border-[var(--text-secondary)] rounded-md"
        />
        <Button
          onClick={() => {
            if (applied) return;
            promo(code);
          }}
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
            <>Apply</>
          )}
        </Button>
      </div>

      {/* Proceed to Pay */}
      <Button
        onClick={() => submit(code)}
        style="neutral"
      >
        Proceed To Pay
      </Button>
    </div>
  );
};

