import useDarkModeStore from "../../store/useDarkModeStore";
import cn from "../../utils/classNames";

const Settings = () => {
  const { darkMode, setDarkMode } = useDarkModeStore();
  
  return (
    <div>
      <h1>Settings</h1>
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

export default Settings;
