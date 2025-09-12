const Interview = require('../models/Interview');
const User = require('../models/User');

// @desc    Create new interview
// @route   POST /api/interviews
// @access  Private (Admin/Interviewer only)
exports.createInterview = async (req, res) => {
  try {
    const {
      candidateId,
      position,
      scheduledAt,
      duration,
      mode,
      meetingLink,
      venue,
      questions
    } = req.body;

    // Check if candidate exists
    const candidate = await User.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    // Create interview
    const interview = await Interview.create({
      candidate: candidateId,
      interviewer: req.user.id,
      position,
      scheduledAt,
      duration,
      mode,
      meetingLink,
      venue,
      questions
    });

    res.status(201).json({
      success: true,
      message: 'Interview scheduled successfully',
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating interview',
      error: error.message
    });
  }
};

// @desc    Get all interviews
// @route   GET /api/interviews
// @access  Private
exports.getInterviews = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, position } = req.query;
    
    // Build filter based on user role
    let filter = {};
    if (req.user.role === 'candidate') {
      filter.candidate = req.user.id;
    } else if (req.user.role === 'interviewer') {
      filter.interviewer = req.user.id;
    }
    
    if (status) filter.status = status;
    if (position) filter.position = new RegExp(position, 'i');

    const skip = (page - 1) * limit;

    const interviews = await Interview.find(filter)
      .sort({ scheduledAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Interview.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: interviews.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      interviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching interviews',
      error: error.message
    });
  }
};

// @desc    Get single interview
// @route   GET /api/interviews/:id
// @access  Private
exports.getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    // Check if user has access to this interview
    if (req.user.role === 'candidate' && interview.candidate._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this interview'
      });
    }

    if (req.user.role === 'interviewer' && interview.interviewer._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this interview'
      });
    }

    res.status(200).json({
      success: true,
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching interview',
      error: error.message
    });
  }
};

// @desc    Update interview
// @route   PUT /api/interviews/:id
// @access  Private (Interviewer/Admin only)
exports.updateInterview = async (req, res) => {
  try {
    let interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    // Check if user is the interviewer or admin
    if (req.user.role !== 'admin' && interview.interviewer._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this interview'
      });
    }

    interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Interview updated successfully',
      interview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating interview',
      error: error.message
    });
  }
};