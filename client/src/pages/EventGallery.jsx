import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

export default function EventGallery() {
  const { id } = useParams();
  const [eventData, setEventData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);

  // Fetch event data
  const fetchEventData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/public/get-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      setEventData(data.event);
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  // Handle file selection and compress them
  const handleFileChange = async (e) => {
    const selectedFiles = e.target.files;
    const compressedFiles = [];

    // Compress each selected file
    for (let i = 0; i < selectedFiles.length; i++) {
      try {
        const file = selectedFiles[i];

        // Define compression options (you can adjust these as needed)
        const options = {
          maxSizeMB: 1, // Limit file size to 1MB
          maxWidthOrHeight: 800, // Set max width or height
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        compressedFiles.push(compressedFile);
      } catch (error) {
        console.error('Error compressing file:', error);
      }
    }

   
    setFiles(compressedFiles);
  };


  const handleFileUpload = async (e) => {
    e.preventDefault(); 

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]); 
    }
    formData.append('eventId', id); 
    try {
      const response = await fetch('http://localhost:5000/api/admin/add-gallery-img', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert('Images uploaded successfully!');
        setIsModalOpen(false); 
      } else {
        alert('Failed to upload images.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [id]);

  return (
    <div className="relative">
      {eventData ? (
        <div className="w-full flex flex-col items-center text-white min-h-screen">
          <div
            className="w-full h-[60vh] bg-cover bg-center relative flex items-center justify-center text-center"
            style={{ backgroundImage: `url(${eventData.banner})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 w-full flex justify-center">
              <h1 className="text-7xl font-bold mb-6 w-[90%] break-words">
                {eventData.name}
              </h1>
            </div>
          </div>

          <div className="w-full py-16 flex justify-center">
            <div className="w-[80%] lg:w-[60%]">
              <p className="text-lg font-medium mb-10">{eventData.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}

      <button
        className="absolute bottom-5 right-5 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Upload memories
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 p-2">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Upload Images to Gallery</h2>
            <form onSubmit={handleFileUpload}>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="mb-4"
              />
              <br/>
              <div className="flex justify-end space-x-3 pt-4">
              <button
              className=" text-black bg-gray-300 rounded-md hover:bg-gray-400 px-4 py-2"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
              <button
                type="submit"
                className="px-4 py-2  text-white  bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Upload
              </button>
            
            </div>
            </form>
           
          </div>
        </div>
      )}
    </div>
  );
}
