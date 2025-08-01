import { Bookmark, BookmarkResponse, ComicResponse, ReviewResponse } from "./definition";
import { id } from "zod/locales";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getComicDetail(idComic: string):Promise<ComicResponse>{
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }
    const res = await fetch(`${BASE_URL}/comic/${idComic}`)

    if (!res.ok) {
        throw new Error(`Error Fetching: ${res.status} ${res.statusText}`);
    }

    const data:ComicResponse = await res.json()
    return data
}

export async function getComicReview(idComic: string, token: string ): Promise<ReviewResponse> {
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }
    console.log(id)

    const res = await fetch(`${BASE_URL}/review/comic/${idComic}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error(`Error Fetching: ${res.status} ${res.statusText}`);
    }

    const data:ReviewResponse = await res.json()
    return data
}

export async function getBookmark(idComic: string, token: string ): Promise<Bookmark> {
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }

    const res = await fetch(`${BASE_URL}/bookmark/my`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error(`Error Fetching: ${res.status} ${res.statusText}`);
    }

    const data = await res.json()

    const bookmarkedComic = data.data.find((bookmark: Bookmark) => bookmark.comic.id_comic === idComic)
    return bookmarkedComic
}

export async function insertBookmark(idComic: string, token: string, status: string ): Promise<BookmarkResponse> {
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }

    const res = await fetch(`${BASE_URL}/bookmark/new/${idComic}?status=${status}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error(`Error Fetching: ${res.status} ${res.statusText}`);
    }

    const data = await res.json()

    return data
}

export async function updateBookmark(idBookmark: string, token: string, status: string ): Promise<BookmarkResponse> {
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }

    const res = await fetch(`${BASE_URL}/bookmark/${idBookmark}?status=${status}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error(`Error Fetching: ${res.status} ${res.statusText}`);
    }

    const data = await res.json()
    return data
}

export async function deleteBookmark(idBookmark: string, token: string ): Promise<BookmarkResponse> {
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }

    const res = await fetch(`${BASE_URL}/bookmark/${idBookmark}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error(`Error Fetching: ${res.status} ${res.statusText}`);
    }

    const data = await res.json()
    return data
}
