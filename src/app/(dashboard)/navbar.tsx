"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllComics } from "@/app/(dashboard)/data";
import { Comic } from "@/app/(dashboard)/data/definition";

export function Navbar() {
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  const [comics, setComics] = useState<Comic[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTimeout(() => {
      setAuthState(token ? "authenticated" : "unauthenticated");
    });

    const getComics = async () => {
      const result = await fetchAllComics();
      setComics(result);
    };

    getComics();
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
          <AuthenticatedLinks comics={comics} />
        ) : (
          <GuestLinks comics={comics} />
        )}
      </div>
    </nav>
  );
}

function AuthenticatedLinks({ comics }: { comics: Comic[] }) {
  return (
    <div className="flex flex-row items-center gap-6">
      <div className="flex gap-4 ">
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
      <SearchBar allComics={comics} />
    </div>
  );
}

function GuestLinks({ comics }: { comics: Comic[] }) {
  return (
    <div className="flex flex-row items-center gap-4">
      <SearchBar allComics={comics} />
      <Button asChild className="bg-accent text-white w-20">
        <Link href="/signin">Sign In</Link>
      </Button>
      <Button asChild variant="outline" className="bg-primary text-white w-20">
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  );
}

function SearchBar({ allComics }: { allComics: Comic[] }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Comic[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }

    const result = allComics.filter((comic) =>
      comic.name.toLowerCase().includes(query.toLowerCase())
    );

    setFiltered(result.slice(0, 5));
    setShowDropdown(true);
  }, [query, allComics]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (filtered.length > 0) {
      window.location.href = `/comics/${filtered[0].id_comic}`;
    }
  }

  return (
    <div className="relative w-[300px]" ref={containerRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder="Search..."
            className="pl-9 bg-background w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 0 && setShowDropdown(true)}
          />
        </div>
      </form>

      {showDropdown && (
        <div className="absolute z-50 mt-3 bg-background border border-muted rounded-md w-full shadow-md">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground px-3 py-2">
              No results found.
            </p>
          ) : (
            filtered.map((comic) => (
              <Link
                href={`/comics/${comic.id_comic}`}
                key={comic.id_comic}
                className="flex items-center gap-3 px-3 py-2 hover:bg-accent transition-colors"
              >
                <div className="w-10 h-14 relative flex-shrink-0">
                  <Image
                    src={comic.poster}
                    alt={comic.name}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {comic.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {comic.author}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
