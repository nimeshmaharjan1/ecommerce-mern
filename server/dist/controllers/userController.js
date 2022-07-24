"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsyncError_js_1 = __importDefault(require("../middleware/catchAsyncError.js"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const errorHandler_js_1 = __importDefault(require("../utils/errorHandler.js"));
const jwtToken_js_1 = require("../utils/jwtToken.js");
const register = (0, catchAsyncError_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, password } = req.body;
    const user = yield userModel_js_1.default.create({
        name,
        username,
        email,
        password,
        avatar: { public_id: "This is a sample id", url: "this is a sample url" },
    });
    (0, jwtToken_js_1.sendToken)(user, 201, res);
}));
const login = (0, catchAsyncError_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return next(new errorHandler_js_1.default("Please enter both username and password", 400));
    }
    const user = yield userModel_js_1.default.findOne({ username }).select("+password");
    if (!user)
        return next(new errorHandler_js_1.default("Invalid username or password.", 401));
    const isPasswordCorrect = yield user.comparePassword(password);
    if (!isPasswordCorrect)
        return next(new errorHandler_js_1.default("Invalid username or password.", 401));
    (0, jwtToken_js_1.sendToken)(user, 200, res);
}));
exports.default = {
    register,
    login,
};
