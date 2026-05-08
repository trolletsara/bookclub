import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>
            <Link to="/" onClick={() => setIsOpen(false)}>Bokklubben</Link>
          </h1>
          <p className="tagline">Läser och lever!</p>
        </div>

        {/* Hamburgarknapp - placerad sist i containern */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Meny">
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </button>

        {/* Menyn som glider in från höger */}
        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Hem</Link></li>
            <li><Link to="/books" onClick={() => setIsOpen(false)}>Sök böcker</Link></li>
            <li><Link to="/saved" onClick={() => setIsOpen(false)}>Böcker att läsa</Link></li>
            <li><Link to="/read" onClick={() => setIsOpen(false)}>Böcker som lästs</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;