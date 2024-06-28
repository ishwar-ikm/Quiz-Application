import React, { useEffect, useState } from 'react'
import { FaRegClock } from "react-icons/fa";
import QUIZES from '../../Utils/dummy_quiz';
import Question from './Question';

const Questions = () => {

    const [timeLeft, setTimeLeft] = useState(2 * 60);
    // const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
        //  else {
        //     navigate('/feedback');
        // }
    }, [timeLeft]);

    // Format time as minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const questions = QUIZES[5].questions;

    return (
        <div className='bg-[#faf9fe] p-10 lg:px-[100px] flex-1 min-h-screen my-auto'>
            <div className="text-3xl text-orange-700 font-bold bg-red-200 p-3 w-1/3 rounded-md flex justify-center items-center gap-7 mx-auto">
                <FaRegClock /> 
                <h1>{formatTime(timeLeft)}</h1>
            </div>
            <div className='w-full mx-auto flex flex-col gap-6 mt-7'>
                <h1 className='text-2xl font-normal'>Questions</h1>

                {questions.map((question, index) => {
                    return <Question key={index} question={question} index={index+1}/>
                })}
            </div>
            
            <div className='flex justify-center'>
                <a className="btn btn-secondary">Submit</a>
            </div>
        </div>
    )
}

export default Questions
