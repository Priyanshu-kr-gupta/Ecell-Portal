import React, { useEffect, useState } from 'react';

export default function ViewStartups() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const res = await fetch( `${import.meta.env.VITE_BACKEND_URL}/api/admin/get-startups`);
        const data = await res.json();
        setStartups(data.data); // assuming response is { success: true, data: [...] }
      } catch (error) {
        console.error('Error fetching startups:', error);
      }
    };

    fetchStartups();
  }, []);

  return (
    <div style={{ color: '#e0e0e0', padding: '20px' }}>
      <h1 style={{ color: '#ffffff' }}>All Startups</h1>
      {startups.length > 0 ? (
      startups.map((startup) => (
        <div
          key={startup._id}
          className="bg-[#1e293b] shadow-lg p-6 mb-6 transition duration-200 hover:shadow-xl"
        >
          <h2 className="text-2xl text-blue-400 font-semibold mb-3">{startup.title}</h2>
          <p><span className="font-semibold">Idea:</span> {startup.idea}</p>
          <p><span className="font-semibold">Stage:</span> {startup.stage}</p>
          <p><span className="font-semibold">Phase:</span> {startup.phase}</p>
          <p><span className="font-semibold">Team Members:</span> {startup.teamMembers}</p>
          <p><span className="font-semibold">Requirements:</span> {startup.requirements}</p>
          <p><span className="font-semibold">Consent:</span> {startup.consent}</p>

          <h3 className="mt-4 text-lg font-bold text-gray-300">Submitted By:</h3>
          {startup.user && (
            <div className="ml-4 mt-2 space-y-1 text-sm">
              <p><span className="font-medium">Name:</span> {startup.user.Name}</p>
              <p><span className="font-medium">Email:</span> {startup.user.Email}</p>
              <p><span className="font-medium">Registration No:</span> {startup.user.Reg_No}</p>
              <p><span className="font-medium">Contact No:</span> {startup.user.Contact_No}</p>
            </div>
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-400">No startups found.</p>
    )}
    </div>
  );
}
