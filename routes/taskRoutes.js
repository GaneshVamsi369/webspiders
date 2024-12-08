const express = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// Validation rules
const taskValidationRules = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  check('priority')
    .notEmpty()
    .withMessage('Priority is required')
    .isIn(['LOW', 'MEDIUM', 'HIGH'])
    .withMessage('Priority must be one of LOW, MEDIUM, or HIGH'),
  check('status')
    .optional()
    .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
    .withMessage('Status must be one of TODO, IN_PROGRESS, or COMPLETED'),
  check('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due Date must be a valid ISO 8601 date'),
];

// Routes
router.route('/').post(taskValidationRules, validate, createTask).get(getTasks);

router.route('/:id').get(getTaskById).put(taskValidationRules, validate, updateTask).delete(deleteTask);

module.exports = router;
