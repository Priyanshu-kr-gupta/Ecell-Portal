import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EcellFormCard from '../components/EcellFormCard';

export default function ActiveForms() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch( import.meta.env.VITE_BACKEND_URL+"/api/user/get-active-forms");
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
    <div className="w-full h-screen p-5 overflow-y-auto flex flex-col text-white">
      <h1 className="text-3xl font-bold mb-10 p-4">Ecell Forms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1200px]">

        {forms.map((form) => (
       
          <EcellFormCard key={form._id} title={form.title} formId={form._id} path="/user/fill-form"/>
        ))}
        
      </div>
    </div>
  );
}
