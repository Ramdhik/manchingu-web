import { Button } from '@/components/ui/button';
import { Data } from '../data/definition';
import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function BookmarkCollection({ data }: { data: Data[] }) {
  const [bookmarks, setBookmarks] = useState<Data[]>(data.filter((bookmark) => bookmark.status === 'COMPLETED'));
  const [filter, setFilter] = useState<string>('COMPLETED');

  const BookmarksGrid = bookmarks.map((item) => {
    return (
      <Link key={item.id_bookmark} href={`/comic/${item.comic.id_comic}`} className="group">
        <Card className="relative w-full aspect-[2/3] bg-transparent shadow-lg border-none overflow-hidden transform transition-transform duration-300 group-hover:-translate-y-2">
          <Image src={item.comic.poster} alt={item.comic.name} fill className="object-cover" />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3">
            <h3 className="text-white text-lg font-semibold">{item.comic.name}</h3>
          </div>
        </Card>
      </Link>
    );
  });

  const handleOnClick = (filter: string) => {
    const newBookmarks = data.filter((bookmark) => bookmark.status === filter);
    setBookmarks(newBookmarks);
    setFilter(filter);
  };

  return (
    <section>
      <div className="p-5 flex gap-3">
        <Button onClick={() => handleOnClick('COMPLETED')} className={`${filter === 'COMPLETED' && 'active'} hover:bg-accent`}>
          Complete
        </Button>
        <Button onClick={() => handleOnClick('READING')} className={`${filter === 'READING' && 'active'} hover:bg-accent`}>
          Reading
        </Button>
        <Button onClick={() => handleOnClick('DROPPED')} className={`${filter === 'DROPPED' && 'active'} hover:bg-accent`}>
          Dropped
        </Button>
        <Button onClick={() => handleOnClick('PLAN_TO_READ')} className={`${filter === 'PLAN_TO_READ' && 'active'} hover:bg-accent`}>
          Plan To Read
        </Button>
      </div>
      <div className="p-5 grid grid-cols-5 gap-5">{BookmarksGrid}</div>
    </section>
  );
}
