import express from "express";
import ProductController from "../controllers/productController.js";
import auth from "../middleware/checkAuth.js";
const productRoute = express.Router();
productRoute.get("/", ProductController.getAllProducts);
productRoute.post("/", auth.isAdmin("admin"), ProductController.addProduct);
productRoute.put(
  "/review",
  auth.isUserAuthenticated,
  ProductController.createProductReview
);
productRoute.get("/get-product-reviews", ProductController.getAllReviews);
productRoute.delete(
  "/delete-review",
  auth.isUserAuthenticated,
  ProductController.deleteReview
);
productRoute.put(
  "/:id",
  auth.isAdmin("admin"),
  ProductController.updateProduct
);
productRoute.delete(
  "/:id",
  auth.isAdmin("admin"),
  ProductController.deleteProduct
);
productRoute.get("/:id", ProductController.getSingleProduct);

export default productRoute;
