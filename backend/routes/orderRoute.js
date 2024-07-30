// In orderRoute.js
const express = require("express");

const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrders } = require("../controllers/orderController");
const { isAuthenticaticatedUser, authorizeRoles } = require("../middle/auth");


const router = express.Router();
router.route("/order/new").post(isAuthenticaticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticaticatedUser,getSingleOrder);
router.route("/orders/me").get(isAuthenticaticatedUser, myOrders);
router.route("/admin/orders").get(isAuthenticaticatedUser,authorizeRoles("admin"),getAllOrders);
router.route("/admin/orders/:id").put(isAuthenticaticatedUser,authorizeRoles("admin"),updateOrder);
router.route("/admin/orders/:id").delete(isAuthenticaticatedUser,authorizeRoles("admin"),deleteOrders);

module.exports = router;
