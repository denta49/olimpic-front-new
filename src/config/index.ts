const ENV = import.meta.env.VITE_ENV || "development";

interface Config {
  API_URL: string;
}

const configs: Record<string, Config> = {
  development: {
    API_URL: "https://localhost:8001/api",
  },
  staging: {
    API_URL: "",
  },
  production: {
    API_URL: "",
  },
};

export const config = configs[ENV];
