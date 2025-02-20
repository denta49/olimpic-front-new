import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/useApi";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const api = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await api.post("/reset-password", { email });

    if (error) {
      setError("Nie udało się zresetować hasła");
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">
            Email został wysłany
          </h2>
          <p className="text-sm text-gray-600 text-center">
            Sprawdź swoją skrzynkę pocztową i postępuj zgodnie z instrukcjami.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-lg font-semibold text-gray-900 text-center mb-4">
          Reset hasła
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Adres email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-9 text-sm"
            />
          </div>
          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Wysyłanie..." : "Wyślij link resetujący"}
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
      </div>
    </div>
  );
}
