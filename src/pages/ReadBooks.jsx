import React from 'react'
import { useBooks } from '../providers/contextProvider';
import { useNavigate } from 'react-router-dom';
import BookInList from '../components/BookInList';
import '../css/books.css';
import Loading from '../components/Loading';

const ReadBooks = () => {
    const { readBooks, loading } = useBooks();
    const navigate = useNavigate();

    const handleBookClick = (id) => {
        navigate(`/books/${id}`);
    };

    return (
        <main className="main-content">
            <h2 className='page-title'>Har läst</h2>
            {loading ? <Loading /> : null}
            {readBooks.length === 0 ? (
                <p>Din lista är tom.</p>
            ) : (
                <ul className="book-list">
                    {readBooks.map(book => (
                        <div key={book.id}>
                            <BookInList
                                book={book}
                                onClick={() => handleBookClick(book.id)}
                            />

                            {/* Recension */}
                            <div className="review-display">
                                {book.reviews && book.reviews.length > 0 ? (
                                    book.reviews.map((rev) => (
                                        <p key={rev.id} className="review-preview">
                                            <strong>{rev.reviewer}:</strong> {rev.text}
                                        </p>
                                    ))
                                ) : (
                                    <p>Ingen recension skriven än.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </ul>
            )}
        </main>
    );
};

export default ReadBooks