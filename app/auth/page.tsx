import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <AuthForm />
        </div>
      </div>
    </main>
  );
}
