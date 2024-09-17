import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CareerPage from './pages/CareerPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/careers" element={<CareerPage />} />
          {/* Add more routes for other pages as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
