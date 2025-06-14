"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

  
    await signIn("credentials", {
      email,
      password,
      redirect: true, 
      callbackUrl: "/", 
    });
  };

  return (
    <form onSubmit={handleLogin} className="p-8 flex flex-col gap-4 max-w-sm mx-auto">
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded"
        required
      />
      <button type="submit" className="bg-green-500 text-white py-2 rounded">
        Нэвтрэх
      </button>
    </form>
  );
}
