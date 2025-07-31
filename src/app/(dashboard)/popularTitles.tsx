"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Comic } from "@/app/(dashboard)/data/definition";
import { fetchAllComics } from "@/app/(dashboard)/data";
import { useEffect } from "react";
import Image from "next/image";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const [comics, setComics] = React.useState<Comic[]>([]);

  useEffect(() => {
    const getComics = async () => {
      const result = await fetchAllComics();
      setComics(result);
    };

    getComics();
  }, []);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {comics.slice(0, 5).map((comic, index) => (
          <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex h-full w-full flex-row items-start justify-center">
                  <Card className="relative w-full aspect-[2/3] bg-transparent shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-none">
                    <Image
                      src={comic.poster}
                      alt={comic.name}
                      fill
                      className="object-cover"
                    />
                  </Card>

                  <div className="ml-4 flex flex-col items-start">
                    <h3 className="text-2xl font-bold">{comic.name}</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      Rating: {comic.rating}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {comic.synopsis.length > 200
                        ? `${comic.synopsis.substring(0, 200)}...`
                        : comic.synopsis}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
