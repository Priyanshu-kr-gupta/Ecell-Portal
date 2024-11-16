import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function MyStartup() {
  const { userId } = useAuth();
  const [startupData, setStartupData] = useState({
    title: '',
    teamMembers: '',
    idea: '',
    stage: '',
    phase: '',
    requirements: '',
    consent: false
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const checkRegistration = async ()=> {
    try {
      const response = await fetch( import.meta.env.VITE_BACKEND_URL+'/api/User/check-startup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
      });

      const data = await response.json();

      if (data.registered) {
        setStartupData(data.startup);
        setIsRegistered(true);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error checking registration:', error);
      setLoading(false);
    }
  };
  useEffect(() =>{
      checkRegistration();    
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStartupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch( import.meta.env.VITE_BACKEND_URL+'/api/User/register-startup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({ userId: userId , ...startupData }),
      });
  
      const data = await response.json();
  
      if (data.status) {
        setIsRegistered(true);
        console.log('Startup Registered:', data);
      } else {
        console.error('Error registering startup:', data.message);
      }
    } catch (error) {
      console.error('Error registering startup:', error);
    }
  };
  

  return (
    isRegistered ? (
      <div className="h-screen overflow-y-scroll flex justify-center">
        <div className="p-10 rounded-lg w-full">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Your Startup Details
          </h1>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg text-gray-700 font-medium">Startup Idea Title</h2>
              <p className="text-gray-600">{startupData.title}</p>
            </div>

            <div>
              <h2 className="text-lg text-gray-700 font-medium">Team Members</h2>
              <p className="text-gray-600">{startupData.teamMembers}</p>
            </div>

            <div>
              <h2 className="text-lg text-gray-700 font-medium">Idea Description</h2>
              <p className="text-gray-600">{startupData.idea}</p>
            </div>

            <div>
              <h2 className="text-lg text-gray-700 font-medium">Stage</h2>
              <p className="text-gray-600">{startupData.stage}</p>
            </div>

            <div>
              <h2 className="text-lg text-gray-700 font-medium">Phase</h2>
              <p className="text-gray-600">{startupData.phase}</p>
            </div>

            <div>
              <h2 className="text-lg text-gray-700 font-medium">Requirements</h2>
              <p className="text-gray-600">{startupData.requirements}</p>
            </div>

            <div>
              <h2 className="text-lg text-gray-700 font-medium">Consent</h2>
              <p className="text-gray-600">{startupData.consent ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="h-screen overflow-y-scroll flex justify-center">
        <div className="p-10 rounded-lg w-full">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Register Your Startup
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-lg text-gray-700 font-medium mb-2">
                Startup Idea Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={startupData.title}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your startup's idea title"
                required
              />
            </div>
            <div>
              <label htmlFor="teamMembers" className="block text-lg text-gray-700 font-medium mb-2">
                Number of Team Members
              </label>
              <input
                type="number"
                name="teamMembers"
                id="teamMembers"
                value={startupData.teamMembers}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the number of members in your team"
                required
              />
            </div>
            <div>
              <label htmlFor="idea" className="block text-lg text-gray-700 font-medium mb-2">
                Idea Description
              </label>
              <textarea
                name="idea"
                id="idea"
                value={startupData.idea}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your startup idea"
                rows="4"
                required
              />
            </div>
            <div>
              <label htmlFor="stage" className="block text-lg text-gray-700 font-medium mb-2">
                Startup Stage
              </label>
              <select
                name="stage"
                id="stage"
                value={startupData.stage}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Stage</option>
                <option value="Concept">Concept</option>
                <option value="Prototype">Prototype</option>
                <option value="MVP">MVP</option>
                <option value="Launch">Launch</option>
                <option value="Growth">Growth</option>
              </select>
            </div>
            <div>
              <label htmlFor="phase" className="block text-lg text-gray-700 font-medium mb-2">
                Idea Phase
              </label>
              <select
                name="phase"
                id="phase"
                value={startupData.phase}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Phase</option>
                <option value="Research">Research</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="Market Validation">Market Validation</option>
                <option value="Launch">Launch</option>
              </select>
            </div>
            <div>
              <label htmlFor="requirements" className="block text-lg text-gray-700 font-medium mb-2">
                Requirements for the Startup
              </label>
              <textarea
                name="requirements"
                id="requirements"
                value={startupData.requirements}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What are the requirements to bring your startup idea to life?"
                rows="4"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="consent"
                id="consent"
                checked={startupData.consent}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="consent" className="ml-2 text-lg text-gray-700">
                I consent to share my startup idea.
              </label>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="min-w-[300px] bg-blue-600 text-white p-3 mb-10 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register Startup
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
