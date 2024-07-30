const monogoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); //reset password

const userSchema = new monogoose.Schema({
  name: {
    type: String,
    required: [true, "pleace enter your name"],
    maxLength: [30, "name can not be more then 30 chracters"],
    minLength: [4, "name should be more then 5 chracters"],
  },
  email: {
    type: String,
    required: [true, "pleace enter your email"],
    unique: true,
    validator: [validator.isEmail, "pleace enter valid email"],
  },
  password: {
    type: String,
    required: [true, "pleace enter your password"],
    minLength: [6, "password should be more then 5 chracters"],
    select: false, //password is not shown
  },
  avatar: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  const secret = process.env.JWT_SECRET || 'fallback_secret_key';
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare password
userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password); //enterPassword=you can enter password converted in bcrypt    this.password=hash password
};

//reset password
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")    //sha256 is algo.
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = monogoose.model("User", userSchema);