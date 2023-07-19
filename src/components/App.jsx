import React, {useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import Home from "../components/Home/App1"
import Login from "../components/Login/Signin"
import Signup from "../components/Signup/Signup"
import { auth } from '../firebase';
import ProtectedRoute from './ProtectedRoute';
import { UserAuthContextProvider } from '../context/UserAuthContext';



export default function App() {

  return (
    <div className='App'>
    
        <Router>
        <UserAuthContextProvider>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/' element={ 
                  <ProtectedRoute>
                   <Home />
                  </ProtectedRoute>
                  } 
                />
            </Routes>
        </UserAuthContextProvider>
        </Router>
    </div>
  )
}
