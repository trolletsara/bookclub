import React from 'react'
import { useBooks } from '../providers/contextProvider';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import BookInList from '../components/BookInList';
import { useNavigate } from 'react-router-dom';
import SavedBooks from './SavedBooks';
import ReadBooks from './ReadBooks';
import SearchForm from '../components/SearchForm';

const Home = () => {

    const { books, loading, getAllContextBooks } = useBooks();
    const navigate = useNavigate();

    const handleBookClick = (id) => {
        navigate(`/books/${id}`);
    }

  return (
    <main className="main-content">
        <SearchForm />
        
        {loading ? <Loading /> : null}
        <hr />

        <SavedBooks />

        <hr />

        <ReadBooks />
    </main>
  )
}

export default Home