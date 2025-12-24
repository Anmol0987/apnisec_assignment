"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 bg-black border border-gray-700"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-black border border-gray-700"
        />

        <button className="w-full bg-cyan-500 text-black py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
