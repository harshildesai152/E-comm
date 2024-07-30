const express=require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails,updatePassword ,updateProfile, getAllUser, getSingleUser, updateUser, deleteUser} = require("../controllers/userController");
const router=express.Router();

const {isAuthenticaticatedUser,authorizeRoles}=require('../middle/auth')

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticaticatedUser,getUserDetails);

router.route("/password/update").put(isAuthenticaticatedUser,updatePassword);

router.route("/me/update").put(isAuthenticaticatedUser,updateProfile);


router.route("/admin/users").get(isAuthenticaticatedUser,authorizeRoles("admin"),getAllUser);

router.route("/admin/user/:id").get(isAuthenticaticatedUser,authorizeRoles("admin"),getSingleUser).put(isAuthenticaticatedUser,authorizeRoles("admin"),updateUser).delete(isAuthenticaticatedUser,authorizeRoles("admin"),deleteUser);






module.exports=router;