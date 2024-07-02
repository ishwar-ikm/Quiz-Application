import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createQuiz, deleteQuiz, getAllQuiz, getFeedback, getOneQuiz, getQuestions, postFeedback, searchQuizzesByName } from "../controllers/quiz.controllers.js";

const router = express.Router();

router.get("/allQuiz", protectRoute, getAllQuiz);
router.get("/oneQuiz/:quizId", protectRoute, getOneQuiz);
router.get("/questions/:quizId", protectRoute, getQuestions);
router.get("/feedback/:quizId", protectRoute, getFeedback);
router.get("/search", protectRoute, searchQuizzesByName);
router.post("/feedback/:quizId", protectRoute, postFeedback);
router.post("/create", protectRoute, createQuiz);
router.delete("/delete/:quizId", protectRoute, deleteQuiz);

export default router;
