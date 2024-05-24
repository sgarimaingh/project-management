const jwt = require('jsonwebtoken');
const  secret  = require('../config/config');
const logger = require('../config/logger');


const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.sendStatus(403);
  }
  next();
};

module.exports = { authenticateToken, authorizeRole };
