import React, { useState, useEffect } from 'react'
import { useBooks } from '../providers/contextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import ActionButtons from '../components/ActionButtons';
import '../css/bookdetails.css';
import ReviewModal from '../components/ReviewModal';
import Loading from '../components/Loading';

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookByContextId, readBooks, deleteReview, updateReview, loading } = useBooks();
  const [currentBook, setCurrentBook] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const openBookDetails = async () => {
      const fetchedBook = await getBookByContextId(id);
      setCurrentBook(fetchedBook);
    };

    if (id) {
      openBookDetails();
    }
  }, [id, getBookByContextId]);

  const getCleanImage = (book) => {
    const rawImageUrl = book?.volumeInfo?.imageLinks?.thumbnail;
    return rawImageUrl ? rawImageUrl.replace('&edge=curl', '') : 'placeholder-bild.png';
  };

  const currentReadBook = currentBook ? readBooks.find(b => b.id === currentBook.id) : null;

  const handleAddReview = () => {
    setEditingReview(null);
    setIsModalOpen(true);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  return (
    <div className="book-details-container">
      <button className='back-btn' onClick={() => navigate(-1)}>&lt; Tillbaka</button>

      {loading && <Loading />}

      {currentBook ? (
        <div className="bd-layout">
          <div className="bd-info">
            <h1>{currentBook.volumeInfo.title}</h1>
            <p className="bd-author">{currentBook.volumeInfo.authors?.join(', ')}</p>
            <p className="bd-meta">{currentBook.volumeInfo.publishedDate}</p>

            <div className="bd-description">
              <p dangerouslySetInnerHTML={{ __html: currentBook.volumeInfo.description }} />
            </div>

            <div className="bd-extra-info">
              <p><strong>Antal sidor:</strong> {currentBook.volumeInfo.pageCount}</p>
              <p><strong>Kategorier:</strong> {currentBook.volumeInfo.categories?.join(', ')}</p>
            </div>
          </div>

          <div className="bd-image-wrapper">
            <img
              className='bd-img'
              src={getCleanImage(currentBook)}
              alt={currentBook.volumeInfo.title}
            />
          </div>

          <div className="bd-footer">
            {currentReadBook?.reviews?.length > 0 && (
              <div className="reviews-display">
                <h4>Läsarrecensioner ({currentReadBook.reviews.length})</h4>
                {currentReadBook.reviews.map((rev) => (
                  <div key={rev.id} className="review-card">
                    <div className='review-info'>
                    <div className="review-header">
                      <strong>{rev.reviewer} </strong>
                      <span className="review-rating">⭐ {rev.rating}/5</span>
                    </div>
                    <p>"{rev.text}"</p>
                    </div>
                    <div className="review-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditReview(rev)}
                      >
                        Ändra
                      </button>
                      <button
                        className="delete-review-btn"
                        onClick={() => {
                          if (window.confirm("Vill du verkligen radera recensionen?")) {
                            deleteReview(currentBook.id, rev.id);
                          }
                        }}
                      >
                        Radera
                      </button>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            )}
          <ActionButtons book={currentBook} onAddReview={handleAddReview} />          </div>
        </div>
      ) : (
        <p>Laddar bokdetaljer...</p>
      )}
      <ReviewModal 
        book={currentBook} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingReview={editingReview} 
      />
    </div>
  );

};

export default BookDetails;