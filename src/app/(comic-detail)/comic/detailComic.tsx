"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ComicDetail, Bookmark } from "../data/definition";
import {
  getBookmark,
  getComicReview,
  deleteBookmark,
  insertBookmark,
  updateBookmark,
} from "../data";

export default function DetailComic({
  comic,
  idComic,
  token,
}: {
  comic: ComicDetail;
  idComic: string;
  token: string;
}) {
  const [bookmark, setBookmark] = useState<Bookmark | undefined>(undefined);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const [bookmarkRes, reviewRes] = await Promise.all([
          getBookmark(idComic, token),
          getComicReview(idComic, token),
        ]);

        setBookmark(bookmarkRes);
        setReviews(reviewRes.data);
      } catch (error) {
        console.error("Failed to fetch bookmark/review", error);
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
        <div className="min-w-[300px] h-[400px] relative">
          <Image
            src={comic.poster}
            alt={comic.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="px-5 flex flex-col gap-10">
          <h1 className="text-white text-4xl font-bold">{comic.name}</h1>
          <p className="text-white text-justify">{comic.synopsis}</p>

          {/* Bookmark feature */}
          {token &&
            (bookmark === undefined ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="p-6 text-xl bg-secondary hover:bg-muted">
                    Add Bookmark
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] bg-secondary">
                  <div className="flex flex-col gap-2">
                    {["COMPLETED", "READING", "PLAN_TO_READ", "DROPPED"].map(
                      (status) => (
                        <Button
                          key={status}
                          className="bg-muted text-xl"
                          onClick={() => handleSetBookmark(status)}
                        >
                          {status.replace(/_/g, " ")}
                        </Button>
                      )
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="p-6 text-xl bg-secondary hover:bg-muted">
                    Change status ({bookmark.status.replace(/_/g, " ")})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] bg-secondary">
                  <div className="flex flex-col gap-2">
                    {["COMPLETED", "READING", "PLAN_TO_READ", "DROPPED"].map(
                      (status) => (
                        <Button
                          key={status}
                          className="bg-muted text-xl"
                          onClick={() => handleUpdateBookmark(status)}
                        >
                          {status.replace(/_/g, " ")}
                        </Button>
                      )
                    )}
                    <Button
                      className="bg-destructive text-xl"
                      onClick={handleDeleteBookmark}
                    >
                      Remove Bookmark
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
        </div>
      </div>
    </section>
  );
}
