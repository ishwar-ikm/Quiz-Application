import React from 'react'
import { getRandomColor } from '../../Utils/random_color'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../skeletons/LoadingSpinner';

const Feedback = () => {

    const { quizId } = useParams();

    const navigate = useNavigate();

    const { data: feedback, isLoading } = useQuery({
        queryKey: ["feedback"],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/quiz/feedback/${quizId}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                console.log(data);
                return data;
            } catch (error) {
                throw error;
            }
        },
        onError: () => {
            navigate("/profile");
        },
        retry: false,
    })

    const getRemarks = (scorePercentage) => {
        if (scorePercentage >= 90) {
            return "Excellent work, you nailed it!";
        } else if (scorePercentage >= 80) {
            return "Well done, you performed admirably!";
        } else if (scorePercentage >= 70) {
            return "Good job, you're on the right track!";
        } else if (scorePercentage >= 60) {
            return "Nice effort, keep pushing forward!";
        } else if (scorePercentage >= 50) {
            return "You're making progress, keep it up!";
        } else if (scorePercentage >= 40) {
            return "Keep practicing, you're improving!";
        } else {
            return "Keep working hard, you'll get there!";
        }
    }

    const { bg, border } = getRandomColor();
    return (
        <>
            {isLoading &&
                <div className='h-screen w-full flex justify-center items-center'>
                    <LoadingSpinner size={'lg'} />
                </div>
            }

            {!isLoading &&
                <div className='bg-[#faf9fe] p-10 lg:px-[100px] flex-1 min-h-screen my-auto'>
                    <div className='w-full mx-auto flex flex-col gap-6 justify-center items-center'>
                        <h1 className='text-green-500 text-5xl font-mono underline'>Feedback</h1>
                        <div className={`${bg} border ${border} flex flex-col gap-9 px-2 md:px-20 py-6 rounded-md w-full`}>
                            <h1 className='text-4xl text-center text-emerald-600'>{getRemarks(feedback.feedBack?.score)}</h1>
                            <h1 className='text-6xl text-center text-slate-500'>Your Score - {feedback.feedBack?.score}%</h1>
                            <div className='text-xl'>
                                <div className='flex justify-between'>
                                    <p>Total number of questions</p>
                                    <p>{feedback.feedBack?.numberOfQuestions}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Number of correct answers</p>
                                    <p>{feedback.feedBack?.questionsSolved}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Number of unattempted questions</p>
                                    <p>{feedback.feedBack?.questionsLeft}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Number of wrong answers</p>
                                    <p>{feedback.feedBack?.questionsWrong}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Score</p>
                                    <p>{feedback.feedBack?.score}%</p>
                                </div>
                            </div>
                        </div>

                        <h1 className='text-green-500 text-5xl font-mono underline mt-10'>Answers</h1>
                        {feedback.questions?.map((question, index) => {
                            return (<div key={question._id} className={`flex flex-col w-full gap-5 ${bg} border ${border} rounded-md mb-6 p-5`}>
                                <h3 className='text-xl'><span className='font-bold'>Q{index + 1}</span> {question.question}</h3>
                                <p className='text-xl'>Answer: <span className='font-bold text-lg'>{question.answer}</span> </p>
                            </div>)
                        })}
                        <a href='/' className="btn btn-accent">Take more quizzes</a>
                    </div>
                </div>
            }
        </>
    )
}

export default Feedback
