"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Job {
  id: string;
  title: string;
  company: string;
  description: string | null;
  created_at: string;
}

export default function ApplicationForm() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  useEffect(() => {
    if (!jobId) {
      setError("No job ID provided");
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", jobId)
          .single();

        if (error) throw error;
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 shadow-sm w-full max-w-2xl text-center">
          Loading job details...
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 shadow-sm w-full max-w-2xl text-center">
          <p className="text-red-600 mb-4">{error || "Job not found"}</p>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-blue-600 font-medium hover:text-blue-800 underline"
          >
            ← Go back to listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
          aria-label="Go back"
        >
          ← Back to listings
        </button>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-lg text-gray-700">{job.company}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted on {new Date(job.created_at).toLocaleDateString()}
            </p>
          </div>

          {job.description ? (
            <div className="prose prose-gray max-w-none">
              <p className="whitespace-pre-line text-gray-800">
                {job.description}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic">No description provided.</p>
          )}
        </div>
      </div>
    </div>
  );
}
