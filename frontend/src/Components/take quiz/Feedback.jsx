import React from 'react'
import { getRandomColor } from '../../Utils/random_color'

const Feedback = () => {
    const { bg, border } = getRandomColor();
    return (
        <div className='bg-[#faf9fe] p-10 lg:px-[100px] flex-1 min-h-screen my-auto'>
            <div className='w-full mx-auto flex flex-col gap-6 justify-center items-center'>
                <h1 className='text-green-500 text-5xl font-mono underline'>Feedback</h1>
                <div className={`${bg} border ${border} flex flex-col gap-9 px-2 md:px-20 py-6 rounded-md w-full`}>
                    <h1 className='text-4xl text-center text-emerald-600'>You did great</h1>
                    <h1 className='text-6xl text-center text-slate-500'>Your Score - 90%</h1>
                    <div className='text-xl'>
                        <div className='flex justify-between'>
                            <p>Total number of questions</p>
                            <p>7</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Number of attempted questions</p>
                            <p>7</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Number of correct answers</p>
                            <p>7</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Number of wrong answers</p>
                            <p>7</p>
                        </div>
                        <div className='flex justify-between'>
                            <p>Score</p>
                            <p>7</p>
                        </div>
                    </div>
                </div>

                <a className="btn btn-accent">Go Home</a>
            </div>
        </div>
    )
}

export default Feedback
