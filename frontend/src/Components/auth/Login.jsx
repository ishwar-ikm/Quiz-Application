import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import LoadingSpinner from '../skeletons/LoadingSpinner';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const queryClient = useQueryClient();

    const {mutate: login, isPending, isLoading} = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({username, password})
                });

                const data = await res.json();

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
    });

    const handleLogin = (e) => {
        e.preventDefault();
        login();
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-stone-50'>
            <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
                <div className='w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding'>
                    <h1 className='text-3xl font-semibold text-red-300 text-center'>
                        Login <span className='text-blue-400 font-bold'>Quiz</span>
                    </h1>
                    <h1 className='text-xl font-normal text-slate-500 text-center'>
                        Welcome back {username}
                    </h1>

                    <form>
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

                        <a href="/signup" className='text-sm hover:underline hover:text-blue-600 mt-3 inline-block'>Don't have an account?</a>

                        <div>
                            <button type='submit' className='btn btn-block btn-sm mt-2' onClick={handleLogin} >
                            {(isPending || isLoading) ? <LoadingSpinner /> : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login