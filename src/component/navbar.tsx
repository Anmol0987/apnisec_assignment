"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  async function checkAuth() {
    try {
      const res = await fetch("/api/auth/me");
      setLoggedIn(res.ok);
    } catch {
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setLoggedIn(false);
    router.push("/");
  }

  if (loading) return null;

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
      <Link
        href={loggedIn ? "/dashboard" : "/"}
        className="text-xl font-bold text-cyan-400"
      >
        ApniSec
      </Link>

      <div className="flex items-center gap-4">
        {!loggedIn && (
          <>
            <Link href="#features" className="text-gray-300 hover:text-white">
              Services
            </Link>

            <Link
              href="/login"
              className="bg-cyan-500 px-4 py-2 rounded text-black font-medium"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="border border-cyan-500 px-4 py-2 rounded text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
            >
              Register
            </Link>
          </>
        )}

        {loggedIn && (
          <>
           <Link href="/dashboard" className="text-gray-300 hover:text-white">
              Dashboard
            </Link>
            <Link href="/profile" className="text-gray-300 hover:text-white">
              Profile
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded text-black font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
