import React, { useState } from 'react';
import '../styles/ApplicationForm.css'; // Ensure this path is correct

const ApplicationForm = () => {
  // State to manage the current section of the form
  const [currentSection, setCurrentSection] = useState('personalInfo');

  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    maritalStatus: '',
    address: '',
    contactDetails: '',
    highestDegree: '',
    otherDegrees: '',
    marks: '',
    currentJob: '',
    previousJobs: '',
    skills: '',
    certifications: '',
    examCenter: '',
    category: '',
    photographs: null,
    signature: null,
    idProof: '',
    declaration: '',
    references: '',
    previousApplications: '',
    specialNeeds: '',
    paymentProof: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle section navigation
  const goToSection = (section) => {
    setCurrentSection(section);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="application-form">
      <h1>Application Form</h1>
      <nav className="form-nav">
        <button onClick={() => goToSection('personalInfo')}>Personal Information</button>
        <button onClick={() => goToSection('education')}>Educational Qualifications</button>
        <button onClick={() => goToSection('employment')}>Employment History</button>
        <button onClick={() => goToSection('skills')}>Technical and Professional Skills</button>
        <button onClick={() => goToSection('examDetails')}>Examination Details</button>
        <button onClick={() => goToSection('documents')}>Other Required Documents</button>
        <button onClick={() => goToSection('declaration')}>Declaration and Signature</button>
        <button onClick={() => goToSection('additionalInfo')}>Additional Information</button>
        <button onClick={() => goToSection('payment')}>Payment Details</button>
      </nav>

      <form onSubmit={handleSubmit}>
        {currentSection === 'personalInfo' && (
          <div className="form-section">
            <h2>Personal Information</h2>
            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />

            <label>Date of Birth:</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />

            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label>Nationality:</label>
            <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />

            <label>Marital Status:</label>
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Other">Other</option>
            </select>

            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange} />

            <label>Contact Details:</label>
            <input type="text" name="contactDetails" value={formData.contactDetails} onChange={handleChange} />

            <button type="button" onClick={() => goToSection('education')}>Next</button>
          </div>
        )}

        {currentSection === 'education' && (
          <div className="form-section">
            <h2>Educational Qualifications</h2>
            <label>Highest Degree:</label>
            <input type="text" name="highestDegree" value={formData.highestDegree} onChange={handleChange} />

            <label>Other Degrees/Certifications:</label>
            <input type="text" name="otherDegrees" value={formData.otherDegrees} onChange={handleChange} />

            <label>Marks/Grades:</label>
            <input type="text" name="marks" value={formData.marks} onChange={handleChange} />

            <button type="button" onClick={() => goToSection('employment')}>Next</button>
          </div>
        )}

        {currentSection === 'employment' && (
          <div className="form-section">
            <h2>Employment History</h2>
            <label>Current/Most Recent Job:</label>
            <input type="text" name="currentJob" value={formData.currentJob} onChange={handleChange} />

            <label>Previous Jobs:</label>
            <input type="text" name="previousJobs" value={formData.previousJobs} onChange={handleChange} />

            <button type="button" onClick={() => goToSection('skills')}>Next</button>
          </div>
        )}

        {currentSection === 'skills' && (
          <div className="form-section">
            <h2>Technical and Professional Skills</h2>
            <label>Skills:</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} />

            <label>Certifications:</label>
            <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} />

            <button type="button" onClick={() => goToSection('examDetails')}>Next</button>
          </div>
        )}

        {currentSection === 'examDetails' && (
          <div className="form-section">
            <h2>Examination Details</h2>
            <label>Preferred Exam Center:</label>
            <input type="text" name="examCenter" value={formData.examCenter} onChange={handleChange} />

            <label>Category:</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select Category</option>
              <option value="General">General</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
            </select>

            <button type="button" onClick={() => goToSection('documents')}>Next</button>
          </div>
        )}

        {currentSection === 'documents' && (
          <div className="form-section">
            <h2>Other Required Documents</h2>
            <label>Photographs:</label>
            <input type="file" name="photographs" onChange={handleChange} />

            <label>Signature:</label>
            <input type="file" name="signature" onChange={handleChange} />

            <label>ID Proof:</label>
            <input type="text" name="idProof" value={formData.idProof} onChange={handleChange} />

            <button type="button" onClick={() => goToSection('declaration')}>Next</button>
          </div>
        )}

        {currentSection === 'declaration' && (
          <div className="form-section">
            <h2>Declaration and Signature</h2>
            <label>Declaration:</label>
            <textarea name="declaration" value={formData.declaration} onChange={handleChange} />

            <button type="button" onClick={() => goToSection('additionalInfo')}>Next</button>
          </div>
        )}

        {currentSection === 'additionalInfo' && (
          <div className="form-section">
            <h2>Additional Information</h2>
            <label>References:</label>
            <input type="text" name="references" value={formData.references} onChange={handleChange} />

            <label>Previous Applications:</label>
            <input type="text" name="previousApplications" value={formData.previousApplications} onChange={handleChange} />

            <label>Special Needs:</label>
            <input type="text" name="specialNeeds" value={formData.specialNeeds} onChange={handleChange} />

            <button type="button" onClick={() => goToSection('payment')}>Next</button>
          </div>
        )}

        {currentSection === 'payment' && (
          <div className="form-section">
            <h2>Payment Details</h2>
            <label>Fee Payment Proof:</label>
            <input type="file" name="paymentProof" onChange={handleChange} />

            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ApplicationForm;
