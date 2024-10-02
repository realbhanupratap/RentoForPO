import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

export const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return next(new ApiError(errors.array()[0].msg, 400));  // Send the first validation error
  }

  next();  // Proceed if no validation errors
};
