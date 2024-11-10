import React from 'react'
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import logo from "../assets/logo_black.png"

export default function Intro() {
  return (
    <>
    <div className="w-full h-[100vh] bg-gradient-to-br from-[#f7f8fa] to-[#eaeef1] flex flex-col items-center ">
        
    <div className="flex items-center flex-col justify-center text-center">
        <img src={logo} alt="" className='h-[200px]'/>

        {/* <h2 className="text-7xl font-bold mb-4 font-serif">E-Cell</h2> */}
        <p className="text-lg mb-6">Your gateway to entrepreneurship and innovation.</p>
    </div>
  <div>
    
{/* <Link to={"/login"} className='px-3 py-2 text-white bg-slate-500 mr-2'>login </Link>
<Link to={"/register"} className='px-3 py-2 text-white bg-slate-500 mr-2'> signup</Link> */}

  </div>
</div>
    </>

  )
}
