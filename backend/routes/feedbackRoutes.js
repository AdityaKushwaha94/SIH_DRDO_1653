const express = require('express');
const {
  createFeedback,
  getFeedbackByInterview,
  getAllFeedback
} = require('../controllers/feedbackController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected routes
router.use(protect);

router.route('/')
  .get(authorize('admin'), getAllFeedback)
  .post(createFeedback);

router.get('/interview/:interviewId', getFeedbackByInterview);

module.exports = router;