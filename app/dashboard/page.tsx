import { Suspense } from "react";
import ShowJob from "@/components/showjobs";

export default function Dashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <ShowJob />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
