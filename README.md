# DRDO SIH 1653 - Recruitment & Interview System

## Overview
A comprehensive recruitment and interview management system built for DRDO (Defense Research and Development Organization) as part of Smart India Hackathon problem statement 1653. The system features AI-powered interview analysis, role-based authentication, and a complete candidate management workflow.

## 🚀 Features

### Frontend (React)
- **Professional UI/UX**: Modern, responsive design with gradient themes
- **Authentication System**: JWT-based login with role-based access control
- **User Dashboard**: Personalized dashboards for candidates, interviewers, and admins
- **Application Forms**: Comprehensive multi-step application forms
- **Career Portal**: Job listings and application management

### Backend (Node.js/Express)
- **REST API**: Complete RESTful API with proper authentication
- **User Management**: Registration, login, profile management
- **Interview System**: Schedule, manage, and conduct interviews
- **Feedback System**: Multi-source feedback collection (interviewer, candidate, AI)
- **Role-based Access**: Different permissions for candidates, interviewers, admins
- **MongoDB Integration**: Robust data models with validation

### AI Tools (Python)
- **Sentiment Analysis**: Real-time analysis of candidate responses
- **Confidence Detection**: Analyzes confidence levels from speech patterns
- **Technical Assessment**: Evaluates technical content relevance
- **Quality Scoring**: Comprehensive response quality metrics
- **ML-powered Insights**: Overall candidate assessment with recommendations

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router, CSS3
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT tokens, bcrypt password hashing
- **AI/ML**: Python, NLTK, TextBlob, scikit-learn, transformers
- **Development**: npm, nodemon, eslint

## 📋 Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- MongoDB (local or cloud instance)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AdityaKushwaha94/SIH_DRDO_1653.git
cd SIH_DRDO_1653
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm start  # or npm run dev for development
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. AI Tools Setup
```bash
cd ai-tools
pip install -r requirements.txt
python sentiment_analysis.py  # Test the AI module
```

## 🌐 Usage

### Demo Credentials
The system comes with pre-configured demo accounts:

- **Candidate**: candidate@drdo.gov.in / password123
- **Interviewer**: interviewer@drdo.gov.in / password123
- **Admin**: admin@drdo.gov.in / password123

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

#### Interviews
- `GET /api/interviews` - Get user's interviews
- `POST /api/interviews` - Schedule new interview (interviewer/admin)
- `GET /api/interviews/:id` - Get specific interview
- `PUT /api/interviews/:id` - Update interview

#### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback/interview/:id` - Get interview feedback
- `GET /api/feedback` - Get all feedback (admin only)

## 🔮 AI Features

### Sentiment Analysis
The AI module provides comprehensive analysis of interview responses:

- **Sentiment Scoring**: Positive, negative, neutral classification
- **Confidence Analysis**: Word choice patterns indicating confidence levels
- **Technical Content**: Evaluation of technical terminology usage
- **Response Quality**: Vocabulary diversity, structure, and depth analysis
- **Overall Assessment**: Combined scoring with hiring recommendations

### Example Usage
```python
from sentiment_analysis import analyze_interview_responses

responses = [
    {
        'question': 'Tell me about your Python experience.',
        'answer': 'I am confident in Python and have built several applications...'
    }
]

results = analyze_interview_responses(responses)
print(f"Overall Score: {results['summary']['average_score']}")
```

## 🎯 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Express Backend│    │   AI Analysis   │
│                 │    │                 │    │                 │
│ • User Interface│────│ • REST API      │────│ • Sentiment     │
│ • Authentication│    │ • JWT Auth      │    │ • Confidence    │
│ • Dashboards    │    │ • MongoDB       │    │ • Technical     │
│ • Forms         │    │ • Interview Mgmt│    │ • Quality Score │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📱 Screenshots

### Login System
![DRDO Login](https://github.com/user-attachments/assets/21582417-91cc-4552-b7b9-c084799ba0e8)

## 🚀 Deployment

### Environment Variables
Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/drdo_recruitment
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
PORT=5000
```

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of Smart India Hackathon 2024 and is intended for educational and competition purposes.

## 👥 Team Sentinels

Built with ❤️ for DRDO and national security innovation.

---

**Note**: This system is designed for recruitment and interview management with AI-powered candidate assessment. Ensure proper security measures are in place before deploying to production.