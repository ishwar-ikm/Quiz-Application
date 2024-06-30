import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import TakeQuiz from './Components/take quiz/TakeQuiz'
import { Navigate, Route, Routes } from 'react-router-dom'
import QuizPage from './Components/take quiz/QuizPage'
import Questions from './Components/take quiz/Questions'
import Feedback from './Components/take quiz/Feedback'
import CreateQuiz from './Components/quiz creation/CreateQuiz'
import Profile from './Components/profile/Profile'
import Login from './Components/auth/Login'
import Signup from './Components/auth/Signup'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './Components/skeletons/LoadingSpinner'

function App() {
  const [nav, setNav] = useState("home");

  const {data:authUser, isLoading} = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/getme");
        const data = await res.json();

        if(data.error) return null;

        if(!res.ok){
          throw new Error(data.error || "Something went wrong");
        }

        console.log(data);
        return data;
      } catch (error) {
        throw error;
      }
    },
    retry: false
  });

  if(isLoading){
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        <LoadingSpinner size='lg'/>
      </div>
    )
  }

  return (
    <div className='flex'>
      {authUser && <Sidebar nav={nav}/>}
      
      <Routes>
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={"/"} />} />
        <Route path="/" element={authUser ? <TakeQuiz  setNav={setNav}/> : <Navigate to={"/login"} />}/>
        <Route path="/profile" element={authUser ? <Profile  setNav={setNav}/> : <Navigate to={"/login"} />}/>
        {/* <Route path="/favorites" element={<Favorites setNav={setNav}/>} /> */}
      </Routes>

      {/* <Questions /> */}
      {/* <Feedback /> */}
      {/* <TakeQuiz  setNav={setNav}/> */}
      {/* <CreateQuiz  setNav={setNav}/> */}
      {/* <Profile setNav={setNav}/> */}
      <Toaster />
    </div>
  )
}

export default App
