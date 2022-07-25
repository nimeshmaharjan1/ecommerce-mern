import handleAsyncError from "../middleware/catchAsyncError.js";
import ProductModel from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import Feature from "../utils/features.js";

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
  const resultPerpage = 5;
  const productCount = await ProductModel.countDocuments();
  const apiFeature = new Feature(ProductModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerpage);
  const products = await apiFeature.query;
  res.status(201).json({
    success: true,
    products,
    productCount,
  });
});

/*
 * Add Product - Admin
 */
const addProduct = handleAsyncError(async (req, res) => {
  req.body.user = req.user.id;
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
    suresultPerpageccess: true,
    message: "Product has been deleted!",
  });
});

//Create new review or update the review
// const createProductReview = handleAsyncError(async (req, res, next) => {
//   console.log(req.body);
//   const { rating, comment, productId } = req.body;
//   const review = {
//     user: req.user._id,
//     name: req.user.name,
//     rating: Number(rating),
//     comment,
//   };
//   const product = await ProductModel.findById(productId);
//   const isReviewed = product.reviews.find(
//     (review) => review.user.toString() === req.user._id.toString()
//   );
//   if (isReviewed) {
//     product.reviews.forEach((review) => {
//       if (review.user.toString() === req.user._id.toString()) {
//         (review.rating = Number(rating)), (review.comment = comment);
//       }
//     });
//   } else {
//     product.reviews.push(review);
//     product.numberOfReviews = product.reviews.length;
//   }
//   let average = 0;
//   product.ratings =
//     product.reviews.forEach((review) => (average += review.rating)) /
//     product.reviews.length;
//   await product.save({ validateBeforeSave: false });
//   res.status(200).json({
//     success: true,
//   });
// });

const createProductReview = handleAsyncError(async (req, res, next) => {
  console.log(req.body);
  const { productId, rating, comment } = req.body;
  // const productId = req.params.id;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await ProductModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

const getAllReviews = handleAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.query.productId);
  console.log(product);
  if (product) {
    return next(new ErrorHandler("Product not found", 400));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

const deleteReview = handleAsyncError(async (req, res, next) => {
  console.log(req.query.productId);
  const product = await ProductModel.findById(req.query.productId);
  console.log(product);
  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.reviewId.toString()
  );
  let avg = 0;
  reviews.forEach((review) => (avg += review.rating));
  const ratings = avg / reviews.length;
  const numberOfReviews = reviews.length;
  await product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numberOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Product review has been successfully deleted.",
  });
});

export default {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getAllReviews,
  deleteReview,
};
