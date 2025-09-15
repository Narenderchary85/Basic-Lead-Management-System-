import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Signup from './components/SignUp'
import Login from './components/Login'
import { Route, Routes } from 'react-router'
import Leads from './components/Leads'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/leads' element={<Leads/>}/>
      </Routes>
    </>
  )
}

export default App
