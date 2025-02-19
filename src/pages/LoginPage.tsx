import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-lg font-semibold text-gray-900 text-center mb-4">
          Logowanie
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
