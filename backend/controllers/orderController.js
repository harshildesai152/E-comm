const Order = require("../models/orderModel");
const Product = require("../models/productModel");


// Create new Order
exports.newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//get single order
exports.getSingleOrder=async(req,res,next)=>{

    const order=await Order.findById(req.params.id).populate("user","name email")//  order folder ki user id ko select kar ke user folder ke name or email ko lega

    if(!order){
       return res.status(404).json({
            success:false,
            message:"order is not found",
        })
    }

    res.status(200).json({
        success:false,
        order,
    })
}

//get logged in user order
exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
  
    res.status(200).json({
      success: true,
      orders,
    });
  };


  //get all order --admin
exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  
  //All the order price
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });

};

 // Update order status --admin
exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
      return res.status(404).json({
          success: false,
          message: "Order not found",
      });
  }

  if (order.orderStatus === "Delivered") {
      return res.status(400).json({
          success: false,
          message: "You have already delivered this order",
      });
  }

  if (req.body.status === "Delivered") {
      order.orderItems.forEach(async (orderItem) => {
          await updateStock(orderItem.product, orderItem.quantity);
      });
  }

  order.orderStatus = req.body.status;
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
      success: true,
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  if (!product) {
      console.error(`Product not found: ${id}`);
      return; // Optionally handle the error or notify the user
  }

  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

    //delete order --admin

exports.deleteOrders = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.deleteOne({ _id: req.params.id })
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
