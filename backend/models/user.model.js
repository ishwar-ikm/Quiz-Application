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
    ]
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;