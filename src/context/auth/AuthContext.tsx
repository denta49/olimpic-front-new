import { createContext, useContext, useCallback, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, User, LoginCredentials } from "@/api/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticating: boolean;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data, error } = await authApi.getCurrentUser();
      if (error) throw new Error(error);
      return data;
    },
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (response) => {
      if (response.error) {
        throw new Error(response.error);
      }

      // After successful login, invalidate and refetch user data
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      const userData = await authApi.getCurrentUser();

      if (userData.error || !userData.data) {
        throw new Error(
          userData.error || "Nie udało się pobrać danych użytkownika",
        );
      }

      // Navigate based on user type
      if (userData.data.type === "student") {
        navigate("/student");
      } else if (["admin", "coordinator"].includes(userData.data.type)) {
        navigate("/admin");
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      navigate("/");
    },
  });

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      await loginMutation.mutateAsync(credentials);
    },
    [loginMutation],
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        error: loginMutation.error?.message || null,
        login,
        logout,
        isAuthenticating: loginMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
      }}
    >
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
