"use client";

import { useEffect, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const code = searchParams.get("code");
        const error_description = searchParams.get("error_description");

        if (error_description) {
          console.error("OAuth error:", error_description);
          setError(error_description);
          setTimeout(() => router.replace("/login"), 2000);
          return;
        }

        if (!code) {
          console.error("No code provided");
          setError("No authorization code provided");
          setTimeout(() => router.replace("/login"), 2000);
          return;
        }

        const { data, error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          console.error("Session exchange error:", exchangeError);
          setError(exchangeError.message);
          setTimeout(() => router.replace("/login"), 2000);
          return;
        }

        if (!data.session) {
          console.error("No session created");
          setError("Failed to create session");
          setTimeout(() => router.replace("/login"), 2000);
          return;
        }

        console.log("Authentication successful, redirecting to dashboard");
        router.replace("/");
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
        setTimeout(() => router.replace("/login"), 2000);
      }
    };

    handleAuth();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/70">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Description of what this icon represents"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Authentication Failed
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/70">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Finishing sign in...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-muted/70">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
