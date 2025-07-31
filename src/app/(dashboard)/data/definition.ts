export interface HomeProps {
  token: string;
}
export interface Comic {
  id_comic: string;
  name: string;
  synopsis: string;
  author: string;
  artist: string;
  status: 'ON_GOING' | 'COMPLETED' | 'HIATUS' | 'CANCELLED';
  poster: string;
  genre: string[];
  created_at: Date;
  updated_at: Date;
  rating: number;
  bookmarked: number;
}
