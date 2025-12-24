"use client";

import { useEffect, useState } from "react";
import IssueForm from "./IssueForm";
import IssueList from "./IssueList";

export default function DashboardClient() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        setUser(data.data?.user || data.user);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, <span className="text-cyan-400">{user.name}</span>
        </h1>
      </div>

      <IssueForm />
      <IssueList />
    </div>
  );
}
