import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    quizTaken: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            default: []
        }
    ],

    quizCreated: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            default: []
        }
    ],

    feedBack: {
        type: [{
            quizId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Quiz",
                required: true
            },
            numberOfQuestions: {
                type: Number,
                required: true
            },
            questionsSolved: {
                type: Number,
                required: true
            },
            questionsWrong: {
                type: Number,
                required: true
            },
            questionsLeft: {
                type: Number,
                required: true
            },
            score: {
                type: Number,
                required: true
            }
        }],
        default: []
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;