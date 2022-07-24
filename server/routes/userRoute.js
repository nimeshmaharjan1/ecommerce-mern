import userController from "../controllers/userController.js";
import express from "express";
import checkAuth from "../middleware/checkAuth.js";
const userRoute = express.Router();
userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);
userRoute.get("/logout", userController.logout);
userRoute.get(
  "/",
  checkAuth.isUserAuthenticated,
  checkAuth.isAdmin("admin"),
  userController.getAllUsers
);
userRoute.get(
  "/get-user",
  checkAuth.isUserAuthenticated,
  userController.getUser
);
userRoute.post("/forgot-password", userController.forgotPassword);
userRoute.put("/reset-password", userController.resetPassword);
userRoute.put("/update-password", userController.updatePassword);
userRoute.put(
  "/update-profile",
  checkAuth.isUserAuthenticated,
  userController.updateProfile
);
userRoute.put(
  "/update-role/:id",
  checkAuth.isAdmin("admin"),
  userController.updateRole
);
userRoute.delete(
  "/delete-user/:id",
  checkAuth.isAdmin("admin"),
  userController.deleteUser
);
export default userRoute;
