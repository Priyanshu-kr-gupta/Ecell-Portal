import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineUpload, AiOutlineClose } from "react-icons/ai";
import imageCompression from "browser-image-compression";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAuth } from '../context/AuthContext';

export default function EventGallery() {
  const { userRole } = useAuth();
  const { id } = useParams();
  const [eventData, setEventData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gallery, setGallery] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const imagesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage,setTotalPage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  // Fetch event data
  const fetchEventData = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL+"/api/public/get-event",
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
      setTotalPage(Math.ceil(data.event.gallery.length/imagesPerPage))
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
          import.meta.env.VITE_BACKEND_URL+"/api/admin/add-gallery-img",
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
      < Toaster />
      {eventData ? (
        <div className="w-full flex flex-col items-center text-white h-screen overflow-y-scroll">
          <div
            className=" flex-shrink-0 w-full h-[60vh] bg-cover bg-center relative flex items-center justify-center text-center"
            style={{ backgroundImage: `url(${eventData.banner})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative w-full flex justify-center">
              <h1 className="text-7xl font-bold mb-6 w-[90%] break-words">
                {eventData.name}
              </h1>
            </div>
          </div>

          <div className="w-full py-10 flex justify-center text-black">
            <div className="w-[80%] lg:w-[60%]">
              <p className="text-lg font-medium mb-10">
                {eventData.description}
              </p>
            </div>
          </div>
          <div className="w-full py-16 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] sm:w-[85%] lg:w-[80%] place-items-center">
          {eventData.gallery.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage).map((image, index) => (
         <div 
         key={index} 
         className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer max-w-[400px] "
         onClick={()=>{setIsGalleryOpen(true)}}
       >
         <div className="relative loading  max-w-[400px] h-[300px] ">
           <LazyLoadImage
             src={image} 
             alt={eventData.name} 
            effect="blur"
             className="transition-transform duration-500 group-hover:scale-110  hover:scale-105 w-[400px] object-cover h-[300px]"
           />
     
         </div>
         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <h3 className="text-2xl font-bold">View Image</h3>
           
         </div>

       
       </div>
       
          
          ))}
          
        </div>
        
      </div>

      
      <div className="flex justify-center mb-10">
      {
        Array(totalPage).fill().map((_,index)=>{
          return(
            <button key={index+1} className={`px-4 py-2 mx-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={()=>{setCurrentPage(index+1)}}>{index+1}</button>
          )
        })
      }
      </div>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
       {
        userRole==="Admin"?
        <button
        className="absolute bottom-5 right-5 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Upload memories
      </button>
:''
       } 
      
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
