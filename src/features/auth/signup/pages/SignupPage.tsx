// Store
import useDarkModeStore from "../../../../store/useDarkModeStore";

// Utils
import cn from "../../../../utils/classNames";
import OtpContent from "../components/OtpContent";

// Components
import SignupContent from "../components/SignupContent";
import useSignupStore from "../hooks/useSignupStore";
import { SignupPhase, type SignupPhasesType } from "../signup.types";
import ChangeNumberContent from "../components/ChangeNumberContent";

const SignupPage = () => {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const currentPhase = useSignupStore((state) => state.currentPhase);

  const phases: SignupPhasesType = {
    [SignupPhase.Signup]: <SignupContent />,
    [SignupPhase.Otp]: <OtpContent />,
    [SignupPhase.ChangeNumber]: <ChangeNumberContent />,
  };

  return (
    // Main Signup Container
    <div
      className={cn(
        "w-full min-h-[100dvh]",
        darkMode
          ? "bg-[var(--sb-ocean-bg-on-press)]"
          : "bg-[var(--sb-ocean-bg-active)]"
      )}
    >
      <div className="flex flex-col lg:flex-row w-full min-h-[100dvh]">
        {/* Logo Section */}
        <div
          className={cn(
            "h-[100px] md:h-[120px] lg:h-[100dvh] lg:w-1/2 p-10 flex flex-col gap-5 justify-center items-center flex-shrink-0",
            darkMode
              ? "dark:bg-[var(--sb-ocean-bg-on-press)]"
              : "bg-[var(--sb-ocean-bg-active)]"
          )}
        >
          <img
            src="/logo.svg"
            alt="ETL"
            className="w-[60px] lg:w-full lg:h-full lg:max-w-[480px] lg:max-h-[160px] aspect-auto object-contain select-none"
          />
          <h2 className="text-white select-none">Ease To Learn</h2>
        </div>

        {/* Signup Form Section */}
        <div className="flex-1 lg:w-1/2 p-5 bg-[var(--surface-bg-primary)] rounded-t-[25px] lg:rounded-none flex pt-20 justify-center lg:items-center">
          <div className="w-full max-w-[500px]">
            {/* Current Phase Content */}
            {phases[currentPhase]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
