import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import catchAsyncError from "./catchAsyncError.js";
const isUserAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await userModel.findById(decodedData.id);
  next();
});

const isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

export default {
  isUserAuthenticated,
  isAdmin,
};
