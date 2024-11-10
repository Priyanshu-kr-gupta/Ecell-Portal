import React, { useState } from 'react';

export default function ManageEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({
    name: '',
    intro: '',
    description: '',
    bannerImg: '',
    expectedDate: ''
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddEvent = (e) => {
    e.preventDefault();
    console.log('Event Data:', eventData);
    closeModal();
  };

  // Update state based on input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="h-screen overflow-hidden relative p-5 bg-gray-50">
      {/* Events Section */}
      <div className="h-full overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">All Events</h1>
       
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
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 p-2">
            <div className="w-96 bg-white rounded-lg shadow-lg p-6 z-50">
              <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
              <form onSubmit={handleAddEvent} className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">Name:</span>
                  <input
                    type="text"
                    name="name"
                    value={eventData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Event Name"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Intro:</span>
                  <input
                    type="text"
                    name="intro"
                    value={eventData.intro}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Short Introduction"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Description:</span>
                  <textarea
                    name="description"
                    value={eventData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Event Description"
                    rows="3"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Banner Image URL:</span>
                  <input
                    type="text"
                    name="bannerImg"
                    value={eventData.bannerImg}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Image URL"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Expected Date:</span>
                  <input
                    type="date"
                    name="expectedDate"
                    value={eventData.expectedDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </label>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
