import { useEffect, useState } from "react";

export function useFullscreenProtection(enable: boolean) {
  const [hasExited, setHasExited] = useState(false);

  useEffect(() => {
    if (!enable) return;

    const enterFullScreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (error) {
        console.warn("Full-screen request failed:", error);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.shiftKey && ["I", "J", "C"].includes(event.key)) ||
        (event.ctrlKey && event.key === "u")
      ) {
        event.preventDefault();
      }
    };

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setHasExited(true);
      }
    };

    // Enter fullscreen on mount
    enterFullScreen();

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [enable]);

  const reEnter = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setHasExited(false);
      }
    } catch (error) {
      console.warn("Re-enter full-screen failed:", error);
    }
  };

  return { hasExited, reEnter };
}
