import React, { useEffect, useState } from 'react';
import { FaRegClock } from "react-icons/fa";
import Question from './Question';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../skeletons/LoadingSpinner';

const Questions = () => {
    const [timeLeft, setTimeLeft] = useState(600);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate();
    const { quizId } = useParams();

    const queryClient = useQueryClient();

    const { data: quizData, isLoading } = useQuery({
        queryKey: ["questions"],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/quiz/questions/${quizId}`);
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
        onSuccess: async (data) => {
            console.log(data);
            setQuestions(data.questions);
            setTimeLeft(data.time * 60);
            setAnswers(Array(data.questions.length).fill(''));
        },
        onError: (error) => {
            console.error(error.message);
            navigate(`/feedback/${quizId}`);
        },
        retry: false
    });

    const { mutate: postAnswers } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/quiz/feedback/${quizId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userAnswers: answers })
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                return data;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            navigate(`/feedback/${quizData._id}`);
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            navigate("/profile");
        }
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                const remaining = prevTime - 1;

                if (remaining <= 0) {
                    clearInterval(timer);
                    handleSubmit();
                }

                return remaining;
            });
        }, 1000);

        // Cleanup the timer
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            const confirmationMessage = 'Quiz will be auto submitted if you leave this page, do you still wish to leave?';

            event.returnValue = confirmationMessage;
            handleSubmit();
            return confirmationMessage;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // Format time as minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleOptionClick = (index, answer) => {
        console.log(index);
        setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[index] = answer;
            return newAnswers;
        });
    };

    const handleSubmit = () => {
        postAnswers();
        navigate(`/feedback/${quizId}`);
    };

    return (
        <>
            {isLoading && (
                <div className='flex flex-col flex-1 p-28'>
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

            {!isLoading &&
                <div className='bg-[#faf9fe] p-10 lg:px-[100px] flex-1 min-h-screen my-auto'>
                    <div className="text-3xl text-orange-700 font-bold bg-red-200 p-3 w-1/3 rounded-md flex justify-center items-center gap-7 mx-auto">
                        <FaRegClock />
                        <h1>{formatTime(timeLeft)}</h1>
                    </div>
                    <div className='w-full mx-auto flex flex-col gap-6 mt-7'>
                        <h1 className='text-2xl font-normal'>Questions</h1>

                        {questions?.map((question, index) => {
                            return <Question key={index} question={question} index={index} handleOptionClick={handleOptionClick} />
                        })}
                    </div>

                    <div className='flex justify-center'>
                        <button className="btn btn-secondary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            }
        </>
    );
}

export default Questions;
