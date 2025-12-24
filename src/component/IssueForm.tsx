"use client";

export default function IssueForm() {
  async function submit(e: any) {
    e.preventDefault();

    await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: e.target.type.value,
        title: e.target.title.value,
        description: e.target.description.value,
        priority: e.target.priority.value || undefined,
        status: e.target.status.value || undefined,
      }),
    });

    e.target.reset();
    window.location.reload();
  }

  return (
    <form onSubmit={submit} className="mb-10 bg-gray-900 p-6 rounded">
      <h2 className="text-xl font-semibold mb-4">Create Issue</h2>

      <select name="type" className="w-full mb-3 p-2 bg-black">
        <option value="CLOUD_SECURITY">Cloud Security</option>
        <option value="REDTEAM">Red Team Assessment</option>
        <option value="VAPT">VAPT</option>
      </select>

      <input
        name="title"
        placeholder="Title"
        className="w-full mb-3 p-2 bg-black"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        className="w-full mb-3 p-2 bg-black"
        required
      />

      <select name="priority" className="w-full mb-3 p-2 bg-black">
        <option value="">Priority (optional)</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <select name="status" className="w-full mb-4 p-2 bg-black">
        <option value="">Status (optional)</option>
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="RESOLVED">Resolved</option>
      </select>

      <button className="bg-cyan-500 text-black px-4 py-2 rounded">
        Create Issue
      </button>
    </form>
  );
}
