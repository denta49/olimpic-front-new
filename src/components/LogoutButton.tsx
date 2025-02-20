import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/AuthContext";

export function LogoutButton() {
  const { logout, isLoggingOut } = useAuth();

  return (
    <Button variant="outline" onClick={logout} disabled={isLoggingOut}>
      {isLoggingOut ? "Wylogowywanie..." : "Wyloguj się"}
    </Button>
  );
}
