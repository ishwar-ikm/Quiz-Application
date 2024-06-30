import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../skeletons/LoadingSpinner';

const QuizPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { data: Quiz, isLoading } = useQuery({
        queryKey: ["quiz"],
        queryFn: async () => {
            try {
                console.log(`/api/quiz/oneQuiz/${id}`);
                const res = await fetch(`/api/quiz/oneQuiz/${id}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                console.log(data);
                return data;
            } catch (error) {
                toast.error(error.message);
            }
        },
    })

    return (
        <>
            {isLoading && (
                <div className='h-screen w-full flex justify-center items-center'>
                    <LoadingSpinner size='lg' />
                </div>
            )}

            {!isLoading && (
                <div className='bg-[#faf9fe] p-10 lg:px-[100px] flex-1 min-h-screen my-auto'>
                    <div className='w-full mx-auto flex flex-col gap-6'>
                        <h1 className='text-5xl font-bold capitalize text-[#04364A]'>{Quiz?.title}</h1>
                        <p className='text-lg font-medium'>{Quiz?.description}</p>
                        <div className='lg:flex justify-around font-bold text-lg'>
                            <p className='text-[#C80036]'>Quiz Duaration - {Quiz?.time} min</p>
                            <p className='text-[#0C1844]'>Topic - {Quiz?.topic}</p>
                            <p className='text-[#995829]'>Number of questions - {Quiz?.numberOfQuestions}</p>
                        </div>

                        <div className='flex flex-col lg:flex-row lg:justify-around mt-8 gap-6'>
                            <a className="btn btn-accent" onClick={() => navigate(-1)}>
                                <FaArrowLeftLong /> Go back
                            </a>
                            <a className="btn btn-secondary">Take Quiz</a>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default QuizPage
