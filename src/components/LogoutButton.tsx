import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/AuthContext";

export function LogoutButton() {
  const { state, logout } = useAuth();

  return (
    <Button variant="outline" onClick={logout} disabled={state.isLoading}>
      {state.isLoading ? "Wylogowywanie..." : "Wyloguj się"}
    </Button>
  );
}
