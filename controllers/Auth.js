const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

        const user = await User.create({
            name, email, mobile, password: hashedPassword
        });

        const token = await jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET
        );

        res.status(200).json({
            success: true,
            message: "User created successfully",
            token: token,
            name: name,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure",
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                errorMessage: "Bad request! Invalid credentials",
            });
        }

        const userDetails = await User.findOne({ email });

        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            })
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userDetails.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            })
        }

        const token = await jwt.sign(
            { userId: userDetails._id },
            process.env.JWT_SECRET
        );

        res.json({
            message:"User logged in successfully",
            token:token,
            name:userDetails.name,
        });
    } catch (error) {
        console.log(error);
        return res.json(500).json({
            success:false,
            message:"Login failure",
        })
    }
}