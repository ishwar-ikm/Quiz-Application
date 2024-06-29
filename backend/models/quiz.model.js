import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true 
    },

    description: {
        type: String,
        required: true 
    },

    questions: [
        {
            question: {
                type: String,
                required: true 
            },
            answer: {
                type: String,
                required: true
            },
            options: [
                {
                    type: String,
                    required: true
                }
            ]
        }
    ],

    numberOfQuestions: {
        type: Number,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;