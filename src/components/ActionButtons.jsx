import React from 'react';
import { useBooks } from '../providers/contextProvider';
import '../css/books.css';
import { useNavigate } from 'react-router-dom';


const ActionButtons = ({ book, onAddReview }) => {
  const {
    savedBooks,
    readBooks,
    addToWatchlist,
    removeFromWatchlist,
    addToRead,
    removeFromRead,
    setReviewingBook
  } = useBooks();
  const navigate = useNavigate();

  if (!book) return null;

  const isSaved = savedBooks.some(b => b.id === book.id);
  const isRead = readBooks.some(b => b.id === book.id);

  const handleReadClick = (e) => {
    e.stopPropagation();
    if (isRead) {
      removeFromRead(book.id);
    } else {
      setReviewingBook(book);
      addToRead(book);
      removeFromWatchlist(book.id);
    }
  };

  return (
    <div className="book-actions">
      <div className="action-top-row">
        <button
          className="save-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (isSaved) {
              removeFromWatchlist(book.id);
            } else {
              addToWatchlist(book);
              removeFromRead(book.id);
            }
          }}
        >
          {isSaved ? 'Vill inte läsa' : 'Vill läsa'}
        </button>

        <button
          className="read-btn"
          onClick={handleReadClick}
        >
          {isRead ? 'Har inte läst' : 'Har läst'}
        </button>
      </div>

      {isRead && (
        <button
          className="review-btn"
          onClick={() => {
            if (onAddReview) {
              // Om vi är på detaljsidan finns onAddReview -> Öppna modalen
              onAddReview();
            } else {
              // Om vi är i en lista (BookInList) -> Gå till detaljsidan
              navigate(`/books/${book.id}`);
            }
          }}
        >
          {onAddReview ? 'Skriv recension' : 'Läs/skriv recensioner'}
        </button>
      )}
    </div>
  );
};

export default ActionButtons;