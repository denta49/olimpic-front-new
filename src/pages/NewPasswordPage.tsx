import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { config } from "@/config";

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Hasła nie są identyczne");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${config.API_URL}/reset-password/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się zmienić hasła");
      }

      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Wystąpił błąd podczas zmiany hasła",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Nieprawidłowy token</h2>
          <p className="text-gray-600">
            Link do resetowania hasła jest nieprawidłowy lub wygasł.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Ustaw nowe hasło
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Nowe hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Potwierdź hasło"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Zapisywanie..." : "Zapisz nowe hasło"}
          </Button>
        </form>
      </div>
    </div>
  );
}
