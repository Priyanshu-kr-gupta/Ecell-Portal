import React, { useEffect, useState } from "react";

export default function GuestSpeaker() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [speakerData, setSpeakerData] = useState({
    name: "",
    intro: "",
    image: "",
    about: "",
    linkedin: "",
  });
  const[currentPage, setCurrentPage] = useState(1);
  const[totalPages, setTotalPages] = useState(1);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch guest speakers data
  const fetchGuestSpeakers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/public/get-all-guest-speakers",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentPage }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch guest speakers");
      }
      const data = await response.json();
      setSpeakers(data.guestSpeakers);
      setTotalPages(data.totalPages);

    } catch (error) {
      console.error("Error fetching guest speakers:", error);
      setSpeakers([]);
    } finally {
      setLoading(false);
    }
  };

  // Update state based on input field changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    // If there are files, it's the file input; otherwise, it's text input
    if (files) {
      setSpeakerData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setSpeakerData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Dummy function to handle speaker submission
  const handleAddSpeaker = async (e) => {
    e.preventDefault();
    // Create a FormData object to hold the form fields and the image file
    const formData = new FormData();
    formData.append("name", speakerData.name);
    formData.append("intro", speakerData.intro);
    formData.append("about", speakerData.about);
    formData.append("linkedin", speakerData.linkedin);
    formData.append("avatar", speakerData.avatar); // Append the image file
    setLoading(true);
    try {
      // Send the formData to your server
      const response = await fetch(
        "http://localhost:5000/api/admin/add-guest-speaker",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save speaker");
      }
      // console.log("Speaker saved successfully!");
      closeModal();
      fetchGuestSpeakers(); // Re-fetch the speakers to display the updated list
    } catch (error) {
      console.error("Error saving speaker:", error);
    }finally{
      setLoading(false);
      speakerData.name = "";
      speakerData.intro = "";
      speakerData.about = "";
      speakerData.linkedin = "";
    }
  };

  // Fetch guest speakers data on component mount
  useEffect(() => {
    fetchGuestSpeakers();
  }, [currentPage]);
  // console.log(speakers);
  return (
    <div className="h-screen overflow-hidden relative p-5 bg-gray-50">
      {/* Guest Speakers Section */}
      <div className="h-full overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Guest Speakers</h1>

        {/* Guest Speakers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {speakers.length === 0 ? (
            <p className="text-center text-gray-500">
              No guest speakers found.
            </p>
          ) : (
            speakers.map((speaker) => (
              <div
                key={speaker._id}
                className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <a
                  href={speaker.linkedin} // Link to LinkedIn
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-lg mb-4 cursor-pointer"
                >
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                </a>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {speaker.name}
                </h2>
                <p className="text-gray-600 mb-2">{speaker.intro}</p>
                <div className="text-gray-400 text-sm">{speaker.position}</div>
              </div>
            ))
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-40 p-2">
            <div className="w-96 bg-white rounded-lg shadow-lg p-6 z-50">
              <h2 className="text-xl font-semibold mb-4">
                Add New Guest Speaker
              </h2>
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
                  <span className="text-gray-700">LinkedIn:</span>
                  <input
                    type="text"
                    name="linkedin"
                    value={speakerData.linkedin}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="LinkedIn URL"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Avatar:</span>
                  <input
                    type="file"
                    name="avatar"
                    onChange={handleInputChange}
                    className="mt-1 block w-full text-gray-700"
                    accept="image/*"
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
                   {loading ? "Adding..." : "Add Speaker"}
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
