import React,{useEffect,useState} from 'react'
import EventCard from '../components/EventCard';

export default function PastEvents() {
    const [upcomingEvent,setUpcomingEvent]=useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const fetchEvents =  async() => {
        try {
          const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/public/get-past-events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentPage }) 
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch events');
          }
          const data = await response.json();
          setUpcomingEvent(data.upcomingEvents);
          setTotalPages(data.totalPages);
    
        } catch (error) {
          console.error('Error fetching events:', error);
          return null;
        }
      }
    useEffect(()=>{
        fetchEvents();
      },[currentPage])
    return (
        <div className="h-screen overflow-hidden relative p-5 bg-gray-50">
    <div className="h-full w-full overflow-y-auto flex flex-col">

    <div><h1 className="text-2xl font-semibold mb-4">Past Events</h1></div>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full place-items-center'>
        {upcomingEvent && upcomingEvent.length > 0 ? (
                upcomingEvent.map((info, index) => <EventCard value={info} key={index} />)
        ) : (
        <p>No past events</p>
      )}
    </div>
    <div className="flex justify-center mt-4 space-x-2 ">
      {Array(totalPages).fill().map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index+1)}
          className={`px-3 py-1 border rounded ${
            currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  </div>
  </div>
  )
}
