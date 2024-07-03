import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createQuiz, deleteQuiz, getAllQuiz, getFeedback, getOneQuiz, getQuestions, postFeedback } from "../controllers/quiz.controllers.js";

const router = express.Router();

router.get("/allQuiz", protectRoute, getAllQuiz);
router.get("/oneQuiz/:quizId", protectRoute, getOneQuiz);
router.get("/questions/:quizId", protectRoute, getQuestions);
router.get("/feedback/:quizId", protectRoute, getFeedback);
router.post("/feedback/:quizId", protectRoute, postFeedback);
router.post("/create", protectRoute, createQuiz);
router.delete("/delete/:quizId", protectRoute, deleteQuiz);

export default router;
