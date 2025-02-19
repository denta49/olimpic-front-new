const ENV = import.meta.env.VITE_ENV || "development";

interface Config {
  API_URL: string;
}

const configs: Record<string, Config> = {
  development: {
    API_URL: "http://localhost:8000/api",
  },
  staging: {
    API_URL: "https://dev-api.olimpiadafilozoficzna.edu.pl/api",
  },
  production: {
    API_URL: "https://api2.olimpiadafilozoficzna.edu.pl/api",
  },
};

export const config = configs[ENV];
