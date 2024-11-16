import React, { useState } from 'react';

const ConfirmationModal = (Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleDelete = async () => {
    if (inputValue === Props.name) {
      try {
        const response = await fetch('http://localhost:5000/api/admin/remove-document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({modelName: Props.modelName,id: Props.id,imgPath:Props.imgUrl
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('removed successfully');
          Props.onClose();
        } else {
          alert(data.message || 'Failed to remove');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    } else {
      alert(" name does not match. Please try again.");
    }
  };



  return (
    
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Type "<strong>{Props.name}</strong>" to confirm.</p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />

            <div className="flex justify-end gap-5">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={Props.onClose}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
    
  );
};

export default ConfirmationModal;
