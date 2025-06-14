"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const register = api.auth.register.useMutation();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await register.mutateAsync(form);
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: "/",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4 max-w-sm mx-auto">
      <input
        placeholder="Нэр"
        className="border border-gray-300 px-4 py-2 rounded"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        className="border border-gray-300 px-4 py-2 rounded"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        className="border border-gray-300 px-4 py-2 rounded"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="bg-blue-500 py-2 text-white py-2 rounded">Бүртгүүлэх</button>
    </form>
  );
}
