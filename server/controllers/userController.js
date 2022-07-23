import catchAsyncError from "../middleware/catchAsyncError";
import userModel from "../models/userModel";
const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userModel.create({
    name,
    email,
    password,
    avatar: { public_id: "This is a sample id", url: "this is a sample url" },
  });
  res.status(201).json({
    success: true,
    user,
  });
});

export default {
  register,
};
