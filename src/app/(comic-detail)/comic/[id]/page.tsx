import { getToken } from "../../data/action";
import { getBookmark, getComicDetail, getComicReview, getUser } from "../../data";
import Navbar from "@/app/(dashboard)/navbar";
import DetailComic from "../detailComic";

export default async function ComicDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getToken();

  const comicResponse = await getComicDetail(id);
  const reviewResponse = await getComicReview(id, token);
  const bookmarkResponse = await getBookmark(id, token);
  const userResponse = await getUser(token)
  return (
    <div className="min-h-screen bg-primary">
      <Navbar token={token} />
      <DetailComic comic={comicResponse.data} bookmarkData={bookmarkResponse} reviewData={reviewResponse.review} user={userResponse} userData={reviewResponse.userReview} token={token} />
    </div>
  );
}
