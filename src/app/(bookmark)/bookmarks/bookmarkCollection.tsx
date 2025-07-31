import { Button } from "@/components/ui/button";
import { Data } from "../data/definition";
import Image from "next/image";
import { useState } from "react";

export default function BookmarkCollection({ data }: { data: Data[] }) {
    const [bookmarks, setBookmarks] = useState<Data[]>(data)

    const BookmarksGrid = bookmarks.map((item) => {
        return (
            <article className="h-[300px] p-5 flex bg-cover bg-center rounded-xl" style={{ backgroundImage: `url(${item.comic.poster})`}} key={item.id_bookmark}>
                <h3 className="mt-auto font-bold text-xl">{item.comic.name}</h3>
            </article>
        )
    })

    const handleOnClick = (filter: string) => {
        const newBookmarks = data.filter((bookmark) => bookmark.status === filter)
        setBookmarks(newBookmarks)
    }

    return(
        <section>
            <div className="p-5">
                <Button onClick={() => handleOnClick("COMPLETED")}>Complete</Button>
                <Button onClick={() => handleOnClick("READING")}>Reading</Button>
                <Button onClick={() => handleOnClick("DROPPED")}>Dropped</Button>
                <Button onClick={() => handleOnClick("PLAN_TO_READ")}>Plan To Read</Button>
            </div>
            <div className="p-5 grid grid-cols-5 gap-5">
                {BookmarksGrid}
            </div>
        </section>
    )
}