import jwt from "jsonwebtoken";

export const generateTokenAndCreateCookie = (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });

    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000,
        httpOnly: true, // prevent XXS attacks ie cross site scripting attacks
        sameSite: "strict", // CSRF attacks ie cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    });
}