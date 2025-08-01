// Comic Detail
export interface ComicResponse {
    success: boolean,
    data: ComicDetail
}

export interface ComicDetail {
    id_comic: string,
    name: string,
    synopsis: string,
    author: string,
    artist: string,
    status: string,
    poster: string,
    comicGenre: [{
        genre: {
            name: string
        },
    }],
    created_at: string,
    updated_at: string,
    rating: number,
    bookmarked: number
}

// Comic Review
export interface Review {
  id_review: string;
  id_user: string;
  id_comic: string;
  rating: number;
  review_text: string;
  created_at: string; // bisa diganti ke Date jika di-convert
  updated_at: string;
  deleted_at: string | null;
  comic: {
    name: string
  };
}

export interface ReviewResponse {
  success: boolean;
  data: Review[];
}

// Comic Bookmark
export interface BookmarkResponse {
    success: boolean,
    data: Bookmark
}

export interface Bookmark {
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
