"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "../theme-toggle";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@supabase/supabase-js";
import JobBoardButton from "../jobboard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
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

    if (!navRef.current) return;

    gsap.to(navRef.current, {
      scale: 0.9,
      ease: "power1.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=100",
        scrub: 1,
        markers: false,
      },
    });

    return () => {
      subscription.unsubscribe();
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // Get Google profile picture
  const getAvatarUrl = () => {
    if (!user) return null;

    return (
      user.user_metadata?.avatar_url ||
      user.user_metadata?.picture ||
      user.identities?.[0]?.identity_data?.avatar_url ||
      user.identities?.[0]?.identity_data?.picture
    );
  };

  return (
    <nav
      ref={navRef}
      className="fixed z-10 top-6 inset-x-4 h-14 xs:h-16 bg-background/50 backdrop-blur-2xl border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full"
    >
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <JobBoardButton />
          {/* Minimal: Profile pic only, click to logout */}
          {loading ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <button
              onClick={handleSignOut}
              className="focus:outline-none hover:opacity-80 transition-opacity"
              title="Click to sign out"
              type="button"
            >
              <Avatar className="h-8 w-8 border">
                <AvatarImage
                  src={getAvatarUrl()}
                  alt={user.email}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>
                  {user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </button>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </Link>
          )}

          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
