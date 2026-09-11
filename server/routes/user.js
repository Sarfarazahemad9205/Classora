import express from "express";
import { register, verifyUser,login,profile} from "../controllers/user.js";

import auth from "../middlewares/auth.js";
 import admin from "../middlewares/admin.js";




const router=express.Router();

router.post("/user/register",register);

router.post("/user/verify",verifyUser);

router.post("/user/login",login);

router.get("/user/profile", auth, profile);





export default router;