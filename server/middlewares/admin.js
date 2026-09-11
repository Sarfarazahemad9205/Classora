const admin = (req, res, next) => {

    console.log("Logged in user:", req.user);

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admin only",
        });
    }

    next();
};

export default admin;