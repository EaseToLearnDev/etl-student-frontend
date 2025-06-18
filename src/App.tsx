import { useEffect } from "react";
import { useDarkMode } from "./contexts/DarkModeContext";

function App() {
  const { darkMode, setDarkMode } = useDarkMode();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    // Example Code
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col items-center gap-4">
        <h1>Hello There</h1>
        <button
          className="bg-[var(--sb-ocean-bg-active)] text-[var(--sb-ocean-content-primary)]
           hover:bg-[var(--sb-ocean-bg-hover)] active:bg-[var(--sb-ocean-bg-on-press)] px-6
           py-2 rounded-md"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle Mode
        </button>
      </div>
    </div>
  );
}

export default App;
