import express from "express";
import { getme, login, logout, signUp } from "../controllers/auth.controllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getme", protectRoute, getme);

export default router;
