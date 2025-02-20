import { useAuth } from "@/context/auth/AuthContext";
import { AuthenticatedLayout } from "@/components/layouts/AuthenticatedLayout";

export default function CoordinatorPage() {
  const { user } = useAuth();

  return (
    <AuthenticatedLayout title="Panel Koordynatora">
      <p>Zalogowano jako: {user?.email}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Zarządzanie olimpiadami</h2>
        {/* Add coordinator-specific components/features here */}
      </div>
    </AuthenticatedLayout>
  );
}
