import { config } from "@/config";

interface RequestConfig extends RequestInit {
  data?: Record<string, unknown>;
}

interface ApiConfig {
  baseUrl: string;
  defaultHeaders: Record<string, string>;
}

const apiConfig: ApiConfig = {
  baseUrl: config.API_URL,
  defaultHeaders: {
    "Content-Type": "application/json",
    Accept: "application/ld+json",
  },
};

export function useApi() {
  const request = async (
    endpoint: string,
    { data, ...customConfig }: RequestConfig = {},
  ) => {
    const headers = {
      ...apiConfig.defaultHeaders,
      ...customConfig.headers,
    };

    const requestConfig: RequestConfig = {
      ...customConfig,
      headers,
      credentials: "include",
    };

    if (data) {
      requestConfig.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(
        `${apiConfig.baseUrl}${endpoint}`,
        requestConfig,
      );

      if (response.ok) {
        if (response.status === 204) {
          return { data: null, error: null };
        }

        const data = await response.json();
        return { data, error: null };
      }

      let error;
      try {
        const errorData = await response.json();
        error = errorData.message || "Wystąpił błąd";
      } catch {
        error = await response.text();
      }
      return { data: null, error };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Wystąpił błąd",
      };
    }
  };

  const get = (endpoint: string, customConfig = {}) => {
    return request(endpoint, { ...customConfig, method: "GET" });
  };

  const post = (
    endpoint: string,
    data: Record<string, unknown>,
    customConfig = {},
  ) => {
    return request(endpoint, { ...customConfig, method: "POST", data });
  };

  const put = (
    endpoint: string,
    data: Record<string, unknown>,
    customConfig = {},
  ) => {
    return request(endpoint, { ...customConfig, method: "PUT", data });
  };

  const del = (
    endpoint: string,
    data?: Record<string, unknown>,
    customConfig = {},
  ) => {
    return request(endpoint, { ...customConfig, method: "DELETE", data });
  };

  return { get, post, put, del };
}
