'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Comic } from '@/app/(dashboard)/data/definition';
import { fetchAllComics } from '@/app/(dashboard)/data';
import { useEffect } from 'react';
import Image from 'next/image';

export function CarouselPlugin() {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [comics, setComics] = React.useState<Comic[]>([]);

  useEffect(() => {
    const getComics = async () => {
      const result = await fetchAllComics();
      setComics(result);
    };

    getComics();
  }, []);

  return (
    <Carousel plugins={[plugin.current]} className="w-full" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
      <CarouselContent>
        {comics.slice(0, 5).map((comic, index) => (
          <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
            <div className="p-1 h-[300px]">
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md h-full rounded-xl">
                <CardContent className="flex h-full w-full flex-row items-start justify-center p-4 gap-4">
                  <div className="relative w-[200px] aspect-[2/3] rounded overflow-hidden shadow-md">
                    <Image src={comic.poster} alt={comic.name} fill className="object-cover" />
                  </div>

                  <div className="flex flex-col justify-between overflow-hidden h-full w-full">
                    <h3 className="text-2xl font-bold line-clamp-2 text-white">{comic.name}</h3>
                    <p className="text-sm text-white">Rating: {comic.rating}</p>
                    <p className="text-sm text-white line-clamp-4">{comic.synopsis}</p>
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
