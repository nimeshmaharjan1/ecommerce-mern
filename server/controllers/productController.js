import handleAsyncError from "../middleware/catchAsyncError.js";
import ProductModel from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

const getSingleProduct = handleAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
const getAllProducts = handleAsyncError(async (req, res) => {
  const products = await ProductModel.find();
  res.status(201).json({
    success: true,
    products,
  });
});

/*
 * Add Product - Admin
 */
const addProduct = handleAsyncError(async (req, res) => {
  const product = await ProductModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
/*
 * Update Product - Admin
 */
const updateProduct = handleAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});
/*
 * Delete Product - Admin
 */
const deleteProduct = handleAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product has been deleted!",
  });
});
export default {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
