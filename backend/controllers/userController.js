const User=require('../models/userModel')
const sendToken=require('../utils/jwtToken')
const sendEmail=require('../utils/sendEmail.js')
const crypto = require("crypto");
const  cloudinary =require("cloudinary");


//register user
exports.registerUser=async(req,res,next)=>{
    try{
        const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale",
        })
    const {name,email,password}=req.body;

    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    });
   
    // const token=user.getJWTToken();
    // res.status(201).json({
    //     success:true,
    //     token,
 
    // })
    sendToken(user,201,res);
} catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}


//login user
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide both email and password" });
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        // const token = user.getJWTToken();
        // res.status(200).json({ success: true, token });
        sendToken(user,200,res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


//logout user
exports.logout=async(req,res,next)=>{
    
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success: true,
        message: "logout ",
      });
}


//forgot password
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Generate and set reset password token
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });    //save the token

        // Construct the reset password URL
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/LoginSignUp/password/reset/${resetToken}`;
        // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

        const message = `Your password reset token is  ttm: \n\n${resetPasswordUrl}\n\nIf you have not requested this email, please ignore it.`;

        try {
            // Send email you can type
            await sendEmail({
                email: user.email,
                subject: `Ecommerce Password Recovery`,
                message,
            });

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`,
            });
        } catch (emailError) {
            console.error("Error sending email:", emailError);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(500).json({
                success: false,
                message: "Failed to send email for password reset",
            });
        }
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


//reset password         
exports.resetPassword = async (req, res, next) => {
    try {
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Reset password token is invalid or has expired" });
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ success: false, message: "Password does not match confirm password" });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


//get user details
exports.getUserDetails=async(req,res,next)=>{
    const user=await User.findById(req.user.id);

    //if logine so you can assess  data 
    res.status(200).json({
        success: true,
        user,
      });
}


//update user password
exports.updatePassword=async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return res.status(400).json({ success: false, message: "old password is Incorrect" });
    }

  if(req.body.newPassword!==req.body.confirmPassword){
    return res.status(400).json({ success: false, message: " password does not match" });
  }

  user.password=req.body.newPassword;
  await user.save()

   sendToken(user,200,res);
}


//update user profile   ,,change user email using user name
exports.updateProfile = async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
        };

        // Check if avatar exists in the request body
        if (req.body.avatar !== "") {
            const user = await User.findById(req.user.id);

            // Check if user exists
            if (!user) {
                return res.status(404).json({ success: false, error: 'User not found' });
            }

            // Update avatar
            const imageId = user.avatar ? user.avatar.public_id : null;

            // If avatar exists, delete the old image from cloudinary
            if (imageId) {
                await cloudinary.v2.uploader.destroy(imageId);
            }

            // Upload new avatar to cloudinary
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale",
            });

            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        // Update user data
        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            reuValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
};


//get all user
exports.getAllUser=async(req,res,next)=>{
      const users=await User.find();

      res.status(200).json({
        success:true,
        users
      })
}


//get single  user--admin
exports.getSingleUser=async(req,res,next)=>{
    const user=await User.findById(req.params.id);


    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not exist with id :${req.params.id}`,
        });
    }
    res.status(200).json({
      success:true,
      user
    })
}


//update user role--admin
exports.updateUser=async(req,res,next)=>{
   

    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }

    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        reuValidators:true,
        useFindAndModify:false,
    })

     res.status(200).json({
        success:true    
     })
}

//delete user --admin
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found with id: ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

