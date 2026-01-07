// ./ui/supabaselogin.ts
import { supabase } from "@/lib/supabase/client";

export { supabase };

export async function signUp(
  email: string,
  password: string,
  fullName?: string,
) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Google OAuth

const redirectTo =
  typeof window !== "undefined"
    ? `${window.location.origin}/auth/callback`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo, // ✅ FIXED
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      scopes:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    },
  });

  return { data, error };
}
