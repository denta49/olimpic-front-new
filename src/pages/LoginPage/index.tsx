import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-3xl font-bold">Olimpiada filozoficzna</h1>
      <div className="w-full max-w-md space-y-4">
        <h2 className="text-xl">Zaloguj się do serwisu</h2>
        <Button className="w-full">Zaloguj się</Button>
      </div>
    </div>
  );
}
