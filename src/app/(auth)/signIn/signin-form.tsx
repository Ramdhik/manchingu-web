'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../data/index';
import { UserLogin } from '../data/definition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SigninForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const userData: UserLogin = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      await loginUser(userData);
      router.push('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="email@contoh.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" placeholder="Masukkan password" required />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Memproses...' : 'Masuk'}
      </Button>
    </form>
  );
}
