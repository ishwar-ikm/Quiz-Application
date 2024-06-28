import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

import QUIZES from '../../Utils/dummy_quiz';
import Quiz from './Quiz';

const TakeQuiz = ({setNav}) => {

    useEffect(() => {
        setNav("take quiz");
    }, []);

    return (
        <div className='bg-[#faf9fe] p-10 lg:px-[100px] flex-1 min-h-screen'>
            <div className='w-full mx-auto'>
                <form className='flex mb-7'>
                    <label className='input shadow-md flex items-center gap-2 w-[85%] m-2'>
                        <Search size={"24"} />
                        <input type="text" className='text-sm md:text-md' placeholder='Find recipes...' />
                    </label>
                    <input type="submit" className='btn btn-light flex flex-1 m-2 text-lg font-normal shadow-md' value="Search"/>
                </form>

                <h1 className='text-4xl mb-8 text-[#31304D] font-semibold'>Recommended Quizes</h1>

                <div>
                    {QUIZES.map((quiz) => {
                        return <Quiz quiz={quiz}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default TakeQuiz
