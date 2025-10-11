import BookList from '@/components/BookList';
import BookOverView from '@/components/BookOverView';
import { sampleBooks } from '@/constants';
import { db } from '@/database/drizzle';
import { user } from '@/database/schema';

async function Home() {
    // const userData = await db.select().from(user);
    // console.log(JSON.stringify(userData, null, 2));
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
