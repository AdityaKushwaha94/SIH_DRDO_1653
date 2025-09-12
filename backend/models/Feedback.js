const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: [true, 'Interview ID is required']
  },
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
  type: {
    type: String,
    enum: ['interviewer_feedback', 'candidate_feedback', 'ai_analysis'],
    required: [true, 'Feedback type is required']
  },
  // Interviewer feedback fields
  technicalSkills: {
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    comments: String
  },
  communicationSkills: {
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    comments: String
  },
  problemSolving: {
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    comments: String
  },
  teamwork: {
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    comments: String
  },
  leadership: {
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    comments: String
  },
  adaptability: {
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    comments: String
  },
  overallRating: {
    type: Number,
    min: 1,
    max: 10,
    required: function() {
      return this.type === 'interviewer_feedback';
    }
  },
  strengths: [String],
  areasOfImprovement: [String],
  specificFeedback: String,
  recommendation: {
    type: String,
    enum: ['highly_recommended', 'recommended', 'maybe', 'not_recommended', 'strongly_not_recommended'],
    required: function() {
      return this.type === 'interviewer_feedback';
    }
  },
  
  // Candidate feedback fields
  interviewExperience: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String
  },
  interviewerProfessionalism: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String
  },
  questionClarity: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String
  },
  processEfficiency: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String
  },
  candidateComments: String,
  wouldRecommendCompany: {
    type: Boolean,
    default: true
  },
  
  // AI Analysis fields
  sentimentAnalysis: {
    overallSentiment: {
      type: String,
      enum: ['very_positive', 'positive', 'neutral', 'negative', 'very_negative']
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1
    },
    emotionalStates: [{
      emotion: String,
      intensity: Number,
      timestamp: Number
    }]
  },
  speechAnalysis: {
    wordsPerMinute: Number,
    pauseFrequency: Number,
    fillerWords: Number,
    clarityScore: {
      type: Number,
      min: 0,
      max: 100
    },
    fluencyScore: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  responseAnalysis: {
    averageResponseTime: Number, // in seconds
    relevanceScore: {
      type: Number,
      min: 0,
      max: 100
    },
    depthScore: {
      type: Number,
      min: 0,
      max: 100
    },
    technicalAccuracy: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  behavioralAnalysis: {
    confidenceLevel: {
      type: Number,
      min: 0,
      max: 100
    },
    stressLevel: {
      type: Number,
      min: 0,
      max: 100
    },
    engagementLevel: {
      type: Number,
      min: 0,
      max: 100
    },
    authenticityScore: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  aiOverallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  aiRecommendation: {
    type: String,
    enum: ['strong_hire', 'hire', 'no_hire', 'strong_no_hire']
  },
  aiSummary: String,
  
  // Common fields
  additionalNotes: String,
  isPrivate: {
    type: Boolean,
    default: false
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
feedbackSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate overall rating for interviewer feedback
feedbackSchema.methods.calculateOverallRating = function() {
  if (this.type === 'interviewer_feedback') {
    const ratings = [
      this.technicalSkills?.rating,
      this.communicationSkills?.rating,
      this.problemSolving?.rating,
      this.teamwork?.rating,
      this.leadership?.rating,
      this.adaptability?.rating
    ].filter(rating => rating !== undefined);
    
    if (ratings.length > 0) {
      this.overallRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    }
  }
  return this.overallRating;
};

// Populate interview, candidate and interviewer information
feedbackSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'interview',
    select: 'position scheduledAt status'
  }).populate({
    path: 'candidate',
    select: 'fullName email appliedPosition'
  }).populate({
    path: 'interviewer',
    select: 'fullName email'
  });
  next();
});

module.exports = mongoose.model('Feedback', feedbackSchema);