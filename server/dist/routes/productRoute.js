"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_js_1 = __importDefault(require("../controllers/productController.js"));
const productRoute = express_1.default.Router();
productRoute.get("/", productController_js_1.default.getAllProducts);
productRoute.post("/", productController_js_1.default.addProduct);
productRoute.put("/:id", productController_js_1.default.updateProduct);
productRoute.delete("/:id", productController_js_1.default.deleteProduct);
productRoute.get("/:id", productController_js_1.default.getSingleProduct);
exports.default = productRoute;
