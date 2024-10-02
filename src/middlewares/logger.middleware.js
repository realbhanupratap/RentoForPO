export const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};
