"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-2 text-white">
          Create your account
        </h1>
        <p className="text-gray-400 mb-6">
          Join ApniSec and manage your security issues
        </p>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            required
            className="
              w-full p-3 rounded-xl bg-black border border-blue-400
              focus:outline-none focus:ring-0 focus:ring-offset-0
              focus:shadow-[0_0_10px_#3b82f6]
            "
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="
              w-full p-3 rounded-xl bg-black border border-blue-400
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
              w-full p-3 rounded-xl bg-black border border-blue-400
              focus:outline-none focus:ring-0 focus:ring-offset-0
              focus:shadow-[0_0_10px_#3b82f6]
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-cyan-500 text-black font-semibold py-3 rounded-xl
              hover:bg-cyan-400 transition disabled:opacity-60
            "
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
