import { useAuth } from "@/context/auth/AuthContext";
import { AuthenticatedLayout } from "@/components/layouts/AuthenticatedLayout";

export default function StudentPage() {
  const { state } = useAuth();

  return (
    <AuthenticatedLayout title="Panel Studenta">
      <p>Zalogowano jako: {state.user?.email}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Twoje olimpiady</h2>
        {/* Add student-specific components/features here */}
      </div>
    </AuthenticatedLayout>
  );
}
