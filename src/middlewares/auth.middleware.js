import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError('Unauthorized access, token required', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token (user) to the request
    next();  // Proceed to the next middleware/controller
  } catch (err) {
    return next(new ApiError('Invalid or expired token', 401));
  }
};
