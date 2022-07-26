import handleAsyncError from "../middleware/catchAsyncError.js";
import productModel from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import orderModel from "../models/orderModel.js";

const newOrder = handleAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
});

const getSingleOrder = handleAsyncError(async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "name email");
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  res.status(201).json({
    success: true,
    order,
  });
});

const myOrders = handleAsyncError(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user._id });

  res.status(201).json({
    success: true,
    orders,
  });
});

// Get All Orders --Admin
const getAllOrders = handleAsyncError(async (req, res, next) => {
  const orders = await orderModel.find();
  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));
  res.status(201).json({
    success: true,
    orders,
  });
});

//Update Order Status --Admin

const updateOrder = handleAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found!", 400));
  }
  if (order.orderStatus == "Delivered") {
    return next(
      new ErrorHandler("This product has already been delivered", 400)
    );
  }
  order.orderItems.forEach(async (order) => {
    await updateStock(order.product, order.quantity);
  });
  order.orderStatus = req.body.orderStatus;

  if (req.body.orderStatus == "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

const updateStock = async (id, quantity) => {
  const product = await productModel.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
};

//Delete order --Admin
const deleteOrder = handleAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  await order.remove();
  res.status(200).json({
    success: true,
    message: "Order has been successfully deleted.",
  });
});
export default {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
