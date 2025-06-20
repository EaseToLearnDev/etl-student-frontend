import { useEffect } from "react";
import HydrogenLayout from "./layouts/hydrogen/components/MainLayout";
import useDarkModeStore from "./store/useDarkModeStore";

function App() {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    // Example Code
    <HydrogenLayout>
      <div>
        <div className="min-h-[800px] grid items-center place-items-center">
          <button
            className="text-[var(--text-primary)] border-1 border-[var(--border-primary)]
           hover:bg-[var(--surface-bg-tertiary)] px-6
           py-2 rounded-md"
            onClick={toggleDarkMode}
          >
            Toggle Mode
          </button>
        </div>
      </div>
    </HydrogenLayout>
  );
}

export default App;
