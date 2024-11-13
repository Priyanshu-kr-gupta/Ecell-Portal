import React from 'react'
import {Link} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function EventCard(Props) {
  return (
    <Link  to={`/admin/event-gallary/${Props.value._id}`} className="group relative overflow-hidden rounded-lg shadow-lg">
      
    <div className="relative w-full h-[300px]">
      <LazyLoadImage
        src={Props.value.banner} 
        alt={Props.value.name} 
        effect="blur"
        className="w-[400px] h-[300px] z-10 block object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 flex flex-col items-center justify-center py-4 transition-all duration-500 group-hover:h-48 text-white">
      <h3 className="text-2xl font-bold">{Props.value.name}</h3>
      <h2 className='text-center text-sm hidden group-hover:block'>{Props.value.intro}</h2>
    </div>
  </Link>
  )
}
