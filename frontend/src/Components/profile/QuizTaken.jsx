import React from 'react'
import { getRandomColor } from '../../Utils/random_color';
import { Link } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoadingSpinner from '../skeletons/LoadingSpinner';

const QuizTaken = ({quiz, created}) => {

    const queryClient = useQueryClient();

    const {mutate:deleteQuiz, isPending} = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/quiz/delete/${quiz._id}`, {
                    method: "DELETE",
                });
                const data = await res.data;

                if(!res.ok){
                    throw new Error(data.error || "Something went wrong");
                }

                return data;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["authUser"]});
        },

        onError: (error) => {
            toast.error(error.message);
        }
    })

    const { bg, border } = getRandomColor();
    return (
        <Link className={`flex flex-col w-full gap-2 ${bg} border ${border} rounded-md mb-6 p-3 ${!created ? "cursor-pointer hover:shadow-lg transition duration-300" : "cursor-default"}`}>
            <div className='flex flex-col md:flex-row justify-between'>
                <h2 className='text-xl font-semibold text-[#04364A] capitalize'>{quiz.title}</h2>
                {!created ? <p>Created by <span className='font-bold'>{quiz.createdBy.username}</span></p> : isPending ? <LoadingSpinner /> : <FaTrash className='cursor-pointer' onClick={deleteQuiz}/>}
            </div>
            <p className='font-bold'>Topic - {quiz.topic}</p>
        </Link>
    )
}

export default QuizTaken
