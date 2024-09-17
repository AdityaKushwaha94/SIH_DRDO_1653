import React from 'react';
import '../styles/CareerPage.css';

const CareerPage = () => {
  return (
    <div className="career-page">
      <h1>Career Opportunities</h1>
      {/* Add your job listings and application logic here */}
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
            <td><button>Apply</button></td>
          </tr>
          <tr>
            <td>Data Scientist</td>
            <td>Bangalore</td>
            <td>Data Science</td>
            <td><button>Apply</button></td>
          </tr>
          {/* Add more job rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default CareerPage;
