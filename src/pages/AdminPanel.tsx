import { useAuth } from "@/context/auth/AuthContext";
import { AuthenticatedLayout } from "@/components/layouts/AuthenticatedLayout";

export default function AdminPanel() {
  const { user } = useAuth();
  const isAdmin = user?.type === "admin";
  const isCoordinator = user?.type === "coordinator";

  if (!isAdmin && !isCoordinator) {
    return null;
  }

  return (
    <AuthenticatedLayout
      title={`Panel ${isAdmin ? "Administratora" : "Koordynatora"}`}
    >
      <p>Zalogowano jako: {user?.email}</p>

      {/* Admin-specific content */}
      {isAdmin && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Administrator</h2>
          {/* Add admin-specific components/features here */}
        </div>
      )}

      {/* Coordinator-specific content */}
      {isCoordinator && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Koordynator</h2>
          {/* Add coordinator-specific components/features here */}
        </div>
      )}
    </AuthenticatedLayout>
  );
}
