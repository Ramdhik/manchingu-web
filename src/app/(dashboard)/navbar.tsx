import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-primary w-full flex flex-row items-center justify-between p-4 shadow-md">
      <Link href="/">
        <Image src="/logo.png" alt="Logo Manchingu" width={100} height={100} className="w-auto h-auto" priority />
      </Link>

      <div className="flex flex-row items-center gap-4">
        <Button asChild className="bg-accent text-white w-20">
          <Link href="/signin">Sign In</Link>
        </Button>

        <Button asChild variant="outline" className="bg-primary text-white w-20">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
}
