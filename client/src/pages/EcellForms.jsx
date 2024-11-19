import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EcellFormCard from '../components/EcellFormCard';

export default function EcellForms() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch( import.meta.env.VITE_BACKEND_URL+"/api/admin/get-forms");
        const data = await response.json();
        if (response.ok) {
          setForms(data.forms);
        } else {
          console.error(data.error || 'Failed to fetch forms');
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="w-full h-screen p-5 overflow-y-auto flex flex-col  bg-gray-100">
      <h1 className="text-3xl font-bold mb-10 p-4">Ecell Forms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1200px]">
     
        <Link
          to="/admin/ecell-forms/create"
          className="flex flex-col items-center justify-center border-2 border-dashed border-blue-500 rounded-lg p-6 hover:bg-blue-100"
        >
          <div className="text-blue-500 text-4xl font-bold mb-2">+</div>
          {/* <div className="text-lg text-blue-500 font-semibold">Create New Form</div> */}
        </Link>

        {forms.map((form) => (
       
          <EcellFormCard key={form._id} title={form.title} formId={form._id}/>
        ))}
      </div>
    </div>
  );
}
