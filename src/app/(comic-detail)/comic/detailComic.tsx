'use client'
import { Button } from "@/components/ui/button";
import { ComicDetail, Bookmark } from "../data/definition";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { deleteBookmark, insertBookmark, updateBookmark } from "../data";
import { useState } from "react";

export default function DetailComic({ bookmarkData, comic, idComic, token }: { bookmarkData: Bookmark, comic: ComicDetail, idComic: string, token: string}){
    const [ bookmark, setBookmark ] = useState<Bookmark | undefined>(bookmarkData)

    const handleSetBookmark = async (status: string) => {
        const insertedBookmark = await insertBookmark(idComic, token, status)
        setBookmark(insertedBookmark.data)
    }

    const handleUpdateBookmark = async (status: string) => {
        if(bookmark){
            const updatedBookmark = await updateBookmark(bookmark.id_bookmark, token, status)
            setBookmark(updatedBookmark.data)
        }
    }

    const handleDeleteBookmark = async () => {
         if(bookmark){
            await deleteBookmark(bookmark.id_bookmark, token)
            setBookmark(undefined)
        }
    }
    return(
        <section className="p-10">
            <div className="flex gap-5">
                <div className="min-w-[300px] h-[400px] relative">
                    <Image
                        src={comic.poster}
                        alt={comic.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="px-5 flex flex-col gap-10">
                    <h1 className="text-white text-4xl font-bold">{comic.name}</h1>
                    <p className="text-white text-justify">{comic.synopsis}</p>
                    {
                        bookmark === undefined ? 
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="p-6 text-xl bg-secondary hover:bg-muted">Add Bookmark</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[500px] bg-secondary">
                                <div className="flex flex-col gap-2">
                                    <Button className="bg-muted text-xl" onClick={() => handleSetBookmark("COMPLETED")}>Completed</Button>
                                    <Button className="bg-muted text-xl" onClick={() => handleSetBookmark("READING")}>Reading</Button>
                                    <Button className="bg-muted text-xl" onClick={() => handleSetBookmark("PLAN_TO_READ")}>Plan To Read</Button>
                                    <Button className="bg-muted text-xl" onClick={() => handleSetBookmark("DROPPED")}>Dropped</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        :
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="p-6 text-xl bg-secondary hover:bg-muted">Change status {`(${bookmark.status})`}</Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[500px] bg-secondary">
                                <div className="flex flex-col gap-2">
                                    <Button className="bg-muted text-xl" onClick={() => handleUpdateBookmark("COMPLETED")}>Completed</Button>
                                    <Button className="bg-muted text-xl" onClick={() => handleUpdateBookmark("READING")}>Reading</Button>
                                    <Button className="bg-muted text-xl" onClick={() => handleUpdateBookmark("PLAN_TO_READ")}>Plan To Read</Button>
                                    <Button className="bg-muted text-xl" onClick={() => handleUpdateBookmark("DROPPED")}>Dropped</Button>
                                    <Button className="bg-muted text-xl" onClick={() => handleDeleteBookmark()}>Remove Bookmark</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    }
                </div>
            </div>
        </section>
    )
}