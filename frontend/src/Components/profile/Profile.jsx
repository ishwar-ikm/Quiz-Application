import React, { useEffect, useState } from 'react'
import QuizTaken from './QuizTaken';

const Profile = ({ setNav }) => {

    useEffect(() => {
        setNav("profile");
    }, []);

    return (
        <div className='bg-[#faf9fe] p-10 lg:px-[100px] flex-1 min-h-screen'>
            <div className='w-full mx-auto flex flex-col gap-6'>
                <h1 className='text-center text-slate-500 text-4xl font-bold'>Profile</h1>
                <div className="overflow-x-auto">
                    <table className="table text-lg">
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>ikm</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>Ishwar Mishra</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h1 className='text-2xl underline mb-4'>Quizes Taken</h1>
                    {Array(3).fill(null).map(() => {
                        return <QuizTaken />
                    })}
                </div>
                <div>
                    <h1 className='text-2xl underline mb-4'>Quizes Created</h1>
                    {Array(3).fill(null).map(() => {
                        return <QuizTaken />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Profile
