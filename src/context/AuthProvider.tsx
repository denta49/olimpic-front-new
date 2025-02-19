import { createContext, ReactNode } from "react";

interface User {
  name: string;
  type: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  state: string;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  state: "IDLE",
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user: null, state: "IDLE" }}>
      {children}
    </AuthContext.Provider>
  );
}
