import { cookies } from 'next/headers'

export async function getToken ():Promise<string> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value || ""
  return token
}