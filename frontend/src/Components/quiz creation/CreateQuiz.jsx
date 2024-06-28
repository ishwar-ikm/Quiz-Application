import React, { useEffect, useState } from 'react';
import QuestionInput from './QuestionInput';

const CreateQuiz = ({ setNav }) => {
    const [numQuestions, setNumQuestions] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [quizTitle, setQuizTitle] = useState("");
    const [quizTopic, setQuizTopic] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [quizDuration, setQuizDuration] = useState("");

    useEffect(() => {
        setNav("create quiz");
    }, [setNav]);

    const handleNumQuestionsChange = (num) => {
        setNumQuestions(num);
        setQuestions(Array(num).fill({ question: '', options: ['', '', '', ''], answer: '' }));
    };

    const handleQuestionChange = (index, value) => {
        setQuestions(prevQuestions =>
            prevQuestions.map((q, i) => i === index ? { ...q, question: value } : q)
        );
    };

    const handleAnswerChange = (index, value) => {
        setQuestions(prevQuestions =>
            prevQuestions.map((q, i) => i === index ? { ...q, answer: value } : q)
        );
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        setQuestions(prevQuestions =>
            prevQuestions.map((q, i) =>
                i === questionIndex
                    ? {
                        ...q,
                        options: q.options.map((opt, idx) =>
                            idx === optionIndex ? value : opt
                        ),
                    }
                    : q
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const quizData = {
            title: quizTitle,
            topic: quizTopic,
            description: quizDescription,
            time: quizDuration,
            questions,
        };
        console.log('Quiz Data:', quizData);
    };

    return (
        <div className='bg-[#faf9fe] p-10 lg:px-[100px] flex-1 min-h-screen my-auto'>
            <div className='flex flex-col gap-3'>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-lg">Title of the quiz</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Capital of Indian states"
                            className="input input-bordered w-full max-w-xs"
                            required
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-lg">Topic of the quiz</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Geography"
                            className="input input-bordered w-full max-w-xs"
                            required
                            value={quizTopic}
                            onChange={(e) => setQuizTopic(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-lg">Description of the quiz</span>
                        </div>
                        <textarea
                            rows="3"
                            placeholder="Answer capitals of Indian states"
                            className="textarea textarea-bordered w-full max-w-xs"
                            required
                            value={quizDescription}
                            onChange={(e) => setQuizDescription(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-lg">Duration of quiz</span>
                        </div>
                        <input
                            type="number"
                            placeholder="Duration in minutes"
                            className="input input-bordered w-full max-w-xs"
                            required
                            value={quizDuration}
                            onChange={(e) => setQuizDuration(e.target.value)}
                        />
                    </label>

                    <div className="flex justify-start">
                        <div className="dropdown dropdown-right dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1">Number of questions</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                {[...Array(10).keys()].map((num) => (
                                    <li key={num} value={num + 1} onClick={() => handleNumQuestionsChange(num + 1)}>
                                        <a>{num + 1}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {questions.map((question, index) => (
                        <QuestionInput
                            key={index}
                            index={index}
                            question={question.question}
                            options={question.options}
                            answer={question.answer}
                            onQuestionChange={handleQuestionChange}
                            onOptionChange={handleOptionChange}
                            onAnswerChange={handleAnswerChange}
                        />
                    ))}

                    <div className="flex justify-start">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateQuiz;
