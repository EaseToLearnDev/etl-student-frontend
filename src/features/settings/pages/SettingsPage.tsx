// Icons
import { MdChevronLeft } from "react-icons/md";

// Hooks
import { useNavigate } from "react-router";
import useDarkModeStore from "../../../store/useDarkModeStore";

// Utils
import cn from "../../../utils/classNames";

/**
 * Settings page component for toggling between dark and light color themes.
 */
const SettingsPage = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useDarkModeStore();

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          className="w-8 h-8 aspect-square bg-[var(--surface-bg-secondary)] hover:bg-[var(--surface-bg-tertiary)] transition-colors duration-100 ease rounded-full flex justify-center items-center"
          onClick={() => navigate(-1)}
        >
          <MdChevronLeft size={24} className="text-[var(--text-secondary)]" />
        </button>
        <h3>Settings</h3>
      </div>
      <div className="mt-8 grid gap-2.5">
        <label className="text-xl font-semibold">Color Theme</label>
        <div className="flex gap-4 items-center">
          <button
            className={cn(
              "w-fit px-6 py-2 bg-[var(--surface-bg-primary)] rounded-md",
              darkMode
                ? "bg-[var(--sb-ocean-bg-active)] border-none font-semibold text-[var(--sb-ocean-content-primary)]"
                : "border-1 border-[var(--border-primary)] hover:bg-[var(--surface-bg-secondary)]"
            )}
            onClick={() => setDarkMode(true)}
          >
            Dark Mode
          </button>
          <button
            className={cn(
              "w-fit px-6 py-2 bg-[var(--surface-bg-primary)] rounded-md",
              !darkMode
                ? "bg-[var(--sb-ocean-bg-active)] border-none font-semibold text-[var(--sb-ocean-content-primary)]"
                : "border-1 border-[var(--border-primary)] hover:bg-[var(--surface-bg-secondary)]"
            )}
            onClick={() => setDarkMode(false)}
          >
            Light Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
