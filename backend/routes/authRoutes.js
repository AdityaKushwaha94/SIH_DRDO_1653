const express = require('express');
const { body } = require('express-validator');
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  getCandidates
} = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Please provide a valid 10-digit phone number'),
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  body('gender')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Please select a valid gender'),
  body('appliedPosition')
    .notEmpty()
    .withMessage('Applied position is required'),
  body('education.highestDegree')
    .notEmpty()
    .withMessage('Highest degree is required'),
  body('education.institution')
    .notEmpty()
    .withMessage('Institution is required'),
  body('education.percentage')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Percentage must be between 0 and 100'),
  body('education.yearOfPassing')
    .isInt({ min: 1950, max: new Date().getFullYear() })
    .withMessage('Please provide a valid year of passing')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
];

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePasswordValidation, changePassword);

// Admin/Interviewer only routes
router.get('/candidates', protect, authorize('admin', 'interviewer'), getCandidates);

module.exports = router;