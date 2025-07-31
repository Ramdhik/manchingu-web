import { cookies } from 'next/headers'
import BookmarkComponent from './bookmarkComponent'

export default async function Bookmark() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || ""

    return(
        <div>
            <BookmarkComponent token={token}/>
        </div>
    )
}