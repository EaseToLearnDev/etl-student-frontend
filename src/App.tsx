import { useEffect } from "react";
import Router from './router/Router';
import useDarkModeStore from "./store/useDarkModeStore";
import { usePageTracking } from "./hooks/usePageTracking";

function App() {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  usePageTracking();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return <Router />
}
export default App;
