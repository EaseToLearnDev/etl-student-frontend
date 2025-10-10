// React
import { useEffect, type ReactNode } from "react";

// Store
import useDarkModeStore from "../../../../store/useDarkModeStore";

// Utils
import cn from "../../../../utils/classNames";

// Hooks
import { useToastStore } from "../../../../global/hooks/useToastStore";
import { useForgetPassStore } from "../hooks/useForgetPassStore";

// Components
import VerifyOtpPhase from "../components/VerifyOtpPhase";
import EnterUserIdPhase from "../components/EnterUserIdPhase";
import { ForgetPasswordPhase } from "../forgetPassword.types";
import SuccessPhase from "../components/SuccessPhase";
import { Toast } from "../../../../components/Toast";

/**
 * Login page component for user authentication (Password + OTP).
 */
const ForgetPasswordPage = () => {
  // Hooks and state
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const reset = useForgetPassStore((state) => state.reset);
  const currentPhase = useForgetPassStore((state) => state.currentPhase);
  const showToast = useToastStore((state) => state.showToast);
  const toastData = useToastStore((state) => state.toastData);
  const resetToast = useToastStore((state) => state.resetToast);
  const phases: Record<ForgetPasswordPhase, ReactNode> = {
    [ForgetPasswordPhase.EnterUserId]: <EnterUserIdPhase />,
    [ForgetPasswordPhase.VerifyOTP]: <VerifyOtpPhase />,
    [ForgetPasswordPhase.Success]: <SuccessPhase />,
  };

  useEffect(() => {
    return reset;
  }, []);

  return (
    // Main container
    <div
      className={cn(
        "w-full min-h-[100dvh]",
        darkMode
          ? "bg-[var(--sb-ocean-bg-on-press)]"
          : "bg-[var(--sb-ocean-bg-active)]"
      )}
    >
      <div className="flex flex-col lg:flex-row w-full min-h-[100dvh]">
        {/* Left section: Logo and branding */}
        <div
          className={cn(
            "h-[100px] md:h-[120px] lg:h-[100dvh] lg:w-1/2 p-4 lg:p-10 flex flex-col gap-2 lg:gap-5 justify-center items-center flex-shrink-0",
            darkMode
              ? "dark:bg-[var(--sb-ocean-bg-on-press)]"
              : "bg-[var(--sb-ocean-bg-active)]"
          )}
        >
          <img
            src="./logo.svg"
            alt="ETL"
            className="w-[60px] lg:w-full lg:h-full lg:max-w-[480px] lg:max-h-[160px] aspect-auto object-contain select-none"
          />
          <h2 className="text-white select-none">Ease To Learn</h2>
        </div>

        {/* Right section: Forget Password/New Password form */}
        <div className="flex-1 lg:w-1/2 p-5 bg-[var(--surface-bg-primary)] rounded-t-[25px] lg:rounded-none flex pt-20 justify-center lg:items-center">
          <div className="w-full max-w-[500px] h-[500px] flex flex-col gap-5">
            {phases[currentPhase]}
          </div>
        </div>
      </div>
      {showToast && (
        <Toast
          title={toastData?.title || ""}
          description={toastData?.description}
          onExpire={resetToast}
          duration={2000}
          type={toastData?.type}
        />
      )}
    </div>
  );
};

export default ForgetPasswordPage;
