import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Signup = () => {

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='h-screen w-screen flex justify-center items-center bg-sky-100 p-2'>
            <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
                <div className='w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding'>
                    <h1 className='text-3xl font-semibold text-red-300 text-center'>
                        Signup <span className='text-blue-400 font-bold'>Quiz</span>
                    </h1>

                    <form>
                        <div>
                            <label className='label p-2'><span className='text-base label-text'>Name</span></label>
                            <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className='label p-2'><span className='text-base label-text'>Username</span></label>
                            <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>

                        <div className='relative'>
                            <label className='label p-2'><span className='text-base label-text'>Password</span></label>
                            <input type={showPassword ? "text" : "password"} placeholder='Enter password' className='w-full input input-bordered h-10'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className='absolute end-2 top-2/3 cursor-pointer' onClick={e => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>

                        </div>

                        <div className='relative'>
                            <label className='label p-2'><span className='text-base label-text'>Confirm Password</span></label>
                            <input type="password" placeholder='Confirm password' className='w-full input input-bordered h-10'
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <a href="/signup" className='text-sm hover:underline hover:text-blue-600 mt-3 inline-block'>Already have an account?</a>

                        <div>
                            <button type='submit' className='btn btn-block btn-sm mt-2'>
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
