"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { checkAdmin } from "@/lib/supabase/client";

export default function JobBoardButton() {
  const router = useRouter();

  const handleClick = async () => {
    const isAdmin = await checkAdmin();

    if (isAdmin) {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Button className="hidden xs:inline-flex" onClick={handleClick}>
      Job Board
    </Button>
  );
}
