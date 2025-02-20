import { useAuth } from "@/context/auth/AuthContext";
import { AuthenticatedLayout } from "@/components/layouts/AuthenticatedLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentsTable } from "@/components/StudentsTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Card className="mt-16">
        <CardHeader>
          <CardTitle>Zarządzanie uczniami</CardTitle>
          <CardDescription>
            Przeglądaj i zarządzaj zgłoszeniami oraz zaakceptowanymi uczniami
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="pending" className="flex-1">
                Zgłoszenia
              </TabsTrigger>
              <TabsTrigger value="accepted" className="flex-1">
                Zaakceptowani uczniowie
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <StudentsTable />
            </TabsContent>
            <TabsContent value="accepted">
              <StudentsTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AuthenticatedLayout>
  );
}
