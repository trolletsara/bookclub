import React from 'react'
import { useBooks } from '../providers/contextProvider';
import { useNavigate } from 'react-router-dom';
import BookInList from '../components/BookInList';
import Loading from '../components/Loading';
import '../css/books.css';

const SavedBooks = () => {
    const { savedBooks, loading } = useBooks();
    const navigate = useNavigate();

    const handleBookClick = (id) => {
        navigate(`/books/${id}`);
    };

    return (
        <main className="main-content">
            <h2 className='page-title'>Vill läsa</h2>
            {loading ? <Loading /> : null}
            {savedBooks.length === 0 ? (
                <p>Din lista är tom.</p>
            ) : (
                <ul className="book-list">
                    {savedBooks.map(book => (
                        <BookInList key={book.id} book={book} onClick={() => handleBookClick(book.id)} />
                    ))}
                </ul>
            )}
        </main>
    );
};

export default SavedBooks