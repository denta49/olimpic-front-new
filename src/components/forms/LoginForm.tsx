import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth/AuthContext";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, error, isAuthenticating } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="h-9 text-sm"
          disabled={isAuthenticating}
        />
        <Input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-9 text-sm"
          disabled={isAuthenticating}
        />
        <Button
          className="w-full bg-neutral-950 text-neutral-50"
          type="submit"
          disabled={isAuthenticating}
        >
          {isAuthenticating ? "Logowanie..." : "Zaloguj się"}
        </Button>
      </div>
      {error && <div className="text-sm text-red-500 text-center">{error}</div>}

      <div className="flex flex-col space-y-2">
        <Button
          variant="secondary"
          className="w-full bg-neutral-950 text-neutral-50"
          type="button"
          onClick={() => navigate("/register")}
          disabled={isAuthenticating}
        >
          Zarejestruj się
        </Button>
        <Button
          variant="secondary"
          className="w-full bg-neutral-950 text-neutral-50"
          type="button"
          onClick={() => navigate("/reset-password")}
          disabled={isAuthenticating}
        >
          Zapomniałem hasła
        </Button>
      </div>
    </form>
  );
}
