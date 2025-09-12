import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on user role
        if (data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (data.user.role === 'interviewer') {
          navigate('/interviewer-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Network error. Please make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">DRDO</div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/careers">Careers</Link></li>
        </ul>
      </nav>

      <div className="login-container">
        <div className="login-form-wrapper">
          <h2>{isRegister ? 'Register for DRDO' : 'Login to DRDO Portal'}</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                minLength="6"
              />
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
            </button>
          </form>

          <div className="auth-switch">
            <p>
              {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
              <button 
                type="button"
                className="link-button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError('');
                  setFormData({ email: '', password: '' });
                }}
              >
                {isRegister ? 'Login here' : 'Register here'}
              </button>
            </p>
          </div>

          <div className="auth-note">
            <p><strong>Note:</strong> For full registration with education and experience details, please use the <Link to="/application-form">Application Form</Link>.</p>
          </div>

          <div className="demo-credentials">
            <h4>Demo Credentials:</h4>
            <p><strong>Candidate:</strong> candidate@drdo.gov.in / password123</p>
            <p><strong>Interviewer:</strong> interviewer@drdo.gov.in / password123</p>
            <p><strong>Admin:</strong> admin@drdo.gov.in / password123</p>
          </div>
        </div>
      </div>

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

export default LoginPage;