const express = require('express');
const {
  createInterview,
  getInterviews,
  getInterview,
  updateInterview
} = require('../controllers/interviewController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected routes
router.use(protect);

router.route('/')
  .get(getInterviews)
  .post(authorize('admin', 'interviewer'), createInterview);

router.route('/:id')
  .get(getInterview)
  .put(authorize('admin', 'interviewer'), updateInterview);

module.exports = router;