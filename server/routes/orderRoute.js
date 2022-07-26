import express from "express";
const orderRoute = express.Router();
import orderController from "../controllers/orderController.js";
import checkAuth from "../middleware/checkAuth.js";
orderRoute.post("/new", orderController.newOrder);
orderRoute.get("/:id", orderController.getSingleOrder);
orderRoute.get("/", orderController.myOrders);
orderRoute
  .route("/admin/all")
  .get(checkAuth.isAdmin("admin"), orderController.getAllOrders);
orderRoute
  .route("/admin/:id")
  .put(checkAuth.isAdmin("admin"), orderController.updateOrder)
  .delete(checkAuth.isAdmin("admin"), orderController.deleteOrder);
export default orderRoute;
