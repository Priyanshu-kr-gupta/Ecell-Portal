import React, { useState }  from 'react'
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import { FaTrashAlt } from 'react-icons/fa'; 

export default function EcellFormCard({title,formId}) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
    <div className='text-white min-h-[150px] relative font-semibold cursor-pointer   rounded-lg p-4 shadow-md bg-[#222E3C]'>
            <Link 
              to={`/admin/ecell-forms/post/${formId}`}
              className="w-full h-full flex flex-col items-center justify-center border-blue-400 border-2"
            >
            <h2 className="text-xl font-bold mb-2">{title || 'Untitled Form'}</h2>
            
                </Link>

            <button
                    onClick={() => setShowConfirm(true)}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none"
                    >
                <FaTrashAlt className="w-3 h-3" />
                </button>
   
            
    </div>
    {showConfirm && 
        <ConfirmationModal modelName="EcellForm" id={formId} name={title} imgUrl={''} onClose={()=>{setShowConfirm(false)}}/>}
  </>
  )
}
