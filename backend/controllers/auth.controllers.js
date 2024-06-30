import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import { generateTokenAndCreateCookie } from "../utils/generateTokenAndCreateCookie.js";

export const signUp = async (req, res) => {
    try {
        const { username, name, password, confirmPassword } = req.body;

        if (!username || !name || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const isExisting = await User.findOne({ username });
        if (isExisting) {
            return res.status(400).json({ error: "Username already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be atleast 6 characters long" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            name,
            password: hashedPassword,
        });

        if (newUser) {
            generateTokenAndCreateCookie(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                name: newUser.name,
                username: newUser.username,
                quizTaken: newUser.quizTaken,
                quizCreated: newUser.quizCreated
            });
        } else {
            return res.status(400).json({ error: "Invalid user data" });
        }


    } catch (error) {
        console.log("Error in signup controller", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }

}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "All fields required" });
        }

        const user = await User.findOne({ username });
        const isCorrectPassword = await bcrypt.compare(password, user?.password || "");

        if (!user || !isCorrectPassword) {
            return res.status(404).json({ error: "Invalid username or password" });
        }

        generateTokenAndCreateCookie(user._id, res);

        return res.status(200).json({
            name: user.name,
            username: user.username,
            quizTaken: user.quizTaken,
            quizCreated: user.quizCreated
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getme = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId)
            .populate({
                path: "quizTaken",
                populate: {
                    path: "createdBy",
                    select: "username"
                }
            })
            .populate({
                path: "quizCreated",
                select: "-password"
            })
            .select("-password");

        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in getme controller", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}