import Button from "../../../../components/Button";
import cn from "../../../../utils/classNames";
import useSignupStore from "../hooks/useSignupStore";
import { switchPhase } from "../signup.services";
import { SignupPhase } from "../signup.types";

const ChangeNumberContent = () => {
  const phone = useSignupStore((state) => state.phone);
  const setPhone = useSignupStore((state) => state.setPhone);
  return (
    <div className="w-full max-w-[480px]">
      {/* Form Header */}
      <h2 className="!font-black text-center">Update Phone Number</h2>
      <h6 className="text-center mt-2">
        Enter the 10-digit phone number you'd like to use to sign up. We'll send
        a verification code to this number.
      </h6>

      {/* Signup Form */}
      <form className="mt-29">
        {/* Form Fields */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="!font-medium text-[var(--text-secondary)]"
          >
            Phone Number
          </label>
          <input
            type="text"
            placeholder="123-456-7890"
            className={cn(
              "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
              "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
            )}
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Signup Button */}
        <Button style="primary" className="mt-8 w-full" onClick={() => switchPhase(SignupPhase.Otp)}>
          <h6 className="!font-semibold">Continue</h6>
        </Button>
      </form>
    </div>
  );
};

export default ChangeNumberContent;
