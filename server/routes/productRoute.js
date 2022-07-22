import express from "express";
import ProductController from "../controllers/productController.js";

const productRoute = express.Router();
productRoute.get("/", ProductController.getAllProducts);
productRoute.post("/", ProductController.addProduct);
productRoute.put("/:id", ProductController.updateProduct);
productRoute.delete("/:id", ProductController.deleteProduct);
productRoute.get("/:id", ProductController.getSingleProduct);
export default productRoute;
