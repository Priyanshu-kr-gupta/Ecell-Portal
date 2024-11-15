import React from 'react'
import { AiOutlineLinkedin, } from 'react-icons/ai';
import { MdOutlineEmail } from "react-icons/md";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function TeamCard(Props) {
  return (
    <div
           className="bg-white w-full h-48 md:h-60 lg:h-72 rounded-lg shadow-lg flex relative overflow-hidden group"
           key={Props.member._id}
         >
           <LazyLoadImage
             src={Props.member.image || 'default-profile.jpg'}
             alt={Props.member.name}
             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
           />
         
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
         
           <div className="absolute bottom-0 w-full p-4">
             <div className="text-center md:text-left text-gray-100">
               <h2 className="text-xl font-bold group-hover:scale-105 transition-transform duration-300">
                 {Props.member.name}
               </h2>
               <p className="text-sm text-gray-300">{Props.member.designation}</p>
             </div>
         
             <div className="flex items-center justify-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <a
                 href={Props.member.linkedin}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="mr-4 text-gray-300 hover:text-blue-500"
               >
                 <AiOutlineLinkedin size={28} />
               </a>
               <a
                 href={`mailto:${Props.member.email}`}
                 className="text-gray-300 hover:text-red-400"
               >
                 <MdOutlineEmail size={28} />
               </a>
             </div>
           </div>
         </div>
  )
}