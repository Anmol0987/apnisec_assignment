"use client";

import { useEffect, useState } from "react";

export default function IssueList() {
  const [issues, setIssues] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const url = filter ? `/api/issues?type=${filter}` : "/api/issues";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setIssues(data.data ?? data.issues));
  }, [filter]);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/issues/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  async function remove(id: string) {
    await fetch(`/api/issues/${id}`, { method: "DELETE" });
    setIssues((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Issues</h2>

        <select
          className="
          bg-black
          p-2
          rounded-2xl
          border border-blue-400
          focus:outline-none
          focus:ring-0
          focus:ring-offset-0
          focus:border-blue-500
          focus:shadow-[0_0_10px_#3b82f6]
        "
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="CLOUD_SECURITY">Cloud Security</option>
          <option value="REDTEAM">Red Team</option>
          <option value="VAPT">VAPT</option>
        </select>
      </div>

      {issues.map((issue) => (
        <div key={issue.id} className="border border-gray-800 p-4 rounded mb-3">
          <h3 className=" text-2xl font-bold">{issue.title}</h3>
          <p className="text-lg text-gray-400">{issue.description}</p>
          <p className="text-sm text-blue-400">{issue.type}</p>

          <div className="flex gap-4 items-center justify-between mt-3">
            <select
              value={issue.status}
              onChange={(e) => updateStatus(issue.id, e.target.value)}
              className="
  bg-black
  p-1
  rounded-2xl
  border border-blue-400
  focus:outline-none
  focus:ring-0
  focus:ring-offset-0
  focus:border-blue-500
  focus:shadow-[0_0_10px_#3b82f6]
"

            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>

            <button onClick={() => remove(issue.id)} className="text-red-500">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
