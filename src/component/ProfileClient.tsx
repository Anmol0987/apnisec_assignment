"use client";

import { useEffect, useState } from "react";

export default function ProfileClient() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/user/profile")
      .then(res => res.json())
      .then(data => {
        const u = data.data?.user || data.user;
        setUser(u);
        setName(u.name);
      });
  }, []);

  async function updateProfile(e: any) {
    e.preventDefault();
    setMsg("");

    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setMsg("Profile updated successfully");
    }
  }

  if (!user) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {msg && <p className="text-green-500 mb-2">{msg}</p>}

      <form onSubmit={updateProfile}>
        <label className="block mb-2 text-gray-400">Name</label>
        <input
          className="w-full p-2 bg-black border border-gray-700 mb-4"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label className="block mb-2 text-gray-400">Email</label>
        <input
          className="w-full p-2 bg-gray-800 border border-gray-700 mb-4"
          value={user.email}
          disabled
        />

        <button className="bg-cyan-500 text-black px-4 py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}
