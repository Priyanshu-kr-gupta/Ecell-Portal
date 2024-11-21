import React, { useState }  from 'react'
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import { FaTrashAlt } from 'react-icons/fa'; 
import { useAuth } from '../context/AuthContext';

export default function EcellFormCard({title,formId,path}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { userRole } = useAuth();
  return (
    <>
    <div className='text-white min-h-[150px] relative font-semibold cursor-pointer   rounded-lg p-4 shadow-md bg-[#222E3C]'>
            <Link 
              to={`${path}/${formId}`}
              className="w-full h-full flex flex-col items-center justify-center border-blue-400 border-2"
            >
            <h2 className="text-xl font-bold mb-2">{title || 'Untitled Form'}</h2>
            
                </Link>
                {
        userRole==="Admin"?
            <button
                    onClick={() => setShowConfirm(true)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none"
                    >
                <FaTrashAlt className="w-3 h-3" />
                </button>:
                <p
                className="absolute top-[-10%] right-[-5%] text-blue-400 p-2 animate-pulse"
                >Live
            </p>
          }
   
            
    </div>
    {showConfirm && 
        <ConfirmationModal modelName="EcellForm" id={formId} name={title} imgUrl={''} onClose={()=>{setShowConfirm(false)}}/>}
  </>
  )
}
