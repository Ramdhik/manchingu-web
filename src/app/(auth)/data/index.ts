import { ApiResponse, UserLogin, UserRegister } from './definition';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function registerUser(user: UserRegister): Promise<ApiResponse> {
  if (!BASE_URL) {
    throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
  }

  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Pendaftaran gagal');
  }

  const result: ApiResponse = await response.json();

  // Simpan token ke localStorage
  if (result.token) {
    localStorage.setItem('token', result.token);
  }

  return result;
}

export async function loginUser(user: UserLogin): Promise<ApiResponse> {
  if (!BASE_URL) {
    throw new Error('BASE_URL tidak ditemukan. Periksa file .env');
  }

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Login gagal: Email atau password salah');
  }

  const result: ApiResponse = await response.json();

  // Simpan token ke localStorage
  if (result.token) {
    localStorage.setItem('token', result.token);
  }

  return result;
}
