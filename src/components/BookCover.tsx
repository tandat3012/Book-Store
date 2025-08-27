import { cn } from '@/lib/utils';
import Image from 'next/image';
import BookCoverSvg from './BookCoverSvg';

type BookCoverVariant = 'extraSmall' | 'small' | 'wide' | 'medium' | 'regular';

const variantStyles: Record<BookCoverVariant, string> = {
    extraSmall: 'book-cover_extra-small',
    small: 'book-cover_small',
    wide: 'book-cover_wide',
    medium: 'book-cover_medium',
    regular: 'book-cover_regular',
};
interface Props {
    className?: string;
    variant?: BookCoverVariant;
    coverColor: string;
    coverURL: string;
}
function BookCover({
    className = '',
    variant = 'regular',
    coverColor = '#012B48',
    coverURL = 'https://placehold.co/400x600.png',
}: Props) {
    return (
        <div
            className={cn(
                'relative transition-all duration-300',
                variantStyles[variant],
                className,
            )}
        >
            <BookCoverSvg coverColor={coverColor} />
            <div
                className="absolute z-10"
                style={{ left: '12%', width: '87.5%', height: '88%' }}
            >
                <Image
                    src={coverURL}
                    alt="Book Cover"
                    fill
                    className="rounded-sm object-fill"
                />
            </div>
        </div>
    );
}

export default BookCover;
