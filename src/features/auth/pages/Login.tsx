// React
import { Link } from "react-router";

// Store
import useDarkModeStore from "../../../store/useDarkModeStore";

// Utils
import cn from "../../../utils/classNames";

// Components
import Button from "../../../components/Button";


/**
 * Login page component for user authentication.
 */
const Login = () => {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);
  return (
    // Main Login Container
    <div className={cn("w-full min-h-[100dvh]", darkMode ? "bg-[var(--sb-ocean-bg-on-press)]" : "bg-[var(--sb-ocean-bg-active)]")}>
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
          <h2 className="text-white">Ease To Learn</h2>
        </div>
        
        {/* Login Form Section */}
        <div className="flex-1 lg:w-1/2 p-5 bg-[var(--surface-bg-primary)] rounded-t-[25px] lg:rounded-none flex pt-20 justify-center lg:items-center">
          <div className="w-full max-w-[500px]">
            {/* Form Header */}
            <h2 className="!font-black text-center">Create a New Account</h2>
            
            {/* Login Form */}
            <form className="mt-10">
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
                  />
                </div>
              </div>
              
              {/* Login Button */}
              <Button style="primary" className="mt-8 w-full" onClick={toggleDarkMode}>
                <h6 className="!font-semibold">Login</h6>
              </Button>
              
              {/* Sign Up Link */}
              <div className="flex justify-center mt-10 gap-[2px]">
                <h6>Don't have an account? </h6>
                <Link
                  to={"/signup"}
                  className="text-[var(--sb-ocean-bg-active)]"
                >
                  <h6 className="!font-bold hover:underline">Sign up</h6>
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
