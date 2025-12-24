"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => {
        if (res.ok) setLoggedIn(true);
        else setLoggedIn(false);
      })
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setLoggedIn(false);
    router.push("/");
  }

  if (loading) return null; // avoid UI flicker

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
      {/* Logo */}
      <Link
        href={loggedIn ? "/dashboard" : "/"}
        className="text-xl font-bold text-cyan-400"
      >
        ApniSec
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {!loggedIn && (
          <>
            <Link
              href="#features"
              className="text-gray-300 hover:text-white"
            >
              Services
            </Link>
            <Link
              href="/login"
              className="bg-cyan-500 px-4 py-2 rounded text-black font-medium"
            >
              Login
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            <Link
              href="/profile"
              className="text-gray-300 hover:text-white"
            >
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
