import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,  // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again after 15 minutes',
  headers: true,
});
