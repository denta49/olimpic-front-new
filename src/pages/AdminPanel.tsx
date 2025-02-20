import { useAuth } from "@/context/auth/AuthContext";
import { LogoutButton } from "@/components/LogoutButton";

export default function AdminPanel() {
  const { state } = useAuth();
  const isAdmin = state.user?.type === "admin";
  const isCoordinator = state.user?.type === "coordinator";

  if (!isAdmin && !isCoordinator) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Panel {isAdmin ? "Administratora" : "Koordynatora"}
        </h1>
        <LogoutButton />
      </div>
      <p>Zalogowano jako: {state.user?.email}</p>

      {/* Admin-specific content */}
      {isAdmin && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Funkcje administratora</h2>
          {/* Add admin-specific components/features here */}
        </div>
      )}

      {/* Coordinator-specific content */}
      {isCoordinator && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Funkcje koordynatora</h2>
          {/* Add coordinator-specific components/features here */}
        </div>
      )}
    </div>
  );
}
