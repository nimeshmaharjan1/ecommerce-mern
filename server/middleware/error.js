import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  if (err.name == "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code == 11000) {
    const message = `Duplicate ${Object.keys} entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code == "JsonWebTokenError") {
    const message = `JWT is invalid, please try again.`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code == "TokenExpiredError") {
    const message = `JWT has expired, please try again.`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({ success: false, message: err.message });
};
