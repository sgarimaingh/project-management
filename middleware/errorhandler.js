
const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack.error });
  res.status(err.statusCode).json({ status: err.status, error: err.message });
};

module.exports = errorHandler;
