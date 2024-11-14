import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineUpload, AiOutlineClose } from "react-icons/ai";
import imageCompression from "browser-image-compression";
import "react-toastify/dist/ReactToastify.css";

export default function EventGallery() {
  const { id } = useParams();
  const [eventData, setEventData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gallery, setGallery] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch event data
  const fetchEventData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/public/get-event",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      setEventData(data.event);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGallery(file);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("eventId", id);

    if (gallery) {
      try {
        const compressedFile = await imageCompression(gallery, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
        formData.append("gallery", compressedFile, compressedFile.name);
        const response = await fetch(
          "http://localhost:5000/api/admin/add-gallery-img",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        if (data.success) {
          toast.success("Images uploaded successfully!");
          setIsModalOpen(false);
          setGallery(null);
        } else {
          toast.error("Failed to upload images.");
        }
      } catch (error) {
        console.error("Image compression failed:", error);
        toast.error("Image compression failed.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [id]);

  return (
    <div className="relative">
      <ToastContainer position="top-center" />
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
              <p className="text-lg font-medium mb-10">
                {eventData.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}

      <button
        className="absolute bottom-5 right-5 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Upload memories
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40 p-4">
          <div className="bg-white p-8 rounded-lg w-[90%] max-w-lg relative">
          
            <h2 className="text-2xl font-bold mb-4 text-center">
              Upload Images to Gallery
            </h2>
            <form onSubmit={handleFileUpload}>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="mb-4"
              />
              <br />
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="text-black bg-gray-300 rounded-md hover:bg-gray-400 px-4 py-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
