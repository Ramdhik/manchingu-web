import { Comic } from './definition';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchAllComics(): Promise<Comic[]> {
  if (!BASE_URL) {
    throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
  }

  const response = await fetch(`${BASE_URL}/comic/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Gagal mengambil daftar komik');
  }

  const json = await response.json();
  const comics: Comic[] = json.data.items;
  return comics;
}

export async function fetchComicById(id: string): Promise<Comic> {
  if (!BASE_URL) {
    throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
  }

  const response = await fetch(`${BASE_URL}/comic/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Gagal mengambil komik berdasarkan id');
  }
  const json = await response.json();
  const comic: Comic = json.data;
  return comic;
}
