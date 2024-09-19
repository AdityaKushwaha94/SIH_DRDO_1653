import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; 

const HomePage = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div className="homepage-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">DRDO</div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/drdo">DRDO</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/careers">Careers</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
        <div className="navbar-profile">
          <button onClick={toggleDropdown} className="dropdown-button">
            Profile
            <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/login" className="dropdown-item">Login</Link>
              <Link to="/signup" className="dropdown-item">Signup</Link>
              <Link to="/guest" className="dropdown-item">View as Guest</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <h1>Welcome to DRDO</h1>
        <p>Innovation and Technology for National Security</p>
        <button className="cta-button">Explore Our Work</button>
      </header>

      {/* News Section */}
      <section className="news-section">
        <h2>Latest News</h2>
        <div className="news-cards">
          <div className="news-card">
            <h3>New Defense Technology</h3>
            <p>DRDO unveils cutting-edge technology...</p>
          </div>
          <div className="news-card">
            <h3>Research Breakthrough</h3>
            <p>New advancements in missile systems...</p>
          </div>
        </div>
      </section>

      {/* Ambition Section */}
      <section className="ambition-section">
        <h2>Our Ambition</h2>
        <p>DRDO is committed to research, development, and delivering innovative defense solutions for national security.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Follow Us on Social Media</p>
          <div className="social-icons">
            <a href="https://facebook.com">Facebook</a>
            <a href="https://twitter.com">X</a>
            <a href="https://linkedin.com">LinkedIn</a>
          </div>
          <p className="made-by">Made by Sentinels</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
