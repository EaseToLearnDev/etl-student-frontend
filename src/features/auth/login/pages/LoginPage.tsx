// React
import { Link, useNavigate } from "react-router";
import { useState } from "react";

// Icons
import { PiArrowRight } from "react-icons/pi";

// Store
import useDarkModeStore from "../../../../store/useDarkModeStore";
import { useLoginStore } from "../hooks/useLoginStore";

// Utils
import cn from "../../../../utils/classNames";
import { pushToDataLayer } from "../../../../utils/gtm";
import { gtmEvents } from "../../../../utils/gtm-events";

// Services
import { HandleLogin, handleVerifyOtp } from "../login.services";

// Components
import Button from "../../../../components/Button";
import Tabs from "../../../../components/Tabs";
import VerifyOtpContent from "../../../profile/components/VerifyOtpContent";
import InputField from "../../../../components/InputField";

// GTM click id constants
const LOGIN_BUTTON_CLICK_ID = "login_button_click";
const GET_OTP_BUTTON_CLICK_ID = "get_otp_button_click";
const Login_signup_click = "login_signup_click";
const forget_password_button_id = "forget_password_button_click";

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
          : "bg-[var(--sb-ocean-bg-active)]",
      )}
    >
      <div className="flex flex-col lg:flex-row w-full min-h-[100dvh]">
        {/* Left section: Logo and branding */}
        <div
          className={cn(
            "h-[100px] md:h-[120px] lg:h-[100dvh] lg:w-1/2 p-4 lg:p-10 flex flex-col gap-2 lg:gap-5 justify-center items-center flex-shrink-0",
            darkMode
              ? "dark:bg-[var(--sb-ocean-bg-on-press)]"
              : "bg-[var(--sb-ocean-bg-active)]",
          )}
        >
          <img
            src="./etl_logo.svg"
            alt="ETL"
            className="w-[150px] lg:w-[500px] aspect-auto object-contain select-none pointer-events-none"
          />
          {/* <h2 className="text-white select-none">Ease To Learn</h2> */}
        </div>

        {/* Right section: Login/OTP form */}
        <div className="relative flex-1 lg:w-1/2 p-5 bg-[var(--surface-bg-primary)] rounded-t-[25px] lg:rounded-none flex pt-20 justify-center lg:items-center">
          {/* Signup Link */}
          <div className="absolute top-0 right-8 flex justify-center mt-10 gap-1">
            <p>New to ETL?</p>
            <a
              href={`${import.meta.env.VITE_FRONTEND_URL}/create-account`}
              className="!font-bold text-[var(--sb-ocean-bg-active)]"
              id={Login_signup_click}
              onClick={() =>
                pushToDataLayer({
                  event: gtmEvents.login_signup_click,
                })
              }
            >
              Sign Up
            </a>
            <PiArrowRight
              size={16}
              className="text-[var(--sb-ocean-bg-active)]"
            />
          </div>

          <div className="w-full max-w-[500px] h-[500px] flex flex-col gap-5">
            {/* Title */}
            <h2 className="!font-black text-center">
              {token ? "" : "Login With"}
            </h2>

            {/* OTP Verification Section */}
            {token ? (
              <VerifyOtpContent
                onCancel={() => {
                  setToken(null);
                }}
                onVerify={(otp) => handleVerifyOtp(otp, navigate, deviceType)}
                onResend={() => HandleLogin(navigate, loginWith, deviceType)}
                error={errorMessage}
                type={loginWith === "password" ? "Email" : "Mobile"}
                value={userId}
              />
            ) : (
              <>
                {/* Login Form Tabs */}
                <div className="flex justify-center gap-6 mt-2">
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
                <form onSubmit={(e) => e.preventDefault()} noValidate>
                  <div className="flex flex-col gap-6">
                    {/* User ID / Mobile Input */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="userId"
                        className="!font-medium text-[var(--text-secondary)]"
                      >
                        {loginWith === "otp"
                          ? "Mobile Number"
                          : "Email or User ID or Mobile"}
                      </label>

                      <div className="flex items-center rounded-lg border border-[var(--border-secondary)] focus-within:ring-2 focus-within:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out">
                        {loginWith === "otp" && (
                          <span className="flex items-center gap-1 ml-1 px-3 py-3 bg-[var(--surface-bg-secondary)] rounded-lg text-[var(--text-secondary)] select-none">
                            <img
                              src="./india.png"
                              alt="IN"
                              width={18}
                              height={18}
                            />
                            +91
                          </span>
                        )}

                        <input
                          type="text"
                          placeholder={
                            loginWith === "otp"
                              ? "Enter your 10-digit mobile number"
                              : "you@company.com"
                          }
                          className={cn(
                            "flex-1 px-4 py-3 bg-transparent outline-none rounded-r-lg text-base placeholder:text-[var(--text-tertiary)]",
                          )}
                          required
                          value={userId}
                          maxLength={loginWith === "otp" ? 10 : 100}
                          onChange={(e) => {
                            const inputValue = e.target.value.trim();
                            if (loginWith === "otp") {
                              if (!/^\d*$/.test(inputValue)) return;
                            }
                            setCredentials(inputValue, password);
                          }}
                        />
                      </div>
                    </div>

                    {/* Password Input (only for password login) */}
                    {loginWith === "password" && (
                      <InputField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setCredentials(userId, e.target.value)}
                        placeholder="**********"
                      />
                    )}
                  </div>

                  {/* Error Message */}
                  <h6 className="text-red-500 mt-3 text-center">
                    {errorMessage || ""}
                  </h6>

                  {/* Submit Button */}
                  {/* Login CTA - push different GTM clickId/event for 'Login' vs 'Get OTP' */}
                  <Button
                    id={
                      loginWith === "password"
                        ? LOGIN_BUTTON_CLICK_ID
                        : GET_OTP_BUTTON_CLICK_ID
                    }
                    style="primary"
                    type="submit"
                    className="mt-8 w-full"
                    onClick={
                      loading
                        ? undefined
                        : () => {
                            const isPassword = loginWith === "password";
                            const clickId = isPassword
                              ? LOGIN_BUTTON_CLICK_ID
                              : GET_OTP_BUTTON_CLICK_ID;
                            const eventName = isPassword
                              ? gtmEvents.login_button_click
                              : gtmEvents.get_otp_button_click;

                            // Push click id to GTM dataLayer so GTM triggers can use the 'clickId' variable
                            pushToDataLayer({
                              event: eventName,
                              // clickId,
                              // label: isPassword ? "Login" : "Get OTP",
                            });

                            HandleLogin(navigate, loginWith, deviceType);
                          }
                    }
                    disabled={
                      loginWith === "password"
                        ? userId.length === 0 || password.length === 0
                        : userId.length === 0
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
                        id={forget_password_button_id}
                        to={"/forget-password"}
                        className="text-[var(--sb-ocean-bg-active)]"
                        onClick={() =>
                          pushToDataLayer({
                            event: gtmEvents.forget_password_button_click,
                          })
                        }
                      >
                        <h6 className="!font-bold hover:underline">
                          Forgot Password?
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
