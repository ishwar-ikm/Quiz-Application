import React from 'react'
import { Link } from 'react-router-dom'
import { TbBulb } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { SlLogout } from "react-icons/sl";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoadingSpinner from './skeletons/LoadingSpinner';

const LargeScreenSideBar = ({ nav, logout, isPending, isLoading }) => {
    return (
        <div className='p-3 md:p-10 border-r-2 w-24 md:w-64 min-h-screen hidden sm:block'>
            <div className='flex flex-col gap-20 sticky top-10 left-0'>
                <div className="w-full">
                    <img src="/logo.jpg" alt="" />
                </div>

                <ul className='flex flex-col items-center md:items-start gap-5'>
                    <Link to={"/"} className='flex gap-1 hover:bg-slate-200 transition duration-200 rounded-md p-2'>
                        <TbBulb size={"30"} className={nav === "take quiz" ? 'fill-amber-500' : ''} />
                        <span className='hidden md:block'>Take Quiz</span>
                    </Link>
                    <Link to={"/create"} className='flex gap-1 hover:bg-slate-200 transition duration-200 rounded-md p-2'>
                        <IoCreate size={"24"} className={nav === "create quiz" ? 'fill-red-500' : ''} />
                        <span className='hidden md:block'>Create Quiz</span>
                    </Link>
                    <Link to={"/profile"} className='flex gap-1 hover:bg-slate-200 transition duration-200 rounded-md p-2'>
                        <ImProfile size={"24"} className={nav === "profile" ? 'fill-violet-900' : ''} />
                        <span className='hidden md:block'>Profile</span>
                    </Link>
                    <div className='flex gap-1 cursor-pointer hover:bg-slate-200 transition duration-200 rounded-md p-2' onClick={logout}>
                        <SlLogout size={"24"} />
                        {isPending ? <LoadingSpinner /> :
                            <span className='hidden md:block'>Logout</span>
                        }
                    </div>
                </ul>
            </div>
        </div>
    )
}

const SmallScreenBottomBar = ({ nav, logout, isPending, isLoading }) => {
    return (
        <div className='flex justify-center p-2 border-t-2 gap-8 w-full z-10 fixed bottom-0 bg-white sm:hidden'>
            <Link to={"/"}  className={nav === "take quiz" ? 'text-yellow-600 flex gap-1' : 'flex gap-1'}>
                <span>Take Quiz</span>
            </Link>
            <Link to={"/create"}  className={nav === "create quiz" ? 'text-yellow-600 flex gap-1' : 'flex gap-1'}>
                <span>Create Quiz</span>
            </Link>
            <Link to={"/profile"} className={nav === "profile" ? 'text-yellow-600 flex gap-1' : 'flex gap-1'}>
                <span>Profile</span>
            </Link>
            <div className='flex gap-1 cursor-pointer' onClick={logout}>
                {(isPending || isLoading) ? <LoadingSpinner /> : <span>Logout</span>}
            </div>
        </div>
    )
}

const Sidebar = ({ nav }) => {

    const queryClient = useQueryClient();

    const { mutate: logout, isPending, isLoading } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/api/auth/logout", {
                    method: "POST",
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
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return (
        <>
            <LargeScreenSideBar nav={nav} logout={logout} isPending={isPending} isLoading={isLoading} />
            <SmallScreenBottomBar nav={nav} logout={logout} isPending={isPending} isLoading={isLoading} />
        </>
    )
}

export default Sidebar
