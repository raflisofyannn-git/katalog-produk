"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import LoadingButton from "@/components/ui/LoadingButton";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      toast.warning("Lengkapi Email dan Password.");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      router.push("/admin");
    } catch (err) {
      console.error(err);

      toast.error("Email atau Password salah.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-8 text-center text-3xl font-bold">
          Admin Login
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border p-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <LoadingButton
            loading={loading}
            onClick={handleLogin}
          >
            Login
          </LoadingButton>

        </div>

      </div>

    </main>
  );
}