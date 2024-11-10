import React, { useState } from 'react';

export default function GuestSpeaker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [speakerData, setSpeakerData] = useState({
    name: '',
    intro: '',
    image: '',
    about: ''
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Dummy function to handle speaker submission
  const handleAddSpeaker = (e) => {
    e.preventDefault();
    console.log('Speaker Data:', speakerData);
    closeModal();
  };

  // Update state based on input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSpeakerData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="h-screen overflow-hidden relative p-5 bg-gray-50">
      {/* Guest Speakers Section */}
      <div className="h-full overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Guest Speakers</h1>
  
      </div>

      {/* Add Speaker Button */}
      <button
        onClick={openModal}
        className="absolute bottom-5 right-5 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Add Guest Speaker
      </button>

      {/* Modal Popup */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 p-2">
            <div className="w-96 bg-white rounded-lg shadow-lg p-6 z-50">
              <h2 className="text-xl font-semibold mb-4">Add New Guest Speaker</h2>
              <form onSubmit={handleAddSpeaker} className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">Name:</span>
                  <input
                    type="text"
                    name="name"
                    value={speakerData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Speaker's Name"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Intro:</span>
                  <input
                    type="text"
                    name="intro"
                    value={speakerData.intro}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Intro of the Speaker"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Image URL:</span>
                  <input
                    type="text"
                    name="image"
                    value={speakerData.image}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Image URL (e.g., sikhargoel.webp)"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">About:</span>
                  <textarea
                    name="about"
                    value={speakerData.about}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Details about the speaker"
                    rows="3"
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
                    Save Speaker
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
