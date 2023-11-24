import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from '../SignIn/SignIn'
import Dashboard from '../Dashboard/Dashboard'
const AppRouter = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/Dashboard/*' element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRouter