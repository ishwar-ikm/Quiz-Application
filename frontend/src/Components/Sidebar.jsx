import React from 'react'
import { Link } from 'react-router-dom'
import { TbBulb } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { SlLogout } from "react-icons/sl";

const LargeScreenSideBar = ({ nav }) => {
    return (
        <div className='p-3 md:p-10 border-r-2 w-24 md:w-64 min-h-screen hidden sm:block'>
            <div className='flex flex-col gap-20 sticky top-10 left-0'>
                <div className="w-full">
                    <img src="/logo.jpg" alt="" />
                </div>

                <ul className='flex flex-col items-center md:items-start gap-8'>
                    <Link to={""} className='flex gap-1'>
                        <TbBulb size={"30"} className={nav === "take quiz" ? 'fill-amber-500' : ''} />
                        <span className='hidden md:block'>Take Quiz</span>
                    </Link>
                    <Link to={""} className='flex gap-1'>
                        <IoCreate size={"24"} className={nav === "create quiz" ? 'fill-red-500' : ''} />
                        <span className='hidden md:block'>Create Quiz</span>
                    </Link>
                    <Link to={""} className='flex gap-1'>
                        <ImProfile size={"24"} className={nav === "profile" ? 'fill-violet-900' : ''} />
                        <span className='hidden md:block'>Profile</span>
                    </Link>
                    <Link to={""} className='flex gap-1'>
                        <SlLogout size={"24"}/>
                        <span className='hidden md:block'>Logout</span>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

const SmallScreenBottomBar = ({ nav }) => {
    return (
        <div className='flex justify-center p-2 border-t-2 gap-10 w-full z-10 fixed bottom-0 bg-white sm:hidden'>
            <Link to={"/"} className='flex gap-1'>
                <span>Take Quiz</span>
            </Link>
            <Link to={"/"} className='flex gap-1'>
                <span>Create Quiz</span>
            </Link>
            <Link to={"/"} className='flex gap-1'>
                <span>Profile</span>
            </Link>
            <Link to={"/"} className='flex gap-1'>
                <span>Logout</span>
            </Link>
        </div>
    )
}

const Sidebar = ({ nav }) => {
    return (
        <>
            <LargeScreenSideBar nav={nav} />
            <SmallScreenBottomBar nav={nav} />
        </>
    )
}

export default Sidebar
