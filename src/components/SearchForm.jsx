import React from 'react'
import { useBooks } from '../providers/contextProvider';
import { useNavigate } from 'react-router-dom';
import '../css/searchform.css';


const SearchForm = () => {
    const { searchBooks } = useBooks();
    const [searchQuery, setSearchQuery] = React.useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();

        if (trimmedQuery) {
            navigate(`/books?q=${encodeURIComponent(trimmedQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Sök efter böcker..."
            />
            <button className="searchBtn" type="submit">Sök</button>
        </form>
    );
};

export default SearchForm