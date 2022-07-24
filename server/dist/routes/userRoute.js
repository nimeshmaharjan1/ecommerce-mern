"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_js_1 = __importDefault(require("../controllers/userController.js"));
const express_1 = __importDefault(require("express"));
const userRoute = express_1.default.Router();
userRoute.post("/register", userController_js_1.default.register);
userRoute.post("/login", userController_js_1.default.login);
exports.default = userRoute;
