export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-primary items-center justify-center p-12">
        <div className="text-center space-y-4 text-primary-foreground">

          <div className="mt-8 p-8 bg-primary/20 rounded-lg">
            <p className="text-lg">Tempat gambar atau ilustrasi</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
