import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import TakeQuiz from './Components/take quiz/TakeQuiz'
import { Route, Routes } from 'react-router-dom'
import QuizPage from './Components/take quiz/QuizPage'
import Questions from './Components/take quiz/Questions'
import Feedback from './Components/take quiz/Feedback'
import CreateQuiz from './Components/quiz creation/CreateQuiz'
import Profile from './Components/profile/Profile'
import Login from './Components/auth/Login'
import Signup from './Components/auth/Signup'

function App() {
  const [nav, setNav] = useState("home");

  return (
    <div className='flex'>
      {/* <Sidebar nav={nav}/> */}
      {/* <Signup /> */}
      <Login />
      {/* 
      <Routes>
        <Route path="/" element={<TakeQuiz  setNav={setNav}/>}/>
        <Route path="/favorites" element={<Favorites setNav={setNav}/>} />
      </Routes> */}
      {/* <Questions /> */}
      {/* <Feedback /> */}
      {/* <TakeQuiz  setNav={setNav}/> */}
      {/* <CreateQuiz  setNav={setNav}/> */}
      {/* <Profile setNav={setNav}/> */}
    </div>
  )
}

export default App
