import { useAuth } from "@/context/auth/AuthContext";
import { LogoutButton } from "@/components/LogoutButton";

export default function StudentPage() {
  const { state } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Panel Studenta</h1>
        <LogoutButton />
      </div>
      <p>Zalogowano jako: {state.user?.email}</p>
    </div>
  );
}
