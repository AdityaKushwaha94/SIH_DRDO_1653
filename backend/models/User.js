const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    default: 'Indian'
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  education: {
    highestDegree: {
      type: String,
      required: [true, 'Highest degree is required']
    },
    institution: {
      type: String,
      required: [true, 'Institution is required']
    },
    percentage: {
      type: Number,
      required: [true, 'Percentage/CGPA is required'],
      min: [0, 'Percentage cannot be negative'],
      max: [100, 'Percentage cannot exceed 100']
    },
    yearOfPassing: {
      type: Number,
      required: [true, 'Year of passing is required']
    }
  },
  experience: {
    currentJob: String,
    totalExperience: {
      type: Number,
      default: 0,
      min: [0, 'Experience cannot be negative']
    },
    skills: [String]
  },
  applicationStatus: {
    type: String,
    enum: ['applied', 'under_review', 'interview_scheduled', 'interviewed', 'selected', 'rejected'],
    default: 'applied'
  },
  role: {
    type: String,
    enum: ['candidate', 'interviewer', 'admin'],
    default: 'candidate'
  },
  appliedPosition: {
    type: String,
    required: [true, 'Applied position is required']
  },
  documents: {
    resume: String,
    photo: String,
    idProof: String
  },
  interviewScore: {
    type: Number,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Hide sensitive information when converting to JSON
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);