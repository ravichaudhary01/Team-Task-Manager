const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getProjects)
  .post(authorizeRoles('ADMIN'), createProject);

router
  .route('/:id')
  .get(getProject)
  .put(authorizeRoles('ADMIN'), updateProject)
  .delete(authorizeRoles('ADMIN'), deleteProject);

module.exports = router;
