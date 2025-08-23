import { Link } from "react-router";
import Button from "../../../../components/Button";
import cn from "../../../../utils/classNames";
import useSignupStore from "../hooks/useSignupStore";
import { handleSignup } from "../signup.services";

const SignupContent = () => {
  const name = useSignupStore((state) => state.name);
  const phone = useSignupStore((state) => state.phone);
  const setName = useSignupStore((state) => state.setName);
  const setPhone = useSignupStore((state) => state.setPhone);

  return (
    <div className="w-full max-w-[480px]">
      {/* Form Header */}
      <h2 className="!font-black text-center">Create a New Account</h2>

      {/* Signup Form */}
      <form className="mt-10" onSubmit={(e) => e.preventDefault()}>
        {/* Form Fields */}
        <div className="flex flex-col gap-6">
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="full_name"
              className="!font-medium text-[var(--text-secondary)]"
            >
              Full Name
            </label>
            <input
              name="full_name"
              type="email"
              placeholder="John Smith"
              className={cn(
                "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
              )}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="text"
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
        </div>

        {/* Signup Button */}
        <Button
          style="primary"
          className="mt-8 w-full"
          type="submit"
          onClick={handleSignup}
        >
          <h6 className="!font-semibold">Signup</h6>
        </Button>
        <h6 className="text-center mt-3 text-[var(--text-secondary)] !font-medium">
          You will receive an OTP on your Phone Number
        </h6>

        {/* Login Link */}
        <div className="flex justify-center mt-10 gap-[2px]">
          <h6>Already have an account? </h6>
          <Link to={"/login"} className="text-[var(--sb-ocean-bg-active)]">
            <h6 className="!font-bold hover:underline">Login</h6>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupContent;
