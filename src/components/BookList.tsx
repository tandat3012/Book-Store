import BookCard from './BookCard';

interface Props {
    title: string;
    booksData: BookType[];
    containerClassname?: string;
}

function BookList({ title, booksData, containerClassname }: Props) {
    return (
        <>
            <section className={containerClassname}>
                <h2 className="font-bebas-neue text-4xl text-light-100">
                    {title}
                </h2>
                <ul className="book-list">
                    {booksData.map((book) => (
                        <BookCard key={book.id} {...book} />
                    ))}
                </ul>
            </section>
        </>
    );
}

export default BookList;
