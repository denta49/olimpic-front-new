import { config } from "@/config";

interface User {
  email: string;
  type: string;
  roles: string[];
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

interface ResetPasswordCredentials {
  email: string;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    try {
      const response = await fetch(`${config.API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return {
          error: error.message || "Nieprawidłowa nazwa użytkownika lub hasło",
        };
      }

      if (response.status === 204) {
        return {};
      }

      return { data: await response.json() };
    } catch (error) {
      console.error("Błąd logowania:", error);
      return { error: "Błąd logowania" };
    }
  },

  register: async (
    credentials: RegisterCredentials,
  ): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${config.API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Błąd rejestracji" };
      }

      return {};
    } catch (error) {
      console.error("Błąd rejestracji:", error);
      return { error: "Wystąpił błąd podczas rejestracji" };
    }
  },

  logout: async (): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${config.API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        return { error: "Błąd wylogowania" };
      }

      return {};
    } catch (error) {
      console.error("Błąd wylogowania:", error);
      return { error: "Wystąpił błąd podczas wylogowania" };
    }
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await fetch(`${config.API_URL}/current-user`, {
        credentials: "include",
      });

      if (!response.ok) {
        return { error: "Nie udało się pobrać danych użytkownika" };
      }

      return { data: await response.json() };
    } catch (error) {
      console.error("Błąd pobierania danych użytkownika:", error);
      return { error: "Błąd pobierania danych użytkownika" };
    }
  },

  resetPassword: async (
    credentials: ResetPasswordCredentials,
  ): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${config.API_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Nie udało się zresetować hasła" };
      }

      return {};
    } catch (error) {
      console.error("Błąd resetowania hasła:", error);
      return { error: "Wystąpił błąd podczas resetowania hasła" };
    }
  },
};

export type {
  User,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordCredentials,
  ApiResponse,
};
