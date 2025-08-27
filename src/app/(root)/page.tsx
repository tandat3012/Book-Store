import BookList from '@/components/BookList';
import BookOverView from '@/components/BookOverView';
import { sampleBooks } from '@/constants';

function Home() {
    return (
        <div>
            <BookOverView {...sampleBooks[0]} />
            <BookList
                title="Latest Books"
                booksData={sampleBooks}
                containerClassname="mt-28"
            />
        </div>
    );
}

export default Home;
