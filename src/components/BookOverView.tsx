import Image from 'next/image';
import { Button } from './ui/button';
import BookCover from './BookCover';

function BookOverView({
    title,
    author,
    genre,
    rating,
    total_copies,
    available_copies,
    description,
    coverColor,
    coverURL,
}: BookType) {
    console.log('coverURL:', coverURL);
    console.log('coverColor:', coverColor);
    return (
        <>
            <section className="book-overview">
                <div className="flex flex-col flex-1 gap-5">
                    <h1>{title}</h1>

                    <div className="book-info">
                        <p>
                            By{' '}
                            <span className="font-semibold text-light-200">
                                {author}
                            </span>
                        </p>

                        <p>
                            Category{' '}
                            <span className="font-semibold text-light-200">
                                {genre}
                            </span>
                        </p>

                        <div className="flex flex-row gap-1">
                            <Image
                                src="/icons/star.svg"
                                alt="star"
                                width={22}
                                height={22}
                            />
                            <p>{rating}</p>
                        </div>
                    </div>

                    <div className="book-copies">
                        <p>
                            Total Books: <span>{total_copies}</span>
                        </p>
                        <p>
                            Available: <span>{available_copies}</span>
                        </p>
                    </div>

                    <p className="book-description">{description}</p>

                    <Button className="book-overview_btn">
                        <Image
                            src="/icons/book.svg"
                            alt="book"
                            width={20}
                            height={20}
                        />
                        <p className="mt-1 font-bebas-neue text-xl text-dark-100">
                            Borrow
                        </p>
                    </Button>
                </div>

                <div className="relative flex flex-1 justify-center">
                    <div className="relative mt-1">
                        <BookCover
                            coverColor={coverColor}
                            variant="wide"
                            className="z-10"
                            coverURL={coverURL}
                        />

                        <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
                            <BookCover
                                variant="wide"
                                coverColor={coverColor}
                                coverURL={coverURL}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BookOverView;
