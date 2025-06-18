import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

// Types
type DarkModeContextType = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

type DarkModeProviderProps = {
  children: ReactNode;
};

// Context
const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);
/**
 * Custom hook to access the dark mode context.
 *
 * This hook provides access to the current dark mode state and its setter function.
 * It must be used within a <DarkModeProvider> to access the context value.
 *
 * @throws {Error} If used outside of a DarkModeProvider.
 * @returns {DarkModeContextType} The dark mode state and setter.
 */
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};

/**
 * Provides a context for managing dark mode state across the application.
 *
 * This provider component initializes the dark mode state from `localStorage` if available,
 * and persists any changes to `localStorage`. It exposes the current dark mode state and
 * a setter function via the `DarkModeContext`.
 *
 * @param {DarkModeProviderProps} props - The props for the provider, including children components.
 * @returns {JSX.Element} The context provider wrapping the children.
 *
 * @example
 * <DarkModeProvider>
 *   <App />
 * </DarkModeProvider>
 */
export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    // Use system preference if no saved mode
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
