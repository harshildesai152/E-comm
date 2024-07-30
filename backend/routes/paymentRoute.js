const express = require("express");
const router = express.Router();

const { isAuthenticaticatedUser } = require("../middle/auth");
const { processPayment, sendStripeApiKey } = require("../controllers/paymentController");
const paymentController =require('../controllers/paymentController.js')

router.route("/payment/process").post(isAuthenticaticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticaticatedUser, sendStripeApiKey);

module.exports = router;
