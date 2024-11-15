import React from 'react'
import {Link} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function EventCard(Props) {
  return (
    <Link
      to={`/admin/event-gallary/${Props.value._id}`}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform max-w-[400px]"
    >
      <div className="relative max-w-[400px] h-[300px]  rounded-lg overflow-hidden bg-gray-200">
        <LazyLoadImage
          src={Props.value.banner}
          alt={Props.value.name}
          effect="blur"
          className="group-hover:scale-110 transition-transform duration-500 ease-in-out w-[400px] object-cover h-[300px]  "
          
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full px-4 py-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:h-40">
        <h3 className="text-2xl font-bold mb-1">{Props.value.name}</h3>
        <h2 className="text-center text-sm hidden group-hover:block">{Props.value.intro}</h2>
      </div>
    </Link>
  )
}
