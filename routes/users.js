const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const User = require('../models/user');
const router = express.Router();

router.get('/', authenticateToken, authorizeRole(['SuperAdmin']), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

module.exports = router;

