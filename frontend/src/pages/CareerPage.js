import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CareerPage.css';

const CareerPage = () => {
  return (
    <div className="career-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">DRDO</div>
        <ul className="navbar-links">
          <li><Link to="/" style={{backgroundImage: 'url(/icons/home.svg)'}}>Home</Link></li>
          <li><Link to="/drdo" style={{backgroundImage: 'url(/icons/drdo.svg)'}}>DRDO</Link></li>
          <li><Link to="/projects" style={{backgroundImage: 'url(/icons/projects.svg)'}}>Projects</Link></li>
          <li><Link to="/careers" style={{backgroundImage: 'url(/icons/careers.svg)'}}>Careers</Link></li>
          <li><Link to="/contact" style={{backgroundImage: 'url(/icons/contact.svg)'}}>Contact</Link></li>
        </ul>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </nav>

      {/* Main Content */}
      <h1>Career Opportunities</h1>
      <table className="job-listings">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Location</th>
            <th>Department</th>
            <th>Apply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Software Engineer</td>
            <td>Delhi</td>
            <td>Engineering</td>
            <td><Link to="/apply"><button>Apply</button></Link></td>
          </tr>
          <tr>
            <td>Data Scientist</td>
            <td>Bangalore</td>
            <td>Data Science</td>
            <td><Link to="/apply"><button>Apply</button></Link></td>
          </tr>
          {/* Add more job rows as needed */}
        </tbody>
      </table>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>Follow Us on Social Media</p>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook">FB</a>
            <a href="https://twitter.com" aria-label="Twitter">TW</a>
            <a href="https://linkedin.com" aria-label="LinkedIn">LI</a>
          </div>
          <p className="made-by">Made by Sentinels</p>
        </div>
      </footer>
    </div>
  );
};

export default CareerPage;
