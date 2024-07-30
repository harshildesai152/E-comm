const express=require("express");
const {getProductDetails, getAllproducts, createProduct, updateProducts,deleteProduct ,createProductReview, getProductReviews, deleteReview, getAllproductsp, getAdminproducts} = require("../controllers/productController");
const { isAuthenticaticatedUser ,authorizeRoles} = require("../middle/auth");


const router=express.Router();

router.route("/products").get(getAllproducts);
router.route("/productsp").get(getAllproductsp);
//router.route("/products").get( isAuthenticaticatedUser,authorizeRoles("admin"),getAllproducts); //check http://localhost:4000/api/v1/products admin can be acces the data 
router.route("/admin/product/new").post( isAuthenticaticatedUser,authorizeRoles("admin"),createProduct);
router.route("/admin/product/:id")
  .put(isAuthenticaticatedUser, authorizeRoles("admin"), updateProducts)
  .delete(isAuthenticaticatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticaticatedUser,createProductReview)

router.route("/reviws").get(getProductReviews).delete(isAuthenticaticatedUser,deleteReview)

router.route("/admin/products").get(isAuthenticaticatedUser,authorizeRoles("admin"),getAdminproducts)

module.exports=router;