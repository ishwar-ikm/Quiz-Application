import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

import Quiz from './Quiz';
import { useQuery } from '@tanstack/react-query';

const TakeQuiz = ({ setNav }) => {

    const { data: QUIZZES, isLoading } = useQuery({
        queryKey: ["quizzes"],
        queryFn: async () => {
            const res = await fetch("/api/quiz/allQuiz");
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            console.log(data);
            return data;
        }
    })

    useEffect(() => {
        setNav("take quiz");
    }, []);

    return (
        <div className='bg-[#faf9fe] p-10 lg:px-[100px] flex-1 min-h-screen'>
            <div className='w-full mx-auto'>
                <form className='flex mb-7'>
                    <label className='input shadow-md flex items-center gap-2 w-[85%] m-2'>
                        <Search size={"24"} />
                        <input type="text" className='text-sm md:text-md' placeholder='Find quiz...' />
                    </label>
                    <input type="submit" className='btn btn-light flex flex-1 m-2 text-lg font-normal shadow-md' value="Search" />
                </form>

                <h1 className='text-4xl mb-8 text-[#31304D] font-semibold'>Recommended Quizzes</h1>

                {isLoading && (
                    <>
                        <div className="flex w-full flex-col gap-4 mb-7">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                        <div className="flex w-full flex-col gap-4 mb-7">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                        <div className="flex w-full flex-col gap-4 mb-7">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                        <div className="flex w-full flex-col gap-4 mb-7">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    </>
                )}

                {!isLoading && QUIZZES?.length === 0 && (
                    <div>
                        <p className='text-center text-lg'>No quizzes available</p>
                    </div>
                )}

                {!isLoading && QUIZZES?.length > 0 && (
                    <div>
                        {QUIZZES.map((quiz) => {
                            return <Quiz key={quiz._id} quiz={quiz} />
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TakeQuiz
