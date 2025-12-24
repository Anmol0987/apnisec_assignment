"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me").then((res) => {
      if (!res.ok) router.push("/login");
      else setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return <>{children}</>;
}
