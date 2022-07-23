import userController from "../controllers/userController";
import express from "express";
const userRoute = express.Router();
userRoute.post("/", userController.register);
export default userRoute;
