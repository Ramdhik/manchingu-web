'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ComicDetail, Bookmark, BookmarkResponse, ReviewResponse, Review, UserResponse, UserData } from '../data/definition';
import { getBookmark, getComicReview, deleteBookmark, insertBookmark, updateBookmark, insertComicReview, updateComicReview, deleteComicReview } from '../data';
import { Album, StarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { text } from 'stream/consumers';

export default function DetailComic({ comic, bookmarkData, reviewData, userData, user, token }: { comic: ComicDetail; bookmarkData:Bookmark; reviewData: ReviewResponse; userData: UserData[]; user: UserData;token: string }) {
  const [bookmark, setBookmark] = useState<Bookmark | undefined>(bookmarkData? bookmarkData : undefined);
  const [reviews, setReviews] = useState<Review[]>(reviewData.data);
  const [users, setUsers] = useState<UserData[]>(userData);
  const [userReview, setUserReview] = useState<Review | undefined>(reviewData.data.find((review) => review.id_user === user.id_user))

  const handleInsertReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const review_text = formData.get("review_text") as string;
    const rating = Number(formData.get("rating"));
    const insertedReview = await insertComicReview(comic.id_comic ,token, {review_text, rating})
    setUserReview(insertedReview)
    const newReviewList = await getComicReview(comic.id_comic, token)
    setReviews(newReviewList.review.data)
    setUsers(newReviewList.userReview)
  }

  const handleUpdateReview = async (rating: number, review_text: string) => {
    if(userReview){
      const updatedReview = await updateComicReview(userReview.id_review, token, {review_text, rating})
      setUserReview(updatedReview)
      const newReviewList = await getComicReview(comic.id_comic, token)
      setReviews(newReviewList.review.data)
      setUsers(newReviewList.userReview)
    }
  }
  const handleDeleteReview = async () => {
    if(userReview){
      await deleteComicReview(userReview?.id_review, token)
      setUserReview(undefined)
      const newReviewList = await getComicReview(comic.id_comic, token)
      setReviews(newReviewList.review.data)
      setUsers(newReviewList.userReview)
    }
  }

  const handleSetBookmark = async (status: string) => {
    if (!token) return;
    const inserted = await insertBookmark(comic.id_comic, token, status);
    setBookmark(inserted.data);
  };

  const handleUpdateBookmark = async (status: string) => {
    if (!token || !bookmark) return;
    const updated = await updateBookmark(bookmark.id_bookmark, token, status);
    setBookmark(updated.data);
  };

  const handleDeleteBookmark = async () => {
    if (!token || !bookmark) return;
    await deleteBookmark(bookmark.id_bookmark, token);
    setBookmark(undefined);
  };

  return (
    <section className="p-10">
      <div className="flex gap-5 max-w-7xl mx-auto p-4">
        <LeftSection comic={comic} />
        <RightSection comic={comic} token={token} reviews={reviews} bookmark={bookmark} userReview={userReview} users={users} onSetBookmark={handleSetBookmark} onUpdateBookmark={handleUpdateBookmark} onDeleteBookmark={handleDeleteBookmark} onInsertReview={handleInsertReview} onUpdateReview={handleUpdateReview} onDeleteReview={handleDeleteReview}/>
      </div>
    </section>
  );
}

