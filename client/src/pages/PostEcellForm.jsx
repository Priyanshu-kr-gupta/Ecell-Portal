import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
export default function PostEcellForm() {

  const {formId}=useParams();
  const [formDetails, setFormDetails] = useState({});
  const [isPublished, setIsPublished] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [responses, setResponses] = useState([]);
  const [tab,setTab]=useState('Preview');
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/get-form`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({formId}),
      });

        const data = await response.json();
        if (response.ok) {
          setFormDetails(data.form[0]);
          // setIsPublished(data.form.isPublished);
          // setEndDate(data.form.endDate || '');
        } else {
          console.error(data.error || 'Failed to fetch form details');
        }
      } catch (error) {
        console.error('Error fetching form details:', error);
      }
    };

    fetchFormDetails();
  }, [formId]);

  const togglePublish = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/publish-form/${formId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      if (response.ok) {
        setIsPublished(!isPublished);
      } else {
        console.error('Failed to update publish status');
      }
    } catch (error) {
      console.error('Error updating publish status:', error);
    }
  };

  const updateEndDate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/set-end-date/${formId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endDate }),
      });
      if (!response.ok) {
        console.error('Failed to update end date');
      }
    } catch (error) {
      console.error('Error updating end date:', error);
    }
  };



  return (
    <div className="w-full h-screen overflow-y-auto p-5 pt-10">
      <div className='w-full justify-center flex mt-2 mb-10'>

      <button className={`py-3 text-white w-full text-lg ${tab==='Preview'?'border-b-2':''}`} onClick={()=>{setTab('Preview')}}>Preview</button>
      <button className={`py-3 text-white w-full text-lg ${tab==='Publish'?'border-b-2':''}`} onClick={()=>{setTab('Publish')}}>Publish</button>
      <button className={`py-3 text-white w-full text-lg ${tab==='Responses'?'border-b-2':''}`} onClick={()=>{setTab('Responses')}}>Responses</button>
      </div>

      {tab==='Preview' &&
      <>
      <h1 className="text-3xl font-bold mb-4 text-white">{formDetails.title || 'Form Title'}</h1>
      <p className="mb-6 text-gray-200">{formDetails.description || 'Form Description'}</p>

      <div className="p-4 bg-[#222E3C] text-white rounded-lg shadow-md">
        {formDetails.questions?.length > 0 ? (
          formDetails.questions.map((question, index) => (
            <div key={index} className="mb-4">
              <label className="block text-lg font-semibold">{question.text}</label>
              {question.type === 'Short Answer' && (
                <input
                  type="text"
                
                  className="w-full mt-2 p-2  rounded-lg border border-[#3A4A5F] bg-[#2E3A4D] outline-none"
                  placeholder="Short Answer"
                />
              )}
              {question.type === 'Paragraph' && (
                <textarea
                  className="w-full mt-2 p-2 rounded-lg border border-[#3A4A5F] bg-[#2E3A4D] outline-none"
                  placeholder="Paragraph Answer"
                />
              )}
              {question.type === 'Multiple Choice' && (
                <div className="mt-2 ">
                  {question.options?.map((option, i) => (
                    <label key={i} className="block">
                      <input type="radio" name={`question-${index}`}  /> {option}
                    </label>
                  ))}
                </div>
              )}
           {question.type === 'Dropdown' && (
              <select className="w-full mt-2 p-2 border rounded-lg border-[#3A4A5F] bg-[#2E3A4D] outline-none" >
              {question.options?.map((option, i) => (
              <option key={i} value={option}>
              {option}
            </option>
          ))}
          </select>
        )}

        {question.type === 'Checkboxes' && (
          <div className="mt-2">
            {question.options?.map((option, i) => (
              <label key={i} className="flex items-center gap-2 mb-2">
              <input type="checkbox" /> {option}
          </label>
        ))}
        </div>
        )}
    </div>
    ))
    
    ) : (
          <p>No questions to preview.</p>
        )}
      </div>
</>      
      }

      {tab==='Publish' && 
      <div className="mt-6 flex flex-col gap-4">
       

        <div className="flex items-center gap-4">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <button
            onClick={updateEndDate}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Set End Date
          </button>
          
        </div>
        <button
          onClick={togglePublish}
          className={`px-4 py-2 text-white rounded-lg ${isPublished ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isPublished ? 'Unpublish Form' : 'Publish Form'}
        </button>
      </div>
      }
    {tab==='Responses' && 
        <button
        
        className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Export Responses
        </button>
        }
    </div>
  );
}
