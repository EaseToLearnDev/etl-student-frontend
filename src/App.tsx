import { useEffect } from "react";
import Router from './router/Router';
import useDarkModeStore from "./store/useDarkModeStore";

function App() {
  const darkMode = useDarkModeStore((state) => state.darkMode);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return <Router />
}
export default App;
