const jwt=require("jsonwebtoken")
const User=require("../models/userModel")

exports.isAuthenticaticatedUser=async(req,res,next)=>{

     const {token}=req.cookies;

     if(!token){
         return res.status(404).json({ success: false, message: "pleace  login to access this resource"});
     }
     
     const decodeData=jwt.verify(token,process.env.JWT_SECRET); 

      req.user=await User.findById(decodeData.id);   //sign id=this._id    req to accees user data diracly using token    //get all product   //admin can be creact product

      next();
}

exports.authorizeRoles = (...roles) => {   //role array ke under user nahi he
    return (req, res, next) => {
       
        if (!roles.includes(req.user.role)) {
            
            return res.status(403).json({ error: `Role: ${req.user.role} is not allowed to access this data` });
        }
        next();
    };
};




