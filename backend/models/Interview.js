const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Candidate ID is required']
  },
  interviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Interviewer ID is required']
  },
  position: {
    type: String,
    required: [true, 'Position is required']
  },
  scheduledAt: {
    type: Date,
    required: [true, 'Interview date and time is required']
  },
  duration: {
    type: Number, // Duration in minutes
    default: 60,
    min: [15, 'Interview duration must be at least 15 minutes'],
    max: [180, 'Interview duration cannot exceed 180 minutes']
  },
  mode: {
    type: String,
    enum: ['online', 'offline'],
    default: 'online'
  },
  meetingLink: {
    type: String,
    required: function() {
      return this.mode === 'online';
    }
  },
  venue: {
    type: String,
    required: function() {
      return this.mode === 'offline';
    }
  },
  status: {
    type: String,
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled', 'no_show'],
    default: 'scheduled'
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['technical', 'behavioral', 'situational', 'general'],
      default: 'general'
    },
    expectedAnswer: String,
    points: {
      type: Number,
      min: 1,
      max: 10,
      default: 5
    }
  }],
  responses: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      min: 0,
      max: 10
    },
    feedback: String,
    timeTaken: Number // Time in seconds
  }],
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  technicalScore: {
    type: Number,
    min: 0,
    max: 100
  },
  behavioralScore: {
    type: Number,
    min: 0,
    max: 100
  },
  communicationScore: {
    type: Number,
    min: 0,
    max: 100
  },
  interviewerFeedback: {
    strengths: [String],
    weaknesses: [String],
    overallComment: String,
    recommendation: {
      type: String,
      enum: ['strongly_recommend', 'recommend', 'neutral', 'not_recommend', 'strongly_not_recommend']
    }
  },
  aiAnalysis: {
    sentimentScore: Number,
    confidenceLevel: Number,
    speechClarity: Number,
    responseRelevance: Number,
    overallAiScore: Number
  },
  recording: {
    audioUrl: String,
    videoUrl: String,
    transcript: String
  },
  startedAt: Date,
  completedAt: Date,
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
interviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate overall score based on individual scores
interviewSchema.methods.calculateOverallScore = function() {
  const scores = [this.technicalScore, this.behavioralScore, this.communicationScore].filter(score => score !== undefined);
  if (scores.length > 0) {
    this.overallScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }
  return this.overallScore;
};

// Virtual for interview duration in hours
interviewSchema.virtual('durationInHours').get(function() {
  return this.duration / 60;
});

// Populate candidate and interviewer information
interviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'candidate',
    select: 'fullName email phone appliedPosition'
  }).populate({
    path: 'interviewer',
    select: 'fullName email'
  });
  next();
});

module.exports = mongoose.model('Interview', interviewSchema);