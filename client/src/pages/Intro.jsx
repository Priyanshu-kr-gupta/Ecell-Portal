import React from 'react'
import {Link} from 'react-router-dom'
export default function Intro() {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        
    <div className="flex items-center flex-col justify-center text-center">
        <h2 className="text-7xl font-bold mb-4 font-serif">E-Cell</h2>
        <p className="text-lg mb-6">Your gateway to entrepreneurship and innovation.</p>
    </div>
  <div>
    
<Link to={"/login"}>login </Link>
<Link to={"/register"}> signup</Link>
  </div>

</div>

  )
}
