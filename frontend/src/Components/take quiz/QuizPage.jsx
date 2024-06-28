import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";

const QuizPage = () => {

    const Quiz = {
        "id": 20,
        "title": "dolor",
        "description": "duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo",
        "questions": [
            {},
            {}
        ],
        "time": 20,
        "topic": "tristique fusce"
    };

    return (
        <div className='bg-[#faf9fe] p-10 lg:px-[100px] flex-1 min-h-screen my-auto'>
            <div className='w-full mx-auto flex flex-col gap-6'>
                <h1 className='text-5xl font-bold capitalize text-[#04364A]'>{Quiz.title}</h1>
                <p className='text-lg font-medium'>{Quiz.description}</p>
                <div className='lg:flex justify-around font-bold text-lg'>
                    <p className='text-[#C80036]'>Quiz Duaration - {Quiz.time} min</p>
                    <p className='text-[#0C1844]'>Topic - {Quiz.topic}</p>
                    <p className='text-[#995829]'>Number of questions - {Quiz.questions.length}</p>
                </div>

                <div className='flex flex-col lg:flex-row lg:justify-around mt-8 gap-6'>
                    <a className="btn btn-accent">
                        <FaArrowLeftLong /> Go back
                    </a>
                    <a className="btn btn-secondary">Take Quiz</a>
                </div>
            </div>
        </div>
    )
}

export default QuizPage
