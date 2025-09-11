import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CareerPage from './pages/CareerPage';
import ApplicationForm from './pages/ApplicationForm';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/application-form" element={<ApplicationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/interviewer-dashboard" element={<Dashboard />} />
          {/* Add more routes for other pages as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
