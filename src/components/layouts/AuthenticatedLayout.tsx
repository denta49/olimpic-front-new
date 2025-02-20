import { LogoutButton } from "../LogoutButton";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AuthenticatedLayout({
  children,
  title,
}: AuthenticatedLayoutProps) {
  return (
    <div className="w-auto p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
