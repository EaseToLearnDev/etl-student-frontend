// React
import { Link, useNavigate } from "react-router";

// Store
import useDarkModeStore from "../../../../store/useDarkModeStore";
import { useLoginStore } from "../store/useLoginStore";

// Utils
import cn from "../../../../utils/classNames";

// Services
import { HandleLogin } from "../login.services";

// Components
import Button from "../../../../components/Button";

/**
 * Login page component for user authentication.
 */
const Login = () => {
  const navigate = useNavigate();
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const errorMessage = useLoginStore((state) => state.error.message);
  const loading = useLoginStore((state) => state.loading);
  const email = useLoginStore((state) => state.email);
  const password = useLoginStore((state) => state.password);
  const setCredentials = useLoginStore((state) => state.setCredentials);

  return (
    // Main Login Container
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
            "h-[200px] lg:h-[100dvh] lg:w-1/2 p-10 flex flex-col gap-5 justify-center items-center flex-shrink-0",
            darkMode
              ? "dark:bg-[var(--sb-ocean-bg-on-press)]"
              : "bg-[var(--sb-ocean-bg-active)]"
          )}
        >
          <img
            src="/logo.svg"
            alt="ETL"
            className="w-full h-full max-w-[480px] max-h-[160px] object-contain select-none"
          />
          <h2 className="text-white select-none">Ease To Learn</h2>
        </div>

        {/* Login Form Section */}
        <div className="flex-1 lg:w-1/2 p-5 bg-[var(--surface-bg-primary)] rounded-t-[25px] lg:rounded-none flex pt-20 justify-center lg:items-center">
          <div className="w-full max-w-[500px]">
            {/* Form Header */}
            <h2 className="!font-black text-center">Login</h2>

            {/* Login Form */}
            <form className="mt-10" onSubmit={(e) => e.preventDefault()}>
              {/* Form Fields */}
              <div className="flex flex-col gap-6">
                {/* Email Field */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="!font-medium text-[var(--text-secondary)]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className={cn(
                      "flex px-4 py-3 items-center gap-2 self-stretch rounded-lg border-1 border-[var(--border-secondary)] text-base",
                      "focus:outline-none focus:ring-2 focus:ring-[var(--sb-ocean-bg-active)] transition-all duration-200 ease-in-out"
                    )}
                    required
                    value={email}
                    onChange={(e) => setCredentials(e.target.value, password)}
                  />
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
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
                    onChange={(e) => setCredentials(email, e.target.value)}
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                style="primary"
                type="submit"
                className="mt-8 w-full"
                onClick={loading ? undefined : () => HandleLogin(navigate)}
              >
                <h6 className="!font-semibold">
                  {loading ? "Loading" : "Login"}
                </h6>
              </Button>
              <h6>{errorMessage ? errorMessage : ""}</h6>

              {/* Sign Up Link */}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
