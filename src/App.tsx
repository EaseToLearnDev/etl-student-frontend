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
        <div className="flex flex-col items-center gap-4">
          <h1>Hello There</h1>
          <button
            className="bg-[var(--sb-ocean-bg-active)] text-[var(--sb-ocean-content-primary)]
           hover:bg-[var(--sb-ocean-bg-hover)] active:bg-[var(--sb-ocean-bg-on-press)] px-6
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
