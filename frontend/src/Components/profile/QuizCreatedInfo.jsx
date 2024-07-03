import React, { useEffect, useState } from 'react';
import { FaRegClock } from "react-icons/fa";
import Question from '../take quiz/Question';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRandomColor } from '../../Utils/random_color';

const QuizCreatedInfo = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [{ bg, border }] = useState(getRandomColor());

  const queryClient = useQueryClient();

  const { data: quizData, isLoading, isRefetching } = useQuery({
    queryKey: ["quizData"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/quiz/createdQuestion/${quizId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log(data.questions);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onError: (error) => {
      console.error(error.message);
      navigate(`/profile`);
    },
    retry: false
  });

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className='flex flex-col flex-1 p-28'>
          <div className="flex w-full flex-col gap-4 mb-7">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          
          <div className="flex w-full flex-col gap-4 mb-7">
            <div className="skeleton h-32 w-full"></div>
            <div className='grid grid-row-4 md:grid-rows-2 md:grid-flow-col gap-3'>
              <div className="skeleton h-4"></div>
              <div className="skeleton h-4"></div>
              <div className="skeleton h-4"></div>
              <div className="skeleton h-4"></div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 mb-7">
            <div className="skeleton h-32 w-full"></div>
            <div className='grid grid-row-4 md:grid-rows-2 md:grid-flow-col gap-3'>
              <div className="skeleton h-4"></div>
              <div className="skeleton h-4"></div>
              <div className="skeleton h-4"></div>
              <div className="skeleton h-4"></div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 mb-7">
            <div className="skeleton h-32 w-full"></div>
            <div className='grid grid-row-4 md:grid-rows-2 md:grid-flow-col gap-3'>
              <div className="skeleton h-4"></div>
              <div className="skeleton h-4"></div>
              <div className="skeleton h-4"></div>
              <div className="skeleton h-4"></div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && !isRefetching &&

        <div className='bg-[#faf9fe] p-10 lg:px-[100px] flex-1 min-h-screen my-auto'>
          <div className={`flex flex-col w-full gap-2 ${bg} border ${border} rounded-md mb-6 p-3`}>
            <div className='flex flex-col md:flex-row justify-between'>
              <h2 className='text-xl font-semibold text-[#04364A] capitalize'>{quizData.title}</h2>
            </div>
            <p>{quizData.description}</p>
            <p className='font-bold'>Topic - {quizData.topic}</p>
            <div className='flex gap-4'>
              <p>Duration - {quizData.time} min</p>
              <p>Number of Questions - {quizData.numberOfQuestions}</p>
            </div>
          </div>
          <div className='w-full mx-auto flex flex-col gap-6 mt-7'>
            <h1 className='text-2xl font-normal'>Questions</h1>
            {quizData.questions?.map((question, index) => {
              return <div key={index} className={`flex flex-col w-full gap-5 ${bg} border ${border} rounded-md mb-6 p-5`}>
                <h3><span className='font-bold'>Q{index + 1}</span> {question.question}</h3>
                <div className='grid grid-row-4 md:grid-rows-2 md:grid-flow-col gap-3'>
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-2 rounded-lg bg-green-300`}
                    >
                      <label className='flex items-center gap-2'>
                        <span>{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
                <label className='flex items-center gap-2'>
                  <span>Answer: {question.answer}</span>
                </label>
              </div>
            })}
          </div>

          {/* <div className='flex justify-center'>
            <button className="btn btn-secondary" onClick={handleSubmit}>Submit</button>
          </div> */}
        </div>

      }
    </>
  );
}

export default QuizCreatedInfo


