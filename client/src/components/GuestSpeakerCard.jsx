import React,{useState} from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function GuestSpeakerCard(Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  return (
   <>
    <div
    
    className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
    >
    <a
      href={Props.speaker.linkedin} // Link to LinkedIn
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden rounded-lg mb-4 cursor-pointer"
      >
      <LazyLoadImage
        src={Props.speaker.avatar}
        alt={Props.speaker.name}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
    </a>
    <h2 className="text-xl font-semibold text-gray-800 mb-2">
      {Props.speaker.name}
    </h2>
    <p className="text-gray-600 mb-2">{Props.speaker.intro}</p>
    <div className="text-gray-400 text-sm">{Props.speaker.position}</div>
  </div>
  {showConfirm && 
        <ConfirmationModal modelName="Event" id={Props.value._id} name={Props.value.name} imgUrl={Props.value.banner} onClose={()=>{setShowConfirm(false)}}/>}
        </>
  )
}
