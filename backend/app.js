const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/.env" });

app.use(express.json());//used to mount the specified middleware function(s) at the path that is being specified.
app.use(cookieParser());//Extracts the cookie data from the HTTP request and converts it into a usable format that can be accessed by the server-side code

app.use(bodyparser.urlencoded({ extended: true }));
app.use(fileUpload());

const product = require('./routes/productRoute');
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
const payment = require('./routes/paymentRoute')

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

module.exports = app;