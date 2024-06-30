import React from 'react'
import { getRandomColor } from '../../Utils/random_color';
import { Link } from 'react-router-dom';

const QuizTaken = ({quiz, created}) => {
    const { bg, border } = getRandomColor();
    return (
        <Link className={`flex flex-col w-full gap-2 ${bg} border ${border} rounded-md mb-6 p-3 hover:shadow-lg transition duration-300 cursor-pointer`}>
            <div className='flex justify-between'>
                <h2 className='text-xl font-semibold text-[#04364A] capitalize'>{quiz.title}</h2>
                {!created && <p>Created by {quiz.createdBy.username}</p>}
            </div>
            <p className='font-bold'>Topic - {quiz.topic}</p>
        </Link>
    )
}

export default QuizTaken
