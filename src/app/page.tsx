import Image from 'next/image';
import { Navbar } from './(dashboard)/navbar';
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-primary ">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} className="w-auto h-auto" />
        <h1 className="text-3xl font-bold">Manchingu</h1>
        <p className="text-lg">A simple and easy to use web application for managing your manchingu collection.</p>
      </div>
    </>
  );
}
