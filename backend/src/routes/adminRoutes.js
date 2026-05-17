const express = require('express');
const {
  getUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorizeRoles('ADMIN'));

router.get('/users', getUsers);
router.put('/user/:id/role', updateUserRole);
router.delete('/user/:id', deleteUser);

module.exports = router;
