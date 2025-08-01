import { FeatherIcon } from 'lucide-react';
import { fetchComicById } from '../data';
import { getToken } from '../data/action';
import Navbar from '../navbar';

export default async function ComicDetails() {
  // const comics: Comic[] = await fetchComicById();
  const token: string = await getToken();

  return (
    <div className="min-h-screen bg-primary">
      <Navbar token={token} />
      
    </div>
  );
}
