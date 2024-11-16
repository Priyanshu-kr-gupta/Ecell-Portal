import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaTrashAlt } from 'react-icons/fa'; // React icon for trash
import 'react-lazy-load-image-component/src/effects/blur.css';
import ConfirmationModal from './ConfirmationModal';
import { useAuth } from '../context/AuthContext';

export default function EventCard(Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { userRole } = useAuth();
 

  return (
    <>
    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform max-w-[400px]">
    <Link
      to={`/${userRole}/event-gallary/${Props.value._id}`}
      className="relative max-w-[400px] h-[300px] rounded-lg overflow-hidden"
      >
      <LazyLoadImage
        src={Props.value.banner}
        alt={Props.value.name}
        effect="blur"
        className="group-hover:scale-110 transition-transform duration-500 ease-in-out w-[400px] object-cover h-[300px] bg-slate-100"
        />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500"></div>
    </Link>
    {
        userRole==="Admin"?
    <button
      onClick={() => setShowConfirm(true)}
      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none"
      >
      <FaTrashAlt className="w-3 h-3" />
    </button>
    :
    ''
}

    <div className="absolute bottom-0 left-0 w-full px-4 py-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:h-40">
      <h3 className="text-2xl font-bold mb-1">{Props.value.name}</h3>
      <h2 className="text-center text-sm hidden group-hover:block">{Props.value.intro}</h2>
    </div>
  </div>

  {showConfirm && 
        <ConfirmationModal modelName="Event" id={Props.value._id} name={Props.value.name} imgUrl={Props.value.banner} onClose={()=>{setShowConfirm(false)}}/>}
  
  </>
  );
}
