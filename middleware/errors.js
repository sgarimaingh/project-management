class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
      super(message, 404);
    }
  }
  
  class ValidationError extends AppError {
    constructor(message = 'Invalid input data') {
      super(message, 400);
    }
  }
  
  module.exports = {
    AppError,
    NotFoundError,
    ValidationError,
  };
  