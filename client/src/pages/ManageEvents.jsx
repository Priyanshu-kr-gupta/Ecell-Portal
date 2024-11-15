import React, { useEffect, useState } from 'react';
import imageCompression from 'browser-image-compression';
import EventCard from '../components/EventCard';

export default function ManageEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({
    name: '',
    intro: '',
    description: '',
    expectedDate: ''
  });
  const [upcomingEvent,setUpcomingEvent]=useState();
  const [bannerImgFile, setBannerImgFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', eventData.name);
    formData.append('intro', eventData.intro);
    formData.append('description', eventData.description);
    formData.append('expectedDate', eventData.expectedDate);
    if (bannerImgFile) {
      try {
          const compressedFile = await imageCompression(bannerImgFile, {
          maxSizeMB: 1, 
          maxWidthOrHeight: 1024, 
          useWebWorker: true, 
        });

        formData.append('banner', compressedFile, compressedFile.name);
      } catch (error) {
        console.error('Image compression failed:', error);
      }
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/add-event', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Event created successfully:', data);
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }finally{
      setLoading(false);
      fetchEvents();
    }
    closeModal();
  };


  const fetchEvents =  async() => {
    try {
      const response = await fetch('http://localhost:5000/api/public/get-upcoming-events', {
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBannerImgFile(file);
  };

  useEffect(()=>{
    fetchEvents();
  },[currentPage])

  
  return (
    <div className="h-screen overflow-hidden relative p-5 bg-gray-50">
      {/* Events Section */}
      <div className="h-full w-full overflow-y-auto flex flex-col">

        <div><h1 className="text-2xl font-semibold mb-4">All Events</h1></div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full place-items-center'>
            {upcomingEvent && upcomingEvent.length > 0 ? (
                    upcomingEvent.map((info, index) => <EventCard value={info} key={index} />)
            ) : (
            <p>No upcoming events</p>
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

      {/* Add Event Button */}
      <button
        onClick={openModal}
        className="absolute bottom-5 right-5 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Add Event
      </button>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-40 p-2">
          <div className="w-96 bg-white rounded-lg shadow-lg p-6 z-50">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Add New Event</h2>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <label className="block">
                <span className="text-lg text-gray-700">Name:</span>
                <input
                  type="text"
                  name="name"
                  value={eventData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Event Name"
                />
              </label>
              <label className="block">
                <span className="text-lg text-gray-700">Intro:</span>
                <input
                  type="text"
                  name="intro"
                  value={eventData.intro}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Short Introduction"
                />
              </label>
              <label className="block">
                <span className="text-lg text-gray-700">Description:</span>
                <textarea
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Event Description"
                  rows="3"
                />
              </label>
              <label className="block">
                <span className="text-lg text-gray-700">Banner Image:</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
              </label>
              <label className="block">
                <span className="text-lg text-gray-700">Expected Date:</span>
                <input
                  type="date"
                  name="expectedDate"
                  value={eventData.expectedDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
              </label>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                 { loading ? "Event Saving..." : " Save Event "}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
