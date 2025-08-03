import { Bookmark, BookmarkResponse, ComicResponse, Review, ReviewResponse, UserData, UserResponse } from "./definition";
import { id } from "zod/locales";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Detail Comic
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

// Comic Review
export async function getComicReview(idComic: string, token: string ): Promise<{review: ReviewResponse, userReview: UserData[]}> {
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }

    const comicRes = await fetch(`${BASE_URL}/review/comic/${idComic}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!comicRes.ok) {
        throw new Error(`Error Fetching: ${comicRes.status} ${comicRes.statusText}`);
    }

    const comicData:ReviewResponse = await comicRes.json()

    const userRes:UserData[] = await Promise.all(
        comicData.data.map(async (review) =>{
            const response = await fetch(`${BASE_URL}/user/${review.id_user}`)
            const data: UserResponse = await response.json()
            return data.data
        })
    )
    return {review: comicData, userReview: userRes}
}

export async function insertComicReview(idComic: string, token: string, data: {rating: number, review_text: string} ): Promise<Review> {
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }

    const reviewRes = await fetch(`${BASE_URL}/review/new/${idComic}`, {
        method: "POST",
        headers: {
             "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    if (!reviewRes.ok) {
        throw new Error(`Error Fetching: ${reviewRes.status} ${reviewRes.statusText}`);
    }

    const reviewData = await reviewRes.json()
    return reviewData.data
}
export async function updateComicReview(idReview: string, token: string, data: {rating: number, review_text: string} ): Promise<Review> {
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }

    const reviewRes = await fetch(`${BASE_URL}/review/${idReview}`, {
        method: "PUT",
        headers: {
             "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    if (!reviewRes.ok) {
        throw new Error(`Error Fetching: ${reviewRes.status} ${reviewRes.statusText}`);
    }

    const reviewData = await reviewRes.json()
    return reviewData.data
}
export async function deleteComicReview(idReview: string, token: string ): Promise<ReviewResponse> {
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }

    const reviewRes = await fetch(`${BASE_URL}/review/${idReview}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!reviewRes.ok) {
        throw new Error(`Error Fetching: ${reviewRes.status} ${reviewRes.statusText}`);
    }

    const reviewData:ReviewResponse = await reviewRes.json()
    return reviewData
}

// Bookmark
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

export async function getUser(token:string):Promise<UserData> {
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }

    const res = await fetch(`${BASE_URL}/user/my/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error(`Error Fetching: ${res.status} ${res.statusText}`);
    }

    const data:UserResponse = await res.json()
    return data.data
}

