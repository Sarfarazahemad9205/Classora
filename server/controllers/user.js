
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";
import Trycatch from "../middlewares/tryCatch.js";

export const register = Trycatch(async (req, res) => {
    const { email, name, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists",
        });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Create activation token
    const activationToken = jwt.sign(
        {
            name,
            email,
            password: hashPassword,
            otp,
        },
        process.env.Activation_Secret,
        {
            expiresIn: "5m",
        }
    );

    // Email data
    const data = {
        name,
        otp,
    };

    // Send OTP email
    await sendMail(
        email,
        "E learning",
        data
    );

    res.status(200).json({
        message: "OTP sent to your mail",
        activationToken,
    });
});

export const verifyUser = Trycatch(async (req, res) => {
    const { otp, activationToken } = req.body;

    const verify = jwt.verify(
        activationToken,
        process.env.Activation_Secret
    );

    if (Number(verify.otp) !== Number(otp)) {
        return res.status(400).json({
            message: "Wrong OTP",
        });
    }

    await User.create({
        name: verify.name,
        email: verify.email,
        password: verify.password,
    });

    res.status(200).json({
        message: "User Registered",
    });
});

export const login = Trycatch(async(req,res)=>{

    const {email,password}=req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.status(400).json({
            message:"User not found",
        });
    }

    const isPasswordCorrect=await bcrypt.compare(
        password,
        user.password
    );

    if(!isPasswordCorrect){
        return res.status(400).json({
            message:"Invalid email or Password",
        });
    }
    const token =jwt.sign(
        {
            userId:user._id,
            role:user.role,
        },
        process.env.Jwt_secret,
        {
            expiresIn:"7d",
        }
    );

    res.status(200).json({
        message:"Login Successfull",
        token,
    });
});

export const profile = Trycatch(async (req, res) => {
const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    res.status(200).json({
        message: "Profile fetched successfully",
        user,
    });
});

