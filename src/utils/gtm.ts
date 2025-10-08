// Generic record type for flexible event payloads
export interface GTMEvent {
  event: string;
  [key: string]: string | number | boolean | object | undefined;
}

// Extend global Window type once — no more (window as any)
declare global {
  interface Window {
    dataLayer?: GTMEvent[];
  }
}

/**
 * Safely pushes data into GTM's dataLayer
 */
export const pushToDataLayer = (eventData: GTMEvent): void => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
  } else {
    console.warn("GTM dataLayer not found or not in browser context");
  }
};
