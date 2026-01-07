// app/application/page.tsx
"use client";

import { Suspense } from "react";
import ApplicationForm from "@/components/applicationform";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading application form...</div>}>
      <ApplicationForm />
    </Suspense>
  );
}
