import React from 'react';

const QuestionInput = ({ index, question, options, answer, onQuestionChange, onOptionChange, onAnswerChange }) => {
    const handleQuestionChange = (e) => {
        onQuestionChange(index, e.target.value);
    };

    const handleOptionChange = (optionIndex, value) => {
        onOptionChange(index, optionIndex, value);
    };

    const handleAnswerChange = (e) => {
        onAnswerChange(index, e.target.value);
    };

    return (
        <div className="form-control w-full max-w-xs mb-4">
            <div className="label">
                <span className="label-text text-lg">Question {index + 1}</span>
            </div>
            <input
                type="text"
                placeholder={`Enter question ${index + 1}`}
                className="input input-bordered w-full max-w-xs mb-2"
                value={question}
                onChange={handleQuestionChange}
                required
            />
            {options.map((option, optionIndex) => (
                <input
                    key={optionIndex}
                    type="text"
                    placeholder={`Option ${optionIndex + 1}`}
                    className="input input-bordered w-full max-w-xs mb-2"
                    value={option}
                    onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                    required
                />
            ))}
            <input
                type="text"
                placeholder={`Enter answer ${index + 1}`}
                className="input input-bordered w-full max-w-xs mb-2"
                value={answer}
                onChange={handleAnswerChange}
                required
            />
        </div>
    );
};

export default QuestionInput;
