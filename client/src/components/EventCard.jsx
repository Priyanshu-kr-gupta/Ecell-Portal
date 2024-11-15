import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaTrashAlt } from 'react-icons/fa'; // React icon for trash
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function EventCard(Props) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [eventNameToDelete, setEventNameToDelete] = useState('');

  const handleDelete = async () => {
    if (eventNameToDelete === Props.value.name) {
      try {
        const response = await fetch('http://localhost:5000/api/admin/remove-document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({modelName: 'Event',id: Props.value._id,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Event removed successfully');
        } else {
          alert(data.message || 'Failed to remove event');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    } else {
      alert('Event name does not match. Please try again.');
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform max-w-[400px]">
    <Link
      to={`/admin/event-gallary/${Props.value._id}`}
      className="relative max-w-[400px] h-[300px] rounded-lg overflow-hidden"
    >
      <LazyLoadImage
        src={Props.value.banner}
        alt={Props.value.name}
        effect="blur"
        className="group-hover:scale-110 transition-transform duration-500 ease-in-out w-[400px] object-cover h-[300px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500"></div>
    </Link>

    {/* Delete Button */}
    <button
      onClick={() => setShowConfirm(true)}
      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 focus:outline-none"
    >
      <FaTrashAlt className="w-3 h-3" />
    </button>

    {/* Confirmation Modal */}
    {showConfirm && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
          <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
          <p className="mb-4">Type "<strong>{Props.value.name}</strong>" to confirm.</p>
          <input
            type="text"
            value={eventNameToDelete}
            onChange={(e) => setEventNameToDelete(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
          <div className="flex justify-between">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="absolute bottom-0 left-0 w-full px-4 py-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:h-40">
      <h3 className="text-2xl font-bold mb-1">{Props.value.name}</h3>
      <h2 className="text-center text-sm hidden group-hover:block">{Props.value.intro}</h2>
    </div>
  </div>
  );
}
