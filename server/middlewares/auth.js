import jwt from "jsonwebtoken";
import Trycatch from "./tryCatch.js";

const auth = Trycatch(async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Please login first",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token missing",
        });
    }

    const decoded = jwt.verify(
        token,
        process.env.Jwt_secret
    );

    req.user = decoded;

    next();
});

export default auth;