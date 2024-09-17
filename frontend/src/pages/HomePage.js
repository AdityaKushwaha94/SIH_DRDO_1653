import React from "react";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <img src="logo.png" alt="Logo" className="logo" />
          <nav className="nav-links">
            <a href="/">Home</a>
            <a href="drdo">Drdo </a>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/carrers">carrers</a>
            <a href="/contact us ">Contact</a>
          </nav>
          <form className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="main-content">
        <section className="hero">
          <h1>Welcome to the DRDO Project</h1>
          <p>This is the sample homepage for the DRDO project.</p>
        </section>

        {/* News Section */}
        <section className="news">
          <h2>Latest News</h2>
          <div className="news-item">
            <h3>New Technology Unveiled</h3>
            <p>DRDO has introduced a new cutting-edge technology designed to enhance national security.</p>
          </div>
          <div className="news-item">
            <h3>Successful Test Flight</h3>
            <p>Our latest missile test has been successfully completed, marking a significant milestone in defense technology.</p>
          </div>
        </section>

        {/* Ambition Section */}
        <section className="ambition">
          <h2>Our Ambition</h2>
          <p>Our goal is to push the boundaries of technology and innovation to ensure national safety and advancement. We are committed to excellence in every project we undertake, aiming to set new standards in defense technology.</p>
        </section>

        {/* Motivational Projects Section */}
        <section className="projects">
          <h2>Motivational Projects</h2>
          <div className="project-item">
            <h3>Project A</h3>
            <p>A groundbreaking initiative aimed at improving our defense systems through innovative technology and research.</p>
          </div>
          <div className="project-item">
            <h3>Project B</h3>
            <p>An ambitious project focused on developing next-generation tools and systems to enhance national security.</p>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 DRDO. All rights reserved.</p>
        <nav>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </footer>
    </div>
  );
};

export default HomePage;
