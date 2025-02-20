import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      if (response.error) {
        throw new Error(response.error);
      }
      navigate("/");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      registerMutation.error = new Error("Hasła nie są identyczne");
      return;
    }

    await registerMutation.mutateAsync({
      email: formData.email,
      password: formData.password,
    });
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
            disabled={registerMutation.isPending}
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
            disabled={registerMutation.isPending}
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
            disabled={registerMutation.isPending}
          />
        </div>
        {registerMutation.error && (
          <div className="text-sm text-red-500 text-center">
            {registerMutation.error.message}
          </div>
        )}
        <Button
          className="w-full"
          type="submit"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Rejestracja..." : "Zarejestruj się"}
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          type="button"
          onClick={() => navigate("/")}
          disabled={registerMutation.isPending}
        >
          Powrót do logowania
        </Button>
      </form>
    </AuthLayout>
  );
}
