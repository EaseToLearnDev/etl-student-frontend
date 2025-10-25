import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { pushToDataLayer } from "../utils/gtm";

/**
 * Tracks a page view by pushing an event to the data layer.
 * If `delayMs` is provided (> 0), the push will be delayed by that many milliseconds.
 *
 * @param event - GTM event name
 * @param delayMs - optional delay in milliseconds before firing the event
 */
export const usePageTracking = (event: string, delayMs?: number): void => {
  const location = useLocation();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // If a delay is provided, set a timeout. Clean up on unmount / location change.
    if (typeof delayMs === "number" && delayMs > 0) {
      timerRef.current = window.setTimeout(() => {
        pushToDataLayer({
          event,
          page_path: location.pathname,
        });
      }, delayMs);

      return () => {
        if (timerRef.current !== null) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }

    // No delay: push immediately.
    pushToDataLayer({
      event,
      page_path: location.pathname,
    });
    // Re-run when location, event or delay changes.
  }, [location, event, delayMs]);
};
