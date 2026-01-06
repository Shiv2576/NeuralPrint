// ./ui/supabaselogin.ts
import { supabase } from "@/lib/supabase/client";

// Export supabase client for Google OAuth
export { supabase };

// Simple Sign Up
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

// Simple Sign In
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  return { data, error };
}

// Simple Sign Out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
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
