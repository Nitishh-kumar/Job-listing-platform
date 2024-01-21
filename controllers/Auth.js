const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // write a check for mobile number also

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            });
        }

        const user=await User.create({
            name,email,mobile,password:hashedPassword
        });

        const token=await jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET
        );

        res.status(200).json({
            success:true,
            message:"User created successfully",
            token:token
        });


    } catch (error) {
           console.log(error);
           return res.status(500).json({
            success:false,
            message:"Login Failure",
           });
    }
}