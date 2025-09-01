
import axios, { type AxiosInstance } from "axios";

/**
 * Provides a configured Axios instance.
 */
export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Utility function for making HTTP requests.
 */
export const makeRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  data:  any = null,
  options: Record<string, any> = {}
) => {
  const methodLower = method.toLowerCase() as "get" | "post" | "put" | "delete";
  const methodMap = {
    get: http.get.bind(http),
    post: http.post.bind(http),
    put: http.put.bind(http),
    delete: http.delete.bind(http),
  };

  const methodFn = methodMap[methodLower];
  if (!methodFn) {
    console.log("Unsupported HTTP method passed as argument!");
    return;
  }

  if (methodLower === "get" || methodLower === "delete") {
    return apiWrapper(() => methodFn(url, options));
  } else {
    return apiWrapper(() => methodFn(url, data, options));
  }
};

/**
 * Safely handle api calls and return data in standardized format
 */
export const apiWrapper = async <T>(fn: () => Promise<T>) => {
  try {
    const response = await fn();
    return {
      success: true,
      data: (response as any)?.data ?? response,
      message: (response as any)?.data?.message || "Success",
    };
  } catch (error: any) {
    console.log("API Error", error);
    localStorage.removeItem("student-storage");
    window.location.href = "/student/login";
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong",
    };
  }
};
