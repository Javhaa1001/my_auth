"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, 
      });

      if (res?.ok) {
        alert("Амжилттай нэвтэрлээ!");
        router.push("/dashboard");
      } else {
        alert("Имэйл эсвэл нууц үг буруу байна.");
      }
    } catch (error) {
      console.error("Нэвтрэх үед алдаа гарлаа:", error);
      alert("Системийн алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="p-8 flex flex-col gap-4 max-w-sm mx-auto"
    >
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`bg-green-500 text-white py-2 rounded ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
      </button>
    </form>
  );
}