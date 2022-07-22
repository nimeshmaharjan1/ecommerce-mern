import express from "express";
import ProductController from "../controllers/productController.js";

const productRoute = express.Router();
productRoute.get("/", ProductController.getAllProducts);
productRoute.post("/", ProductController.addProduct);
productRoute.put("/:id", ProductController.updateProduct);
export default productRoute;
