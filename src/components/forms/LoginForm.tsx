import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth/AuthContext";

export function LoginForm() {
  const navigate = useNavigate();
  const { state, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userData = await login(username, password);

      if (userData) {
        if (userData.type === "student") {
          navigate("/student");
        } else if (
          userData.type === "coordinator" ||
          userData.type === "admin"
        ) {
          navigate("/admin");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <Input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="h-9 text-sm"
        />
        <Input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-9 text-sm"
        />
      </div>
      {state.error && (
        <div className="text-sm text-red-500 text-center">{state.error}</div>
      )}
      <Button className="w-full" type="submit" disabled={state.isLoading}>
        {state.isLoading ? "Logowanie..." : "Zaloguj się"}
      </Button>
      <div className="flex flex-col space-y-2">
        <Button
          variant="secondary"
          className="w-full"
          type="button"
          onClick={() => navigate("/reset-password")}
        >
          Zapomniałem hasła
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          type="button"
          onClick={() => navigate("/register")}
        >
          Zarejestruj się
        </Button>
      </div>
    </form>
  );
}
