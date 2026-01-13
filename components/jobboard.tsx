"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import checkAdmin from "@/lib/supabase/checkAdmin";

export default function JobBoardButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optional: You can use this to pre-check auth status on mount,
    // but we're handling it on click for simplicity and freshness.
    setLoading(false);
  }, []);

  const handleClick = async () => {
    // Get current session/user from Supabase
    const {
      data: { user },
    } = await (await import("@/lib/supabase/client")).supabase.auth.getUser();

    if (!user) {
      // Not signed in → redirect to login
      router.push("/login");
      return;
    }

    // User is signed in — check if admin
    const isAdmin = await checkAdmin();
    if (isAdmin) {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Button
      className="hidden xs:inline-flex"
      onClick={handleClick}
      disabled={loading}
    >
      Job Board
    </Button>
  );
}
