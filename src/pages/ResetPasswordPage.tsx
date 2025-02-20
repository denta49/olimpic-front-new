import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const resetMutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: (response) => {
      if (response.error) {
        throw new Error(response.error);
      }
      setSuccess(true);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetMutation.mutateAsync({ email });
  };

  if (success) {
    return (
      <AuthLayout>
        <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">
          Email został wysłany
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Sprawdź swoją skrzynkę pocztową i postępuj zgodnie z instrukcjami.
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
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
            disabled={resetMutation.isPending}
          />
        </div>
        {resetMutation.error && (
          <div className="text-sm text-red-500 text-center">
            {resetMutation.error.message}
          </div>
        )}
        <Button
          className="w-full"
          type="submit"
          disabled={resetMutation.isPending}
        >
          {resetMutation.isPending ? "Wysyłanie..." : "Wyślij link resetujący"}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          type="button"
          onClick={() => navigate("/")}
          disabled={resetMutation.isPending}
        >
          Powrót do logowania
        </Button>
      </form>
    </AuthLayout>
  );
}
