'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ComicDetail, Bookmark } from '../data/definition';
import { getBookmark, getComicReview, deleteBookmark, insertBookmark, updateBookmark } from '../data';
import { Album, StarIcon } from 'lucide-react';

export default function DetailComic({ comic, idComic, token }: { comic: ComicDetail; idComic: string; token: string }) {
  const [bookmark, setBookmark] = useState<Bookmark | undefined>(undefined);
  const [reviews, setReviews] = useState<ComicDetail[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const [bookmarkRes, reviewRes] = await Promise.all([getBookmark(idComic, token), getComicReview(idComic, token)]);

        setBookmark(bookmarkRes);
        setReviews(reviewRes.data);
      } catch (error) {
        console.error('Failed to fetch bookmark/review', error);
      }
    };

    fetchData();
  }, [idComic, token]);

  const handleSetBookmark = async (status: string) => {
    if (!token) return;
    const inserted = await insertBookmark(idComic, token, status);
    setBookmark(inserted.data);
  };

  const handleUpdateBookmark = async (status: string) => {
    if (!token || !bookmark) return;
    const updated = await updateBookmark(bookmark.id_bookmark, token, status);
    setBookmark(updated.data);
  };

  const handleDeleteBookmark = async () => {
    if (!token || !bookmark) return;
    await deleteBookmark(bookmark.id_bookmark, token);
    setBookmark(undefined);
  };

  return (
    <section className="p-10">
      <div className="flex gap-5 max-w-7xl mx-auto p-4">
        <LeftSection comic={comic} />
        <RightSection comic={comic} token={token} bookmark={bookmark} onSetBookmark={handleSetBookmark} onUpdateBookmark={handleUpdateBookmark} onDeleteBookmark={handleDeleteBookmark} />
      </div>
    </section>
  );
}

function LeftSection({ comic }: { comic: ComicDetail }) {
  return (
    <div className="flex flex-col">
      <div className="min-w-[300px] h-[400px] relative flex flex-col gap-5">
        <Image src={comic.poster} alt={comic.name} fill className="object-cover rounded-lg" />
      </div>

      <div className="flex flex-row gap-5 mt-5">
        <div className="flex flex-row gap-2">
          <StarIcon className="text-accent mt-1" />
          <p className="text-accent text-2xl font-bold">{comic.rating}</p>
        </div>
        <div className="flex flex-row gap-2">
          <Album className="text-accent mt-1" />
          <p className="text-accent text-2xl font-bold">{comic.bookmarked}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className={`w-5 h-5 rounded-full text-center mt-1 ${comic.status === 'ON_GOING' ? 'bg-green-700 text-green-700' : 'bg-red-700 text-red-700'}`}>a</div>
        <h2 className="text-white text-xl font-bold">
          {comic.status
            .replace(/_/g, '-')
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </h2>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-white text-xl font-bold">Author</h2>
        <span className="text-white text-lg bg-secondary p-3 rounded-lg w-fit font-medium">{comic.author}</span>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-white text-xl font-bold">Artist</h2>
        <span className="text-white text-lg bg-secondary p-3 rounded-lg w-fit font-medium">{comic.artist}</span>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-white text-xl font-bold">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {comic.comicGenre && comic.comicGenre.length > 0 ? (
            comic.comicGenre.map((genreItem, index) => (
              <span key={index} className="text-white text-sm bg-secondary px-3 py-1 rounded-full font-bold">
                {genreItem.genre.name}
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No genres available</p>
          )}
        </div>
      </div>
    </div>
  );
}

function BookmarkSection({
  token,
  bookmark,
  onSetBookmark,
  onUpdateBookmark,
  onDeleteBookmark,
}: {
  token: string;
  bookmark: Bookmark | undefined;
  onSetBookmark: (status: string) => void;
  onUpdateBookmark: (status: string) => void;
  onDeleteBookmark: () => void;
}) {
  if (!token) return null;

  const statusOptions = ['COMPLETED', 'READING', 'PLAN_TO_READ', 'DROPPED'];

  if (bookmark === undefined) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="p-6 text-xl bg-secondary hover:bg-muted">Add Bookmark</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] bg-secondary">
          <div className="flex flex-col gap-2">
            {statusOptions.map((status) => (
              <Button key={status} className="bg-muted text-xl" onClick={() => onSetBookmark(status)}>
                {status.replace(/_/g, ' ')}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="p-6 text-xl bg-secondary hover:bg-muted">Change status ({bookmark.status.replace(/_/g, ' ')})</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] bg-secondary">
        <div className="flex flex-col gap-2">
          {statusOptions.map((status) => (
            <Button key={status} className="bg-muted text-xl" onClick={() => onUpdateBookmark(status)}>
              {status.replace(/_/g, ' ')}
            </Button>
          ))}
          <Button className="bg-destructive text-xl" onClick={onDeleteBookmark}>
            Remove Bookmark
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function RightSection({
  comic,
  token,
  bookmark,
  onSetBookmark,
  onUpdateBookmark,
  onDeleteBookmark,
}: {
  comic: ComicDetail;
  token: string;
  bookmark: Bookmark | undefined;
  onSetBookmark: (status: string) => void;
  onUpdateBookmark: (status: string) => void;
  onDeleteBookmark: () => void;
}) {
  return (
    <div className="px-5 flex flex-col gap-10">
      <h1 className="text-white text-4xl font-bold">{comic.name}</h1>
      <p className="text-white text-justify">{comic.synopsis}</p>

      <BookmarkSection token={token} bookmark={bookmark} onSetBookmark={onSetBookmark} onUpdateBookmark={onUpdateBookmark} onDeleteBookmark={onDeleteBookmark} />
    </div>
  );
}
