import { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { getAllBooks, getBookById } from '../api/booksApi';

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentQuery, setCurrentQuery] = useState("");
    const [reviewingBook, setReviewingBook] = useState(null);

    // LOCALSTORGAGE
    const [savedBooks, setSavedBooks] = useState(() => {
        const localData = localStorage.getItem('savedBooks');
        return localData ? JSON.parse(localData) : [];
    });
    const [readBooks, setReadBooks] = useState(() => {
        const localData = localStorage.getItem('readBooks');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    }, [savedBooks]);
    useEffect(() => {
        localStorage.setItem('readBooks', JSON.stringify(readBooks));
    }, [readBooks]);

    const isSearching = useRef(false);


    //  --- SÖKNINGSLOGIK ---
    const searchBooks = useCallback(async (query, page = 0) => {
        if (isSearching.current && query === currentQuery) return;

        isSearching.current = true;
        setLoading(true);
        setError(null);

        try {
            const startIndex = page * 20;
            const searchQuery = query || 'subject:fiction';
            const data = await getAllBooks(searchQuery, startIndex);
            setBooks(data.items || []);
            setTotalItems(data.totalItems || 0);
            setCurrentPage(page);
            setCurrentQuery(searchQuery);
        } catch (err) {
            console.error("Sökfel:", err);
            setError("Kunde inte hämta böcker. Försök igen om en stund.");
        } finally {
            setLoading(false);
            isSearching.current = false;
        }
    }, [currentQuery]);

    // --- API-LOGIK ---
    const getBookByContextId = async (id) => {
        try {
            const book = await getBookById(id);
            return book;
        } catch (err) {
            setError("Kunde inte hitta boken: " + err.message);
            return null;
        }
    };

    // --- LOGIK FÖR "VILL LÄSA" ---
    const addToWatchlist = (book) => {
        setSavedBooks((prev) => {
            if (prev.find(b => b.id === book.id)) return prev;
            return [...prev, book];
        });
    };

    const removeFromWatchlist = (id) => {
        setSavedBooks((prev) => prev.filter(book => book.id !== id));
    };

    // --- LOGIK FÖR "LÄST" ---
    const addToRead = (book) => {
        setReadBooks((prev) => {
            if (prev.find(b => b.id === book.id)) return prev;
            return [...prev, book];
        });
    };

    const removeFromRead = (id) => {
        setReadBooks((prev) => prev.filter(book => book.id !== id));
    };

    // LÄGGA TILL RECENSION
    const addBookReview = (id, newReview) => {
        setReadBooks((prev) =>
            prev.map((book) => {
                if (book.id === id) {
                    const currentReviews = Array.isArray(book.reviews) ? book.reviews : [];
                    const reviewWithId = { ...newReview, id: Date.now() };
                    return { ...book, reviews: [...currentReviews, reviewWithId] };
                }
                return book;
            })
        );
    };

    // RADERA EN SPECIFIK RECENSION
    const deleteReview = (bookId, reviewId) => {
        setReadBooks((prev) =>
            prev.map((book) => {
                if (book.id === bookId) {
                    return {
                        ...book,
                        reviews: book.reviews.filter((r) => r.id !== reviewId),
                    };
                }
                return book;
            })
        );
    };

    // UPPDATERA EN SPECIFIK RECENSION
    const updateReview = (bookId, reviewId, updatedData) => {
        setReadBooks((prev) =>
            prev.map((book) => {
                if (book.id === bookId) {
                    return {
                        ...book,
                        reviews: book.reviews.map((r) =>
                            r.id === reviewId ? { ...r, ...updatedData } : r
                        ),
                    };
                }
                return book;
            })
        );
    };




    return (
        <BooksContext.Provider value={{
            books,
            loading,
            searchBooks,
            getBookByContextId,
            error,
            savedBooks,
            readBooks,
            addToWatchlist,
            removeFromWatchlist,
            addToRead,
            removeFromRead,
            totalItems,
            currentPage,
            currentQuery,
            reviewingBook,
            setReviewingBook,
            addBookReview,
            deleteReview,
            updateReview
        }}>
            {children}
        </BooksContext.Provider>
    );
};

export const useBooks = () => {
    return useContext(BooksContext);
};