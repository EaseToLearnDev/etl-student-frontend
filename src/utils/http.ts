
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
    const data = (response as any)?.data ?? response;
    if (data.responseTxt === "invalidToken"){
      window.location.href = '/logout';
    }
    return {
      success: true,
      data: data,
      status: data.status,
      message: (response as any)?.data?.message || "Success",
    };
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || error?.message || "Something went wrong";
    const status = error?.response?.status 
    if (errorMsg === "invalidToken") {
      window.location.href = '/logout';
    }
    console.log("API Error", error);
    throw {
      success: false,
      data: null,
      status: status,
      message:errorMsg
    };
  }
};
