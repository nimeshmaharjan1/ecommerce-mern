"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_js_1 = __importDefault(require("../utils/errorHandler.js"));
exports.default = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    if (err.name == "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new errorHandler_js_1.default(message, 400);
    }
    res.status(err.statusCode).json({ success: false, message: err.message });
};
