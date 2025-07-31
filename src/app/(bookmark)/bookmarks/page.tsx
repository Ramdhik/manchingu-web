'use client'
import { useEffect, useState } from "react";
import { Data } from "../data/definition";
import { getBookmarkList } from "../data";
import { Navbar } from "@/app/(dashboard)/navbar";
import BookmarkCollection from "./bookmarkCollection";

export default function Bookmark() {
    const [ token, setToken ] = useState<string>("loading")
    const [ bookmarks, setBookmarks ] = useState<Data[]>()

    useEffect(() => {
        const getToken = () => {
            const savedToken = localStorage.getItem("token")
            if(savedToken) setToken(savedToken)
        } 
        getToken()
    },[])

    useEffect(() => {
        const getApiRes = async () => {
            if(token === "loading") return
            const responseAllStatus = await getBookmarkList(token)
            setBookmarks(responseAllStatus.data)
        }

        getApiRes()
    },[token])

    return(
        <div className="bg-primary min-h-screen">
            <Navbar />
            {
                bookmarks &&
                <BookmarkCollection data={bookmarks} />
            }
        </div>
    )
}