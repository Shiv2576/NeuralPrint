"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ApplicationForm = dynamic(() => import("@/components/applicationform"), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-sm w-full max-w-2xl text-center">
            Loading job application...
          </div>
        </div>
      }
    >
      <ApplicationForm />
    </Suspense>
  );
}
