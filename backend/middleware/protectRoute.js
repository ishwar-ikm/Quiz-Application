import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error: "Unauthorised: No token provided"});
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode){
            return res.status(401).json({error: "Unauthorised: Invalid token"});
        }

        const user = await User.findOne({_id: decode.userID}).select("-password");

        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute ", error.message);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Unauthorized: Token expired" });
        } else {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default protectRoute;