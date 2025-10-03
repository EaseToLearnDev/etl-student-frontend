import useDarkModeStore from "../store/useDarkModeStore";

const ThemeToggle = ({ onClose }: { onClose: () => void }) => {
  const { darkMode, setDarkMode } = useDarkModeStore();

  return (
    <label className="flex items-center mt-2 cursor-pointer gap-2">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={(e) => {
          setDarkMode(e.target.checked);
          onClose();
        }}
        className="sr-only"
      />
      <div
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
          darkMode
            ? "bg-[var(--sb-ocean-bg-active)]"
            : "bg-[var(--surface-bg-tertiary)]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            darkMode ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      <p className="text-[var(--text-primary)]">
        {darkMode ? "Dark Mode" : "Light Mode"}
      </p>
    </label>
  );
};

export default ThemeToggle;
