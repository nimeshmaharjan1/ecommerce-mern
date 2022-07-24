"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoute_js_1 = __importDefault(require("./routes/productRoute.js"));
const userRoute_js_1 = __importDefault(require("./routes/userRoute.js"));
const error_js_1 = __importDefault(require("./middleware/error.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const URL = "/api/v1";
app.use(`${URL}/products`, productRoute_js_1.default);
app.use(`${URL}/users`, userRoute_js_1.default);
app.use(error_js_1.default);
exports.default = app;
