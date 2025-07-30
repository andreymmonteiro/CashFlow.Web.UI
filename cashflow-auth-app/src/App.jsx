import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/auth/RegisterForm';
import './index.css';

export default function App(){
    return (
        <Router>
            <Routes>
                <Route path='/register' element={<RegisterForm onSwitch={() => {}} onMessage={() => {}} /> }/>
                <Route path="*" element={<Navigate to="/register" replace />} />
            </Routes>
        </Router>
    );
}