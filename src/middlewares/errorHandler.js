export const errorHandler = (err, req, res, next) => {
  console.error(`[Error]: ${err.message}`);

  const errorMap = {
    'Invalid Credentials': 401,
    'Order not found': 404,
    'Order with this ID already exists': 409,
    'Token not provided': 401,
    'Invalid or expired token': 403,
    'User already exists': 409,
  };

  const status = errorMap[err.message] || 500;
  const message = status === 500 ? 'Internal Server Error' : err.message;

  res.status(status).json({
    error: message,
  });
};
