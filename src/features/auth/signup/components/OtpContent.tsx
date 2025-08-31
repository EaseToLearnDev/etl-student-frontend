// Components
import Button from "../../../../components/Button";
import InputOTP from "../../../../components/InputOTP";
import useSignupStore from "../hooks/useSignupStore";
import { switchPhase } from "../signup.services";
import { SignupPhase } from "../signup.types";
import { Link } from "react-router";

const OtpContent = () => {
  const mobile = useSignupStore((state) => state.phone);
  return (
    <div className="w-full max-w-[480px]">
      {/* Form Header */}
      <h2 className="!font-black text-center">Enter verification code</h2>
      <h6 className="text-center mt-2">
        Enter the 6-digit that we have sent via the phone number +91
        {mobile}
      </h6>

      {/* Signup Form */}
      <form className="mt-29" onSubmit={(e) => e.preventDefault()}>
        {/* Form Fields */}
        <InputOTP length={6} />
        Shared global state of API responses
        {/* Signup Button */}
        <Button style="primary" className="mt-8 w-full">
          <Link to="/onboarding">
            <h6 className="!font-semibold">Continue</h6>
          </Link>
        </Button>
        <button
          className="w-fit mx-auto flex items-center justify-center"
          onClick={() => switchPhase(SignupPhase.ChangeNumber)}
        >
          <h6 className="text-center mt-3 !font-semibold cursor-pointer text-[var(--sb-ocean-bg-active)]">
            Change Number
          </h6>
        </button>
        {/* Login Link */}
        <div className="flex justify-center mt-10 gap-[2px]">
          <h6>Didn't receive OTP? </h6>
          <button className="text-[var(--sb-ocean-bg-active)]">
            <h6 className="!font-bold hover:underline">Send Again</h6>
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpContent;
