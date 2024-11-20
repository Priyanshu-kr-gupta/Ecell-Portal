import React from 'react';
import nitLogo from "../assets/nitjsr.png";
import Logo from "../assets/white_logo.png"
export default function Header() {
  return (
    <div className="h-[10vh]  absolute right-5 z-20">
        <img src={Logo} alt="Logo" className="h-full"/>
    </div>
  );
}
