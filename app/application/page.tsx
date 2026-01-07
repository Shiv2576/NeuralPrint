"use client";

export const dynamic = "force-dynamic";

import dynamicImport from "next/dynamic";

// Client-only render
const ApplicationForm = dynamicImport(
  () => import("@/components/applicationform"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 shadow-sm w-full max-w-2xl text-center">
          Loading job application...
        </div>
      </div>
    ),
  },
);

export default function Page() {
  return <ApplicationForm />;
}
