const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
} = require('../controllers/taskController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/stats', getTaskStats);

router
  .route('/')
  .get(getTasks)
  .post(authorizeRoles('ADMIN'), createTask);

router
  .route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(authorizeRoles('ADMIN'), deleteTask);

module.exports = router;
