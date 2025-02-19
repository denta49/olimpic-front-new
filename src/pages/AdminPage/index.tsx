import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Panel Administratora</h1>
        <Button variant="outline">Wyloguj</Button>
      </div>
      <Tabs defaultValue="accepted" className="w-full">
        <TabsList>
          <TabsTrigger value="accepted">Zaakceptowani uczniowie</TabsTrigger>
          <TabsTrigger value="pending">Zgłoszenia</TabsTrigger>
          <TabsTrigger value="districts">Okręgi</TabsTrigger>
          <TabsTrigger value="management">Zarządzanie</TabsTrigger>
        </TabsList>
        <TabsContent value="accepted">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">
              Lista zaakceptowanych uczniów
            </h2>
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">
              Lista oczekujących zgłoszeń
            </h2>
          </div>
        </TabsContent>
        <TabsContent value="districts">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">Zarządzanie okręgami</h2>
          </div>
        </TabsContent>
        <TabsContent value="management">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold">Zarządzanie systemem</h2>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
