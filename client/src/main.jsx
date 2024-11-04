import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from "./context/AuthContext" 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from './pages/Intro.jsx'
import Login from "./pages/Login.jsx"
import SignUp from "./pages/SignUp.jsx"
createRoot(document.getElementById('root')).render(
   <StrictMode>
     <BrowserRouter>
     <AuthProvider>
       <Routes>
         <Route path="/" element={<Intro />}></Route>
         <Route path="/login" element={<Login />}></Route>
         <Route path="/register" element={<SignUp />}></Route>
       </Routes>
     </AuthProvider>
     </BrowserRouter>
  </StrictMode>,
)
