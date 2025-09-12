import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchUserData(token);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      // Fetch user profile
      const profileResponse = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUser(profileData.user);
      }

      // Fetch user's interviews
      const interviewsResponse = await fetch('http://localhost:5000/api/interviews', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (interviewsResponse.ok) {
        const interviewsData = await interviewsResponse.json();
        setInterviews(interviewsData.interviews || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error loading dashboard data. Please make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard">
        <div className="error">Error loading user data</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">DRDO</div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/careers">Careers</Link></li>
          <li><span className="user-name">Welcome, {user.fullName}</span></li>
        </ul>
        <div className="navbar-actions">
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome to your DRDO portal, {user.fullName}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* User Info Card */}
        <div className="dashboard-card">
          <h2>Your Profile</h2>
          <div className="profile-info">
            <div className="info-item">
              <strong>Name:</strong> {user.fullName}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="info-item">
              <strong>Role:</strong> {user.role}
            </div>
            <div className="info-item">
              <strong>Application Status:</strong> 
              <span className={`status ${user.applicationStatus}`}>
                {user.applicationStatus?.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            {user.appliedPosition && (
              <div className="info-item">
                <strong>Applied Position:</strong> {user.appliedPosition}
              </div>
            )}
          </div>
          <div className="profile-actions">
            <Link to="/profile" className="button secondary">Edit Profile</Link>
          </div>
        </div>

        {/* Interviews Section */}
        <div className="dashboard-card">
          <h2>Your Interviews</h2>
          {interviews.length > 0 ? (
            <div className="interviews-list">
              {interviews.map((interview, index) => (
                <div key={interview._id || index} className="interview-item">
                  <div className="interview-info">
                    <h3>{interview.position}</h3>
                    <p><strong>Date:</strong> {new Date(interview.scheduledAt).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {new Date(interview.scheduledAt).toLocaleTimeString()}</p>
                    <p><strong>Mode:</strong> {interview.mode}</p>
                    <p><strong>Status:</strong> 
                      <span className={`status ${interview.status}`}>
                        {interview.status?.replace('_', ' ').toUpperCase()}
                      </span>
                    </p>
                  </div>
                  {interview.status === 'scheduled' && (
                    <div className="interview-actions">
                      <Link to={`/interview/${interview._id}`} className="button primary">
                        Join Interview
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-interviews">
              <p>No interviews scheduled yet.</p>
              {user.applicationStatus === 'applied' && (
                <p>Your application is under review. You will be notified when an interview is scheduled.</p>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            {user.role === 'candidate' && (
              <>
                <Link to="/application-form" className="action-card">
                  <h3>Update Application</h3>
                  <p>Update your application details and documents</p>
                </Link>
                <Link to="/interview-preparation" className="action-card">
                  <h3>Interview Preparation</h3>
                  <p>Practice with mock interviews and tips</p>
                </Link>
              </>
            )}
            {user.role === 'interviewer' && (
              <>
                <Link to="/schedule-interview" className="action-card">
                  <h3>Schedule Interview</h3>
                  <p>Schedule new interviews for candidates</p>
                </Link>
                <Link to="/candidates" className="action-card">
                  <h3>View Candidates</h3>
                  <p>Review candidate applications and profiles</p>
                </Link>
              </>
            )}
            {user.role === 'admin' && (
              <>
                <Link to="/admin-panel" className="action-card">
                  <h3>Admin Panel</h3>
                  <p>Manage users, interviews, and system settings</p>
                </Link>
                <Link to="/analytics" className="action-card">
                  <h3>Analytics</h3>
                  <p>View recruitment analytics and reports</p>
                </Link>
              </>
            )}
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

export default Dashboard;