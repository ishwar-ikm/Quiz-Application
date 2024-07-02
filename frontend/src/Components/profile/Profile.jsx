import React, { useEffect, useState } from 'react'
import QuizTaken from './QuizTaken';
import { useQuery } from '@tanstack/react-query';

const Profile = ({ setNav }) => {

    const {data: authUser} = useQuery({queryKey: ["authUser"]});

    useEffect(() => {
        setNav("profile");
    }, []);

    return (
        <div className='bg-[#faf9fe] p-3 lg:px-[100px] flex-1 min-h-screen'>
            <div className='w-full mx-auto flex flex-col gap-6'>
                <h1 className='text-center text-slate-500 text-4xl font-bold'>Profile</h1>
                <div className="overflow-x-auto">
                    <table className="table text-lg">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>{authUser.username}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{authUser.name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h1 className='text-2xl underline mb-4'>Quizes Taken</h1>
                    {authUser.quizTaken.length === 0 && <p>You have not taken any quiz yet</p>}
                    {authUser.quizTaken.map((quiz) => {
                        return <QuizTaken key={quiz._id} quiz={quiz}/>
                    })}
                </div>
                <div>
                    <h1 className='text-2xl underline mb-4'>Quizes Created</h1>
                    {authUser.quizCreated.length === 0 && <p>You have not created any quiz yet</p>}
                    {authUser.quizCreated.map((quiz) => {
                        return <QuizTaken key={quiz._id} quiz={quiz} created={true}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profile
