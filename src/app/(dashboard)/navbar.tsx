"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function Navbar() {
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  useEffect(() => {
    // Simulasikan loading dengan setTimeout untuk demo
    const token = localStorage.getItem("token");
    setTimeout(() => {
      setAuthState(token ? "authenticated" : "unauthenticated");
    });
  }, []);

  return (
    <nav className="bg-primary w-full flex flex-row items-center justify-between p-4 shadow-md max-w-7xl mx-auto">
      {authState === "loading" ? (
        <Skeleton className="h-[40px] w-[100px] bg-primary-foreground/20 opacity-80" />
      ) : (
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo Manchingu"
            width={80}
            height={80}
            className="w-auto h-auto"
            priority
          />
        </Link>
      )}

      <div className="min-w-[200px] flex justify-end">
        {authState === "loading" ? (
          <div className="flex gap-4">
            <Skeleton className="h-10 w-20 bg-primary-foreground/20 opacity-80" />
            <Skeleton className="h-10 w-20 bg-primary-foreground/20 opacity-80" />
          </div>
        ) : authState === "authenticated" ? (
          <AuthenticatedLinks />
        ) : (
          <GuestLinks />
        )}
      </div>
    </nav>
  );
}

function AuthenticatedLinks() {
  return (
    <div className="flex flex-row items-center gap-6">
      <div className="flex items-center relative">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-9 bg-background" />
      </div>
      <div className="flex gap-4">
        <Button
          asChild
          variant="ghost"
          className="text-white hover:bg-accent hover:text-white"
        >
          <Link href="/">Home</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          className="text-white hover:bg-accent hover:text-white"
        >
          <Link href="/bookmarks">Bookmarks</Link>
        </Button>
      </div>
    </div>
  );
}

function GuestLinks() {
  return (
    <div className="flex flex-row items-center gap-4">
      <Button asChild className="bg-accent text-white w-20">
        <Link href="/signin">Sign In</Link>
      </Button>
      <Button asChild variant="outline" className="bg-primary text-white w-20">
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  );
}
