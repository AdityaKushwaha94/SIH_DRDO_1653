#!/bin/bash

echo "🚀 Setting up DRDO SIH 1653 Project"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Install AI tools dependencies (optional)
echo "🧠 Installing AI tools dependencies..."
cd ../ai-tools
if command -v pip3 &> /dev/null; then
    pip3 install -r requirements.txt
    if [ $? -eq 0 ]; then
        echo "✅ AI tools dependencies installed"
    else
        echo "⚠️  AI tools dependencies installation failed (optional)"
    fi
else
    echo "⚠️  pip3 not found, skipping AI tools setup (optional)"
fi

cd ..

# Create environment file template
echo "📝 Creating environment template..."
if [ ! -f backend/.env ]; then
    cat > backend/.env << EOL
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/drdo_recruitment

# JWT Configuration
JWT_SECRET=drdo_secret_key_change_in_production
JWT_EXPIRE=30d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
EOL
    echo "✅ Environment file created at backend/.env"
else
    echo "✅ Environment file already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "🚀 To start the application:"
echo "1. Start MongoDB (if using local instance)"
echo "2. Start backend:  cd backend && npm start"
echo "3. Start frontend: cd frontend && npm start"
echo ""
echo "🌐 Application URLs:"
echo "• Frontend: http://localhost:3000"
echo "• Backend API: http://localhost:5000"
echo ""
echo "👤 Demo Credentials:"
echo "• Candidate: candidate@drdo.gov.in / password123"
echo "• Interviewer: interviewer@drdo.gov.in / password123"
echo "• Admin: admin@drdo.gov.in / password123"
echo ""
echo "Happy coding! 🇮🇳"