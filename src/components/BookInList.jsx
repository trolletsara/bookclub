import React from 'react'
import ActionButtons from './ActionButtons';


const BookInList = ({ book, onClick, children }) => {

  if (!book) return null;

  const rawImageUrl = book.volumeInfo?.imageLinks?.thumbnail;
  const cleanImageUrl = rawImageUrl ? rawImageUrl.replace('&edge=curl', '') : 'placeholder-bild.png';

  return (
    <li className="book-card">
      <div className="book-info" onClick={onClick}>
        {book.volumeInfo.imageLinks?.thumbnail && (
          <img src={cleanImageUrl} alt={book.volumeInfo.title} />
        )}
        <h3>{book.volumeInfo.title}</h3>
        {book.volumeInfo.authors && <p>av {book.volumeInfo.authors.join(', ')}</p>}
      </div>

      <ActionButtons book={book} />
    </li>
  )
}

export default BookInList