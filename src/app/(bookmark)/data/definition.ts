export interface BookmarkResponse {
    success: boolean,
    data: Data[]
}

export interface Data {
    id_bookmark: string,
    id_user: string,
    comic: Comic,
    status: string,
    created_at: string,
    updated_at: string,
}

export interface Comic {
    id_comic: string,
    name: string,
    synopsis: string,
    author: string,
    artist: string,
    status: string,
    poster: string,
    genre: string[],
    created_at: string,
    updated_at: string,
    rating: number,
    bookmarked: number
}