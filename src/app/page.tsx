import Image from "next/image";
import Navbar from "./(dashboard)/navbar";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { fetchAllComics } from "./(dashboard)/data";
import { getToken } from "./(dashboard)/data/action";
import { Comic } from "./(dashboard)/data/definition";
import { CarouselPlugin } from "./(dashboard)/popularTitles";

export default async function Home() {
  const comics: Comic[] = await fetchAllComics();
  const token:string = await getToken()

  return (
    <div className="min-h-screen bg-primary">
      <Navbar token={token}/>
      <div className="flex flex-col justify-center py-2 bg-primary max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-primary-foreground px-4 mb-4">
          Popular Titles
        </h1>
        <Slider />
        <h1 className="text-2xl font-bold text-primary-foreground px-4 mt-6">
          Recomended Comic
        </h1>
        {/* Tambahkan Card di sini */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6 px-4">
          {comics.slice(0, 3).map((comic) => (
            <CardComponent
              key={comic.id_comic}
              title={comic.name}
              description={comic.synopsis}
              content={`Rating: ${comic.rating}`}
              poster={comic.poster}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

async function Slider() {
  return (
    <div className="flex justify-center">
      {/* <div className="relative h-[350px] w-full bg-primary-foreground/20 rounded-lg overflow-hidden" /> */}
      <CarouselPlugin />
    </div>
  );
}

function CardComponent({
  title,
  description,
  content,
  poster,
}: {
  title: string;
  description: string;
  content: string;
  poster: string;
}) {
  return (
    <Card className="relative w-full aspect-[2/3] bg-transparent shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-none">
      <Image src={poster} alt={title} fill className="object-cover" />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3">
        <h3 className="text-white text-lg font-semibold">{title}</h3>
      </div>
    </Card>
  );
}
