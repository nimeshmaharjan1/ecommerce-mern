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
const productModel_js_1 = __importDefault(require("../models/productModel.js"));
const errorHandler_js_1 = __importDefault(require("../utils/errorHandler.js"));
const features_js_1 = __importDefault(require("../utils/features.js"));
const getSingleProduct = (0, catchAsyncError_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield productModel_js_1.default.findById(req.params.id);
    if (!product) {
        return next(new errorHandler_js_1.default("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product,
    });
}));
const getAllProducts = (0, catchAsyncError_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resultPerpage = 5;
    const productCount = yield productModel_js_1.default.countDocuments();
    const apiFeature = new features_js_1.default(productModel_js_1.default.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerpage);
    const products = yield apiFeature.query;
    res.status(201).json({
        success: true,
        products,
        productCount,
    });
}));
/*
 * Add Product - Admin
 */
const addProduct = (0, catchAsyncError_js_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_js_1.default.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
}));
/*
 * Update Product - Admin
 */
const updateProduct = (0, catchAsyncError_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield productModel_js_1.default.findById(req.params.id);
    if (!product)
        return next(new errorHandler_js_1.default("Product not found", 404));
    product = yield productModel_js_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        product,
    });
}));
/*
 * Delete Product - Admin
 */
const deleteProduct = (0, catchAsyncError_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield productModel_js_1.default.findById(req.params.id);
    if (!product)
        return next(new errorHandler_js_1.default("Product not found", 404));
    yield product.remove();
    res.status(200).json({
        success: true,
        message: "Product has been deleted!",
    });
}));
exports.default = {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getSingleProduct,
};
