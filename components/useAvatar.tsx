// components/UserAvatar.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

interface UserAvatarProps {
  onClick?: () => void;
  className?: string;
}

interface UserMetadata {
  avatar_url?: string;
  picture?: string;
  full_name?: string;
}

export function UserAvatar({ onClick, className = "" }: UserAvatarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <Avatar className={`h-8 w-8 ${className}`}>
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
    );
  }

  if (!user) {
    return null;
  }

  const metadata = user.user_metadata as UserMetadata | undefined;
  const identityData = user.identities?.[0]?.identity_data as
    | UserMetadata
    | undefined;

  const avatarUrl =
    metadata?.avatar_url || metadata?.picture || identityData?.avatar_url;

  const getInitials = (): string => {
    const name = metadata?.full_name || user.email || "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <Avatar
      className={`h-8 w-8 ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <AvatarImage
        src={avatarUrl}
        alt={user.email || "User"}
        referrerPolicy="no-referrer"
      />
      <AvatarFallback>{getInitials()}</AvatarFallback>
    </Avatar>
  );
}
