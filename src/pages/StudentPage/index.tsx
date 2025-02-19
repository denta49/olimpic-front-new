import { Button } from "@/components/ui/button";

export default function StudentPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Panel Ucznia</h1>
        <Button variant="outline">Wyloguj</Button>
      </div>
      <div className="space-y-8">
        <section className="rounded-lg border p-6">
          <h2 className="mb-4 text-2xl font-semibold">Etap I</h2>
        </section>
        <section className="rounded-lg border p-6">
          <h2 className="mb-4 text-2xl font-semibold">Etap II</h2>
        </section>
        <section className="rounded-lg border p-6">
          <h2 className="mb-4 text-2xl font-semibold">Etap III</h2>
        </section>
      </div>
    </div>
  );
}
