import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "@/hooks/useApi";
import { AuthLayout } from "@/components/layouts/AuthLayout";

export default function RegisterPage() {
  const navigate = useNavigate();
  const api = useApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Hasła nie są identyczne");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await api.post("/register", {
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError(error);
        return;
      }

      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Wystąpił błąd podczas rejestracji",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-lg font-semibold text-gray-900 text-center mb-4">
        Rejestracja
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Adres email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="h-9 text-sm"
          />
          <Input
            type="password"
            placeholder="Hasło"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="h-9 text-sm"
          />
          <Input
            type="password"
            placeholder="Potwierdź hasło"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
            className="h-9 text-sm"
          />
        </div>
        {error && (
          <div className="text-sm text-red-500 text-center">{error}</div>
        )}
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Rejestracja..." : "Zarejestruj się"}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          type="button"
          onClick={() => navigate("/")}
        >
          Powrót do logowania
        </Button>
      </form>
    </AuthLayout>
  );
}
