import Quiz from "../models/quiz.model.js"
import User from "../models/user.model.js";

export const createQuiz = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const quizData = req.body;

        const { questions } = quizData;

        if(!questions){
            return res.status(400).json({error: "There should be atleast one question for the quiz"});
        }

        let invalidQuestion = null;

        questions.forEach(element => {
            const { answer, options } = element;
            const lowerCaseOptions = options.map(option => option.toLowerCase());
            const isAnswerIncluded = lowerCaseOptions.includes(answer.toLowerCase());
            if (!isAnswerIncluded) {
                invalidQuestion = element;
            }
        });


        if (invalidQuestion) {
            return res.status(400).json({ error: "Answer does not match with options in one or more questions" });
        }

        const newQuiz = new Quiz(quizData);
        newQuiz.createdBy = userId;
        newQuiz.numberOfQuestions = newQuiz.questions.length;

        await newQuiz.save()

        user.quizCreated.push(newQuiz._id);
        await user.save();

        res.status(201).json(newQuiz);
    } catch (error) {
        console.log("Error in createQuiz controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteQuiz = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { quizId } = req.params;

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        if (quiz.createdBy.toString() !== userId.toString()) {
            return res.status(401).json({ error: "Unauthorised: You are not the owner of this quiz" });
        }

        await Quiz.findByIdAndDelete(quizId);

        const filtered = user.quizCreated.filter(element => {
            return element.toString() !== quizId.toString();
        });

        user.quizCreated = filtered;
        await user.save();

        return res.status(200).json({ message: "Quiz deleted successfully" });

    } catch (error) {
        console.log("Error in deleteQuiz controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getAllQuiz = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const quiz = await Quiz.find()
            .populate({
                path: "createdBy",
                select: "username"
            })
            .select("-questions");

        const response = quiz.filter(q => {
            return !(user.quizCreated.includes(q._id));
        })

        return res.status(200).json(response);

    } catch (error) {
        console.log("Error in getAllQuiz controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getOneQuiz = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { quizId } = req.params;

        const quiz = await Quiz.findById(quizId)
            .populate({
                path: "createdBy",
                select: "username"
            })
            .select("-questions");

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        return res.status(200).json(quiz);

    } catch (error) {
        console.log("Error in getAllQuiz controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getQuestions = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { quizId } = req.params;

        const quiz = await Quiz.findById(quizId).select("-questions.answer");

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        if (quiz.createdBy.toString() === user._id.toString()) {
            return res.status(400).json({ error: "You have created this quiz hence you cannot take this quiz" });
        }

        if (user.quizTaken.includes(quizId)) {
            return res.status(400).json({ error: "You have already taken this quiz" });
        }


        return res.status(200).json(quiz);

    } catch (error) {
        console.log("Error in getAllQuiz controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const postFeedback = async (req, res) => {
    try {
        const userId = req.user._id;
        const { userAnswers } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { quizId } = req.params;

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        if (user.quizTaken.includes(quizId)) {
            return res.status(400).json({ error: "You have already taken this quiz" });
        }

        const userFeedback = user.feedBack;
        let taken = false;

        userFeedback.forEach(element => {
            if (element.quizId.toString() === quizId) {
                taken = true;
            }
        })
        if (taken) {
            return res.status(400).json({ error: "You have already taken this quiz" });
        }

        const numberOfQuestions = quiz.questions.length;

        if (userAnswers.length !== numberOfQuestions) {
            return res.status(400).json({ error: "Answer count does not match question count" });
        }

        let questionsSolved = 0;
        let questionsWrong = 0;
        let questionsLeft = 0;

        quiz.questions.forEach((element, index) => {
            const correctAnswer = element.answer.toLowerCase();
            const userAnswer = userAnswers[index].toLowerCase();

            if (userAnswer === '') {
                questionsLeft++;
            } else if (userAnswer !== correctAnswer) {
                questionsWrong++;
            } else {
                questionsSolved++;
            }
        });

        const score = (questionsSolved / numberOfQuestions) * 100;

        const feedback = {
            quizId,
            numberOfQuestions,
            questionsSolved,
            questionsWrong,
            questionsLeft,
            score
        };

        user.feedBack.push(feedback);
        user.quizTaken.push(quizId);
        
        await user.save();

        return res.status(200).json(feedback);

    } catch (error) {
        console.log("Error in postFeedback controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getFeedback = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { quizId } = req.params;

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        const userFeedbacks = user.feedBack;

        let feedBack = null;

        userFeedbacks.forEach(element => {
            if (quizId.toString() === element.quizId.toString()) {
                feedBack = element;
            }
        });

        if (!feedBack) {
            return res.status(400).json({ error: "You have not taken this quiz" });
        }

        return res.status(200).json({feedBack, questions: quiz.questions});

    } catch (error) {
        console.log("Error in getFeedback controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const searchQuizzesByName = async (req, res) => {
    const { name } = req.query;
    try {
        const regex = new RegExp(name, 'i');
        const quizzes = await Quiz.find({ title: { $regex: regex } }).select("-questions");
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};