import { LoginForm } from "@/components/forms/LoginForm";
import { AuthLayout } from "@/components/layouts/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout>
      <h1 className="text-lg font-semibold text-gray-900 text-center mb-4">
        Logowanie
      </h1>
      <LoginForm />
    </AuthLayout>
  );
}
