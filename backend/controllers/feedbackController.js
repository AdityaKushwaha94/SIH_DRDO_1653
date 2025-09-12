const Feedback = require('../models/Feedback');
const Interview = require('../models/Interview');

// @desc    Create feedback
// @route   POST /api/feedback
// @access  Private
exports.createFeedback = async (req, res) => {
  try {
    const { interviewId, type, ...feedbackData } = req.body;

    // Check if interview exists
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    // Determine candidate and interviewer based on interview
    const candidateId = interview.candidate._id;
    const interviewerId = interview.interviewer._id;

    // Create feedback with appropriate user associations
    const feedback = await Feedback.create({
      interview: interviewId,
      candidate: candidateId,
      interviewer: interviewerId,
      type,
      ...feedbackData
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating feedback',
      error: error.message
    });
  }
};

// @desc    Get feedback for an interview
// @route   GET /api/feedback/interview/:interviewId
// @access  Private
exports.getFeedbackByInterview = async (req, res) => {
  try {
    const { interviewId } = req.params;

    // Check if user has access to this interview's feedback
    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    // Check permissions
    const isCandidate = req.user.role === 'candidate' && interview.candidate._id.toString() === req.user.id;
    const isInterviewer = req.user.role === 'interviewer' && interview.interviewer._id.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isCandidate && !isInterviewer && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this feedback'
      });
    }

    const feedback = await Feedback.find({ interview: interviewId });

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback',
      error: error.message
    });
  }
};

// @desc    Get all feedback (admin only)
// @route   GET /api/feedback
// @access  Private (Admin only)
exports.getAllFeedback = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, candidate, interviewer } = req.query;
    
    // Build filter
    let filter = {};
    if (type) filter.type = type;
    if (candidate) filter.candidate = candidate;
    if (interviewer) filter.interviewer = interviewer;

    const skip = (page - 1) * limit;

    const feedback = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Feedback.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: feedback.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback',
      error: error.message
    });
  }
};