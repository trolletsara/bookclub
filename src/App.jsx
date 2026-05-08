import { useState } from 'react'
import './App.css'
import apiClient from './api/axiosConfig';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import SavedBooks from './pages/SavedBooks';
import ReadBooks from './pages/ReadBooks';
import Header from './components/Header';
import Footer from './components/Footer';
import { BooksProvider } from './providers/contextProvider';
import { useBooks } from './providers/contextProvider';
import ReviewModal from './components/ReviewModal';

function AppContent() {
  const { reviewingBook, setReviewingBook, updateBookReview } = useBooks();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/saved" element={<SavedBooks />} />
        <Route path="/read" element={<ReadBooks />} />
      </Routes>

      {/* Modalen ligger här för att vara tillgänglig på ALLA sidor */}
      <ReviewModal
        book={reviewingBook}
        isOpen={!!reviewingBook}
        onClose={() => setReviewingBook(null)}
        onSave={(id, text) => {
          updateBookReview(id, text);
          setReviewingBook(null);
        }}
      />
      <Footer />
    </BrowserRouter>
  );
}

function App() {
  return (
    <div className="app-wrapper">
      <BooksProvider>
        <AppContent />
      </BooksProvider>
    </div>
  );
}

export default App
