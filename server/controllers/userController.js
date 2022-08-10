import catchAsyncError from "../middleware/catchAsyncError.js";
import userModel from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import cloudinary from "cloudinary";
const register = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, username, email, password } = req.body;
  const user = await userModel.create({
    name,
    username,
    email,
    password,
    avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
  });
  sendToken(user, 201, res);
});

const login = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(
      new ErrorHandler("Please enter both username and password", 400)
    );
  }
  const user = await userModel.findOne({ username }).select("+password");

  if (!user)
    return next(new ErrorHandler("Invalid username or password.", 401));
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    return next(new ErrorHandler("Invalid username or password.", 401));

  sendToken(user, 200, res);
});

const logout = (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "You have been logged out successfully.",
  });
};

const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found!", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `http://localhost/api/v1/users/forgot-password/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Forgot Password",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: true });
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await userModel.find();
  res.status(200).json({
    success: true,
    users,
  });
});

const getUser = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

const resetPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findOne({ username: req.body.username });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");
  const doesPasswordMatch = await userModel.comparePassword(
    req.body.oldPassword
  );
  if (!doesPasswordMatch) {
    return next(new ErrorHandler("Old Password is incorrect!", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match!", 401));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// Update profile user
const updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
  };
  const user = userModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  sendToken(user, 200, res);
});

//Update role admin
const updateRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    role: req.body.role,
  };
  const user = userModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with the id: ${req.params.id}`, 404)
    );
  }
  sendToken(user, 200, res);
});

//Delete user admin
const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with the id: ${req.params.id}`, 404)
    );
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User has been deleted successfully.",
  });
});

export default {
  register,
  login,
  logout,
  forgotPassword,
  getAllUsers,
  getUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateRole,
  deleteUser,
};
