import React from 'react'
import { useBooks } from '../providers/contextProvider';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookInList from '../components/BookInList';
import SearchForm from '../components/SearchForm';
import '../css/books.css';

const Books = () => {
  const { books, loading, searchBooks, totalItems, currentPage, currentQuery, error } = useBooks();
  const navigate = useNavigate();
  const location = useLocation();
  const queryInUrl = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryFromUrl = params.get('q') || 'subject:fiction';

    console.log("URL Query:", queryFromUrl, "Current State Query:", currentQuery);

    if (queryFromUrl !== currentQuery) {
      searchBooks(queryFromUrl, 0);
    }

  }, [location.search, searchBooks]);

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

  const handlePageChange = (newPage) => {
    searchBooks(currentQuery, newPage);
    window.scrollTo(0, 0); // Scrolla upp när man byter sida
  };


  return (
    <div>

      <SearchForm />

      {loading ? <Loading /> : null}
      {error && <div className="error-message">{error}</div>}

      <h2 className='page-title'>
        {queryInUrl
          ? `Sökresultat för "${queryInUrl}"`
          : "Populära böcker just nu"}
      </h2>

      {books.length > 0 && (
        <main className='main-content'>
          <ul className="book-list">
            {books.map((book) => (
              <BookInList
                key={book.id}
                book={book}
                onClick={() => handleBookClick(book.id)}
              />
            ))}
          </ul>
          <div className="pagination">
            <button
              disabled={currentPage === 0 || loading}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Föregående
            </button>

            <span>Sida {currentPage + 1} av {Math.ceil(totalItems / 20)}</span>

            <button
              disabled={(currentPage + 1) * 20 >= totalItems || loading}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Nästa
            </button>
          </div>
        </main>
      )}

      {!loading && books.length === 0 && (
        <p>Inga böcker att visa. Gör en sökning!</p>
      )}
    </div>
  )
}

export default Books