function LeftSection({ comic }: { comic: ComicDetail }) {
  return (
    <div className="flex flex-col">
      <div className="min-w-[300px] max-w-[300px] h-[400px] relative flex flex-col gap-5">
        <Image src={comic.poster} alt={comic.name} fill className="object-cover rounded-lg" />
      </div>

      <div className="flex flex-row gap-5 mt-5">
        <div className="flex flex-row gap-2">
          <StarIcon className="text-accent mt-1" />
          <p className="text-accent text-2xl font-bold">{comic.rating}</p>
        </div>
        <div className="flex flex-row gap-2">
          <Album className="text-accent mt-1" />
          <p className="text-accent text-2xl font-bold">{comic.bookmarked}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className={`w-5 h-5 rounded-full text-center mt-1 ${comic.status === 'ON_GOING' ? 'bg-green-700 text-green-700' : 'bg-red-700 text-red-700'}`}>a</div>
        <h2 className="text-white text-xl font-bold">
          {comic.status
            .replace(/_/g, '-')
            .toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </h2>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-white text-xl font-bold">Author</h2>
        <span className="text-white text-lg bg-secondary p-3 rounded-lg w-fit font-medium">{comic.author}</span>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-white text-xl font-bold">Artist</h2>
        <span className="text-white text-lg bg-secondary p-3 rounded-lg w-fit font-medium">{comic.artist}</span>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-white text-xl font-bold">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {comic.comicGenre && comic.comicGenre.length > 0 ? (
            comic.comicGenre.map((genreItem, index) => (
              <span key={index} className="text-white text-sm bg-secondary px-3 py-1 rounded-full font-bold">
                {genreItem.genre.name}
              </span>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No genres available</p>
          )}
        </div>
      </div>
    </div>
  );
}

function BookmarkSection({
  token,
  bookmark,
  onSetBookmark,
  onUpdateBookmark,
  onDeleteBookmark,
}: {
  token: string;
  bookmark: Bookmark | undefined;
  onSetBookmark: (status: string) => void;
  onUpdateBookmark: (status: string) => void;
  onDeleteBookmark: () => void;
}) {
  if (!token) return null;

  const statusOptions = ['COMPLETED', 'READING', 'PLAN_TO_READ', 'DROPPED'];

  if (bookmark === undefined) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="p-6 text-xl bg-secondary hover:bg-muted">Add Bookmark</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] bg-secondary">
          <div className="flex flex-col gap-2">
            {statusOptions.map((status) => (
              <Button key={status} className="bg-muted text-xl" onClick={() => onSetBookmark(status)}>
                {status.replace(/_/g, ' ')}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="p-6 text-xl bg-secondary hover:bg-muted">Change status ({bookmark.status.replace(/_/g, ' ')})</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] bg-secondary">
        <div className="flex flex-col gap-2">
          {statusOptions.map((status) => (
            <Button key={status} className="bg-muted text-xl" onClick={() => onUpdateBookmark(status)}>
              {status.replace(/_/g, ' ')}
            </Button>
          ))}
          <Button className="bg-destructive text-xl" onClick={onDeleteBookmark}>
            Remove Bookmark
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ReviewSection({
  reviews,
  users,
  userReview,
  idComic,
  token,
  handleInsertReview,
  onDeleteReview,
  onUpdateReview
}: {
  reviews: Review[],
  users: UserData[],
  userReview: Review | undefined,
  idComic: string,
  token: string,
  handleInsertReview: (e: React.FormEvent<HTMLFormElement>) => void,
  onDeleteReview: () => void,
  onUpdateReview: (rating: number, review_text: string) => void
}){
  const reviewCards = reviews.map((review) => {
    const user = users.find((user) => user.id_user === review.id_user)
    const date = new Date(review.updated_at)
    const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
    return(
      <article key={review.id_review} className='flex gap-5'>
        <Image
          src={"/profile.png"}
          alt='Profile image'
          height={80}
          width={80} 
        />
        <div className='flex flex-col justify-center'>
          <div className='flex gap-3 items-center'>
            <p className='text-2xl font-bold text-accent'>{user?.username}</p>
            <p className='text-[#747474] font-semibold'>{formatted}</p>
          </div>
          <p className='text-white text-xl'>{review.review_text}</p>
        </div>
      </article>
    )
  })
  return(
    <div className='flex flex-col gap-5'>
      <InputReview handleInsertReview={handleInsertReview} userReview={userReview} onUpdateReview={onUpdateReview} onDeleteReview={onDeleteReview}/>
      <h2 className='text-white text-3xl font-bold'>Rating dan Ulasan</h2>
      {reviewCards.length === 0 ?
        <p className='text-white'>Belum ada review</p>
        :
        reviewCards
      }
    </div>
  )
}

function InputReview({
  handleInsertReview, 
  userReview,
  onUpdateReview,
  onDeleteReview
}: {
  handleInsertReview: (e: React.FormEvent<HTMLFormElement>) => void, 
  userReview: Review | undefined,
  onUpdateReview: (rating: number, review_text: string) => void,
  onDeleteReview: () => void
}){
  const [reviewText, setReviewText] = useState<string | undefined>(userReview?.review_text)
  const [rating, setRating] = useState<number | undefined>(userReview?.rating)

  const deleteReview = () => {
    if(reviewText && rating){
      setReviewText("")
      setRating(undefined)
      onDeleteReview()
    }
  }
  
  return (
    <form onSubmit={handleInsertReview}>
      <div className='relative'>
        <Input 
          value={reviewText ?? ""}
          onChange={(e) => setReviewText(e.target.value)}
          name='review_text' 
          placeholder='Tulis ulasan anda' 
          className='text-white p-5 pr-25 !text-xl h-auto'
          />
        <Input 
          value={rating ?? ""}
          onChange={(e) => setRating(Number(e.target.value))}
          name='rating' 
          placeholder='Masukkan rating' 
          type='number' 
          min={1} 
          max={5} 
          className='text-white p-5 pr-25 !text-xl h-auto'
          />
        {userReview?
          <Button 
            className='absolute top-0 right-0 h-full bg-muted text-white text-xl hover:bg-accent hover:text-white border border-input'
            type='button'
            onClick={() => rating && reviewText && onUpdateReview(rating, reviewText)}
            >
            Update
          </Button>
         :
          <Button 
            className='absolute top-0 right-0 h-full bg-muted text-white text-xl hover:bg-accent hover:text-white border border-input'
            >
            Submit
          </Button>
         }
      </div>
      {
        userReview &&
        <Button
          className='w-full mt-5 p-5 bg-muted text-white text-xl hover:bg-accent hover:text-white border border-input'
          type='button'
          onClick={() => deleteReview()}
          >
            Delete Review
          </Button>
      }
    </form>
  )
}

function RightSection({
  comic,
  token,
  bookmark,
  onSetBookmark,
  onUpdateBookmark,
  onDeleteBookmark,
  onInsertReview,
  reviews,
  users,
  userReview,
  onDeleteReview,
  onUpdateReview
}: {
  comic: ComicDetail;
  token: string;
  bookmark: Bookmark | undefined;
  onSetBookmark: (status: string) => void;
  onUpdateBookmark: (status: string) => void;
  onDeleteBookmark: () => void;
  onInsertReview: (e: React.FormEvent<HTMLFormElement>) => void;
  reviews: Review[];
  users : UserData[];
  userReview: Review | undefined;
  onUpdateReview: (rating: number, review_text:string) => void
  onDeleteReview: () => void
}) {
  return (
    <div className="px-5 flex flex-col gap-10">
      <h1 className="text-white text-4xl font-bold">{comic.name}</h1>
      <p className="text-white text-justify">{comic.synopsis}</p>

      <BookmarkSection token={token} bookmark={bookmark} onSetBookmark={onSetBookmark} onUpdateBookmark={onUpdateBookmark} onDeleteBookmark={onDeleteBookmark} />
      <ReviewSection reviews={reviews} users={users} userReview={userReview} idComic={comic.id_comic} token={token} handleInsertReview={onInsertReview} onUpdateReview={onUpdateReview} onDeleteReview={onDeleteReview}/>
    </div>
  );
}
