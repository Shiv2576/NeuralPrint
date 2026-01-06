// lib/adminjobboard.ts
import { supabase } from "@/lib/supabase/client";

// Job Interface
export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  created_by: string;
  created_at: string;
}

export interface JobCreateData {
  title: string;
  company: string;
  description: string;
}

// 1. CREATE: Add a new job
export async function createJob(jobData: JobCreateData): Promise<Job> {
  const { data, error } = await supabase
    .from("jobs")
    .insert(jobData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 2. DELETE: Remove a job
export async function deleteJob(jobId: string): Promise<void> {
  const { error } = await supabase.from("jobs").delete().eq("id", jobId);

  if (error) throw error;
}

// 3. BATCH DELETE: Delete multiple jobs
export async function deleteMultipleJobs(jobIds: string[]): Promise<void> {
  const { error } = await supabase.from("jobs").delete().in("id", jobIds);

  if (error) throw error;
}
