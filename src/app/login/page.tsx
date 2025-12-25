"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-md border border-gray-800"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Login to ApniSec
        </h2>

        {error && (
          <p className="text-red-500 mb-3 text-sm">{error}</p>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="
            w-full mb-3 p-3 rounded-xl bg-black border border-blue-400
            focus:outline-none focus:ring-0 focus:ring-offset-0
            focus:shadow-[0_0_10px_#3b82f6]
          "
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="
            w-full mb-5 p-3 rounded-xl bg-black border border-blue-400
            focus:outline-none focus:ring-0 focus:ring-offset-0
            focus:shadow-[0_0_10px_#3b82f6]
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full bg-cyan-500 text-black font-semibold py-3 rounded-xl
            hover:bg-cyan-400 transition
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
