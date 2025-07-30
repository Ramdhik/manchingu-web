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

  const comics: Comic[] = await response.json();
  return comics;
}
