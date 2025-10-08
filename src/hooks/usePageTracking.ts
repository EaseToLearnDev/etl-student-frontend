import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pushToDataLayer } from "../utils/gtm";

export const usePageTracking = (): void => {
  const location = useLocation();

  useEffect(() => {
    pushToDataLayer({
      event: "pageview",
      page_path: location.pathname,
    });
  }, [location]);
};
