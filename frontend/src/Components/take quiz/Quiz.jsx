import React, { useState } from 'react'
import { getRandomColor } from '../../Utils/random_color'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Quiz = ({ quiz }) => {

  const [{ bg, border }] = useState(getRandomColor());

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });


  return (
    <>
      <Link to={`/quiz/${quiz._id}`} className={`flex flex-col w-full gap-2 ${bg} border ${border} rounded-md mb-6 p-3 hover:shadow-lg transition duration-300 cursor-pointer`}>
        <div className='flex flex-col md:flex-row justify-between'>
          <h2 className='text-xl font-semibold text-[#04364A] capitalize'>{quiz.title}</h2>
          <p>Created by <span className='font-bold'>{quiz.createdBy.username}</span></p>
        </div>
        <p>{quiz.description}</p>
        <p className='font-bold'>Topic - {quiz.topic}</p>
        <div className='flex gap-4'>
          <p>Duration - {quiz.time} min</p>
          <p>Number of Questions - {quiz.numberOfQuestions}</p>
        </div>
      </Link>
    </>
  )
}

export default Quiz
