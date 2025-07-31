import { BookmarkResponse, Data, Comic } from "./definition";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getBookmarkList(token: string, params: string = ''): Promise<BookmarkResponse> {
    if (!BASE_URL) {
        throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
    }

    const response = await fetch(`${BASE_URL}/bookmark/my?${params}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

    if (!response.ok) {
        throw new Error(`cannot fetch data: ${response.status} ${response.statusText}`);
    }

    const result:BookmarkResponse = await response.json()
    return result
} 