'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthState(token ? 'authenticated' : 'unauthenticated');
    console.log('Token from localStorage:', token);
  }, []);

  return (
    <nav className="bg-primary w-full flex flex-row items-center justify-between p-4 shadow-md">
      <Link href="/">
        <Image src="/logo.png" alt="Logo Manchingu" width={100} height={100} className="w-auto h-auto" priority />
      </Link>

      <div className="min-w-[200px] flex justify-end">{authState === 'loading' ? null : authState === 'authenticated' ? <AuthenticatedLinks /> : <GuestLinks />}</div>
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
        <Button asChild variant="ghost" className="text-white hover:bg-accent hover:text-white">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="ghost" className="text-white hover:bg-accent hover:text-white">
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
