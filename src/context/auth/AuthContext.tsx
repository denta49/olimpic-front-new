import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { useApi } from "@/hooks/useApi";

interface User {
  email: string;
  type: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_FAIL"; payload: string }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case "AUTH_FAIL":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
}

interface AuthContextType {
  state: AuthState;
  login: (username: string, password: string) => Promise<User | null>;
  logout: () => void;
  getCurrentUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const api = useApi();

  const getCurrentUser = async () => {
    try {
      const { data, error } = await api.get("/current-user");

      if (error) {
        dispatch({ type: "LOGOUT" });
        return null;
      }

      const userData = {
        email: data.email,
        type: data.type,
        roles: data.roles,
      };

      dispatch({
        type: "AUTH_SUCCESS",
        payload: userData,
      });

      return userData;
    } catch (error) {
      console.error("Error fetching current user:", error);
      dispatch({ type: "LOGOUT" });
      return null;
    }
  };

  const login = async (username: string, password: string) => {
    dispatch({ type: "AUTH_START" });

    try {
      const { error } = await api.post("/login", { username, password });

      if (error) {
        dispatch({
          type: "AUTH_FAIL",
          payload:
            typeof error === "string"
              ? error
              : "Nieprawidłowa nazwa użytkownika lub hasło",
        });
        return null;
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
      const userData = await getCurrentUser();
      return userData;
    } catch (error) {
      dispatch({
        type: "AUTH_FAIL",
        payload: error instanceof Error ? error.message : "Błąd logowania",
      });
      return null;
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <AuthContext.Provider value={{ state, login, logout, getCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
