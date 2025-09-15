// React
import { Link, useNavigate } from "react-router";
import { useState } from "react";

// Store
import useDarkModeStore from "../../../../store/useDarkModeStore";
import { useLoginStore } from "../hooks/useLoginStore";

// Utils
import cn from "../../../../utils/classNames";

// Services
import { HandleLogin, handleVerifyOtp } from "../login.services";

// Components
import Button from "../../../../components/Button";
import Tabs from "../../../../components/Tabs";
import VerifyOtpContent from "../../../profile/components/VerifyOtpContent";

/**
 * Login page component for user authentication (Password + OTP).
 */
const LoginPage = () => {
  // Hooks and state
  const navigate = useNavigate();
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const errorMessage = useLoginStore((state) => state.error.message);
  const loading = useLoginStore((state) => state.loading);
  const userId = useLoginStore((state) => state.userId);
  const password = useLoginStore((state) => state.password);
  const token = useLoginStore((state) => state.token);
  const setToken = useLoginStore((state) => state.setToken);
  const setCredentials = useLoginStore((state) => state.setCredentials);
  const reset = useLoginStore((state) => state.reset);

  const [loginWith, setLoginWith] = useState("password");

  const deviceType = new URLSearchParams(location.search).get("device_type");

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
            src="/logo.svg"
            alt="ETL"
            className="w-[60px] lg:w-full lg:h-full lg:max-w-[480px] lg:max-h-[160px] aspect-auto object-contain select-none"
          />
          <h2 className="text-white select-none">Ease To Learn</h2>
        </div>

        {/* Right section: Login/OTP form */}
        <div className="flex-1 lg:w-1/2 p-5 bg-[var(--surface-bg-primary)] rounded-t-[25px] lg:rounded-none flex pt-20 justify-center lg:items-center">
          <div className="w-full max-w-[500px] h-[500px] flex flex-col gap-5">
            {/* Title */}
            <h2 className="!font-black text-center">{token ? "" : "Login"}</h2>

            {/* OTP Verification Section */}
            {token ? (
              <VerifyOtpContent
                onCancel={() => setToken(null)}
                onVerify={handleVerifyOtp}
                onResend={() => HandleLogin(navigate, loginWith, deviceType)}
                error={errorMessage}
                secondaryTitle="Change Number"
              />
            ) : (
              <>
                {/* Login Form Tabs */}
                <div className="flex justify-center gap-6 mt-6">
                  <Tabs
                    tabs={["Password", "OTP"]}
                    selectedIndex={loginWith === "password" ? 0 : 1}
                    onSelect={(index) => {
                      if (index === 0) {
                        setLoginWith("password");
                        setCredentials(userId, "");
                        reset();
                      } else {
                        setLoginWith("otp");
                        reset();
                      }
                    }}
                    activeTabClassName="bg-[var(--sb-ocean-bg-active)] text-white"
                  />
                </div>

                {/* Login Form */}
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-6">
                    {/* User ID / Mobile Input */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="userId"
                        className="!font-medium text-[var(--text-secondary)]"
                      >
                        {loginWith === "otp"
                          ? "Mobile Number"
                          : "Email or User ID"}
                      </label>
                      <input
                        type="text"
                        placeholder={
                          loginWith === "otp"
                            ? "Enter your mobile number"
                            : "you@company.com"
                        }
                        className={cn(
                          "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                          "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
                        )}
                        required
                        value={userId}
                        onChange={(e) => {
                          const inputValue = e.target.value.trim();
                          if (loginWith === "otp") {
                            if (isNaN(Number(inputValue))) return;
                          }
                          setCredentials(e.target.value, password);
                        }}
                      />
                    </div>

                    {/* Password Input (only for password login) */}
                    {loginWith === "password" && (
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="password"
                          className="!font-medium text-[var(--text-secondary)]"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="**********"
                          className={cn(
                            "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                            "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
                          )}
                          required
                          value={password}
                          onChange={(e) =>
                            setCredentials(userId, e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Error Message */}
                  <h6 className="text-red-500 mt-3 text-center">
                    {errorMessage || ""}
                  </h6>

                  {/* Submit Button */}
                  <Button
                    style="primary"
                    type="submit"
                    className="mt-8 w-full"
                    onClick={
                      loading
                        ? undefined
                        : () => HandleLogin(navigate, loginWith, deviceType)
                    }
                  >
                    <h6 className="!font-semibold">
                      {loading
                        ? "Loading"
                        : loginWith === "password"
                        ? "Login"
                        : "Get OTP"}
                    </h6>
                  </Button>

                  {/* Forget Password Link (only for password login) */}
                  {loginWith === "password" && (
                    <div className="flex justify-center mt-10 gap-[2px]">
                      <Link
                        to={"/forget-password"}
                        className="text-[var(--sb-ocean-bg-active)]"
                      >
                        <h6 className="!font-bold hover:underline">
                          Forget Password?
                        </h6>
                      </Link>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
