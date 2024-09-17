import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CareerPage from './pages/CareerPage';
import ApplicationForm from './pages/ApplicationForm';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/apply" element={<ApplicationForm />} /> {/* Added route */}
          <Route path="/application-form" element={<ApplicationForm />} />
          {/* Add more routes for other pages as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
