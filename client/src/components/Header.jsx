import React from 'react'
import nitLogo from "../assets/nitjsr.png"
import Logo from "../assets/logo_black.png"
export default function Header() {
  return (
    <div className='w-full h-[10vh] flex justify-end pr-2'>
        <img src={nitLogo} alt=""  className='h-full'/>
    </div>
  )
}
