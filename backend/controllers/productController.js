const Product = require("../models/productModel");
const ApiFeatures=require("../utils/apifeatures");
const  cloudinary =require("cloudinary");


// Create product
exports.createProduct = async (req, res, next) => {
  try {
    let images = []; // Array to hold images

    // Check if req.body.images is a single image or an array of images
    if (typeof req.body.images === "string") { 
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    // Upload images to Cloudinary and collect their URLs
    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products"
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url
      });
    }

    // Add the uploaded images' URLs and the user ID to the request body
    req.body.images = imagesLink;
    req.body.user = req.user.id;

    // Create the product in the database
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Get all products
exports.getAllproducts = async (req, res, next) => {

 
  // res.status(500).json({
  //   success: false,
  //   message: "Server error",
  // })
  try {
    const resultPerPage = 8;
   
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query);
    apiFeature.search().filter().pagination(resultPerPage);

    const products = await apiFeature.query;
    
    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
     
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Get all products(admin)
exports.getAdminproducts = async (req, res, next) => {

 
  // res.status(500).json({
  //   success: false,
  //   message: "Server error",
  // })
  try {
    const products=await Product.find();
    
    res.status(200).json({
      
      products,
     
     
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Get all products per all products
exports.getAllproductsp = async (req, res, next) => {

 
  // res.status(500).json({
  //   success: false,
  //   message: "Server error",
  // })
  try {
    const resultPerPage = 800;
   
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query);
    apiFeature.search().filter().pagination(resultPerPage);

    const products = await apiFeature.query;
    
    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
     
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



//GET PRODUCT details
exports.getProductDetails=async (req,res,next)=>{
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({      
      success: false,
      message: "Server error",
    });
}
}


// Update product
exports.updateProducts = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      for (let i = 0; i < product.images.length; i++) {
        if (product.images[i] && product.images[i].public_id) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
      }
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products"
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url
      });
    }

    req.body.images = imagesLink;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
     //Deleting img from cloudinary

     if (product.images && product.images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        // Ensure image is defined before accessing public_id
        if (product.images[i] && product.images[i].public_id) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
      }
    }

     await Product.findByIdAndDelete(req.params.id); // Use deleteOne() method   && params is id object passed by monogodb server
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({        //if product is not found
      success: false,
      message: "Server error",
    });
  }



};


//create new review or update the review
exports.createProductReview=async(req,res,next)=>{
    const  productId=req.body.productId
     const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(req.body.rating),
        comment:req.body.comment,
        
     };

      const product = await Product.findById(productId);
      const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());// user can be send review id or user id are same 
      if (isReviewed) {                  // old reviews update
        product.reviews.forEach((rev) => {
          if (rev.user.toString() === req.user._id.toString()) {      //// user can be send review id or user id are same 
              rev.rating = review.rating;
              rev.comment = review.comment;
          }
      });
  }
     else{
        product.reviews.push(review)    //new reviews add
        product.numOfReviews=product.reviews.length
     }

     //avrege of review for over all rating
     let avg=0;
     product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
     
     product.ratings=avg/product.reviews.length    // rating 4,5,5,2==16/reviews length  ==>  16/4=4   avrege rating is 4

     await product.save({vlidateBeforeSave:false});;
     res.status(200).json({
      success:true
     });
}


//get all review for product

exports.getProductReviews=async(req,res,next)=>{

  const product  =await Product.findById(req.query.id);

  if(!product){
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
   }
     res.status(200).json({
      success: true,
      review:product.reviews,
    });  
}


//delete product review
exports.deleteReview=async(req,res,next)=>{

  const product  =await Product.findById(req.query.productId);

  if(!product){
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
   }
   const reviews=product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());

   let avg=0;
   reviews.forEach((rev) => {
    avg += rev.rating;
  });
  
  const ratings=avg/reviews.length 

  const numOfReviews=reviews.length

  await Product.findByIdAndUpdate(req.query.productId,{reviews,ratings,numOfReviews},{
    new:true,
    runValidators:true,
    useFindAndModify:false,
  })

     res.status(200).json({
      success: true,
    });  
}