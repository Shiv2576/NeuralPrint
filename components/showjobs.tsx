"use client";

import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  description: string | null;
  created_by: string;
  created_at: string;
}

export default function ShowJob() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setJobs(data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        Loading jobs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Job Listings</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found</p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <Link
              href={`/application?id=${job.id}`}
              key={job.id}
              className="block bg-white border border-gray-200 rounded-lg p-6
                         shadow-sm transition-shadow duration-200
                         hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {job.title}
                  </h2>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 block">
                    {new Date(job.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-blue-600 font-medium mt-1 block">
                    Read more →
                  </span>
                </div>
              </div>

              {job.description && (
                <p className="mt-3 text-gray-700">{job.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
