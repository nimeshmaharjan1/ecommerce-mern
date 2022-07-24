export const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  const options = {
    expiresIn: new Date(
      Date() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
