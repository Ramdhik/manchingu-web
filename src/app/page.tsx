import Image from 'next/image';
import { Navbar } from './(dashboard)/navbar';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default async function Home() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <div className="flex flex-col justify-center py-2 bg-primary">
        <Slider />
        {/* Tambahkan Card di sini */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8 px-4">
          <CardComponent title="Card 1" description="Deskripsi card pertama" content="Konten card pertama" />
          <CardComponent title="Card 2" description="Deskripsi card kedua" content="Konten card kedua" />
          <CardComponent title="Card 3" description="Deskripsi card ketiga" content="Konten card ketiga" />
        </div>
      </div>
    </div>
  );
}

async function Slider() {
  return (
    <div className="flex justify-center">
      <div className="relative h-[350px] w-full bg-primary-foreground/20 rounded-lg overflow-hidden"></div>
    </div>
  );
}

async function CardComponent({ title, description, content }: { title: string; description: string; content: string }) {
  return (
    <Card className="w-full h-min bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
