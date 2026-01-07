// app/admin/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJob, deleteJob } from "@/components/adminjobboard";
import ShowJob from "@/components/showjobs";

export default function AdminDashboard() {
  const [job, setJob] = useState({ title: "", company: "", description: "" });
  const [jobId, setJobId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createJob(job);
      setResult("✅ Job created!");
      setJob({ title: "", company: "", description: "" });
    } catch (err: unknown) {
      setResult(`❌ ${err instanceof Error ? err.message : "Error"}`);
    }
    setLoading(false);
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deleteJob(jobId);
      setResult(`✅ Job ${jobId} deleted!`);
      setJobId("");
    } catch (err: unknown) {
      setResult(`❌ ${err instanceof Error ? err.message : "Error"}`);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {result && (
        <div
          className={`p-3 mb-4 rounded ${result.includes("✅") ? "bg-green-100" : "bg-red-100"}`}
        >
          {result}
        </div>
      )}

      {/* Create Form */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">Create Job</h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <Input
            placeholder="Job Title"
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
            required
          />
          <Input
            placeholder="Company"
            value={job.company}
            onChange={(e) => setJob({ ...job, company: e.target.value })}
            required
          />
          <Textarea
            placeholder="Description"
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Job"}
          </Button>
        </form>
      </div>

      {/* Delete Form */}
      <div className="p-4 border rounded">
        <h2 className="text-lg font-semibold mb-3">Delete Job</h2>
        <form onSubmit={handleDelete} className="flex gap-2">
          <Input
            placeholder="Enter Job ID"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" variant="destructive" disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </form>
      </div>

      <ShowJob />
    </div>
  );
}
