"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const register = api.auth.register.useMutation();
  const router = useRouter();


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register.mutateAsync(form);

      // Sign in хийсний хариуг авна
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/",
        redirect: false, 
      });

      if (res?.ok) {
        alert("Амжилттай бүртгэгдлээ!");
      } else {
        alert("Нэвтрэхэд алдаа гарлаа.");
      }
    } catch (error) {
      alert(" Имэйл бүртгэлтэй байна.");
        router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-sm flex-col gap-4 p-8"
    >
      <input
        placeholder="Нэр"
        className="rounded border border-gray-300 px-4 py-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        className="rounded border border-gray-300 px-4 py-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        className="rounded border border-gray-300 px-4 py-2"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        type="submit"
        disabled={loading}
        className={`rounded bg-blue-500 py-2 text-white ${
          loading ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
      </button>
    </form>
  );
}
