import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/AuthContext";
import { useApi } from "@/hooks/useApi";

export function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const api = useApi();

  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { credentials: "include" });
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Wyloguj się
    </Button>
  );
}
