import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-8 text-3xl font-bold">Reset hasła</h1>
      <div className="w-full max-w-md space-y-4">
        <Button className="w-full">Zresetuj hasło</Button>
      </div>
    </div>
  );
}
