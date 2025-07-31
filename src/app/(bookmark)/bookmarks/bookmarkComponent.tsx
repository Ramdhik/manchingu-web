'use client'
import { useEffect, useState } from "react";
import { Data } from "../data/definition";
import { getBookmarkList } from "../data";
import Navbar from "@/app/(dashboard)/navbar";
import BookmarkCollection from "./bookmarkCollection";

export default function BookmarkComponent({token} : {token: string}) {
    const [ bookmarks, setBookmarks ] = useState<Data[]>()

    useEffect(() => {
        const getApiRes = async () => {
            if(!token) return
            const responseAllStatus = await getBookmarkList(token)
            setBookmarks(responseAllStatus.data)
        }

        getApiRes()
    },[token])

    return(
        <div className="bg-primary min-h-screen">
            <Navbar token={token}/>
            {
                bookmarks &&
                <BookmarkCollection data={bookmarks} />
            }
        </div>
    )
}