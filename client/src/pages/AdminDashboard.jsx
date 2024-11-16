import React, { useEffect, useState } from 'react';
import CountCard from '../components/CountCard';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    guestSpeakers: 0,
    teamMembers: 0,
    upcomingEvents: 0,
    passedEvents: 0,
  });

  // Fetch counts for a specific model
  const fetchCounts = async (modelName) => {
    try {
      const response = await fetch( import.meta.env.VITE_BACKEND_URL+"/api/public/get-object-count", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelName }),
      });

      const data = await response.json();

      // Handle separate event counts
      if (modelName === 'Event') {
        return {
          upcoming: data.upcoming || 0,
          passed: data.passed || 0,
        };
      }

      return { count: data.count || 0 };
    } catch (error) {
      console.error(`Error fetching count for ${modelName}:`, error);

      // Return default values in case of an error
      return modelName === 'Event'
        ? { upcoming: 0, passed: 0 }
        : { count: 0 };
    }
  };

  useEffect(() => {
    const fetchAllCounts = async () => {
      const guestSpeakers = await fetchCounts('GuestSpeaker');
      const teamMembers = await fetchCounts('TeamMember');
      const events = await fetchCounts('Event');

      // Update state with fetched counts
      setCounts({
        guestSpeakers: guestSpeakers.count,
        teamMembers: teamMembers.count,
        upcomingEvents: events.upcoming,
        passedEvents: events.passed,
      });
    };

    fetchAllCounts();
  }, []);

  return (
    <div className="w-full h-[100vh] bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CountCard path="http://localhost:5173/admin/manage-teams" title="Team Members" count={counts.teamMembers} />
        <CountCard path="http://localhost:5173/admin/manage-events" title="Upcoming Events" count={counts.upcomingEvents} />
        <CountCard path="http://localhost:5173/admin/guest-speaker" title="Guest Speakers" count={counts.guestSpeakers} />
        <CountCard path="http://localhost:5173/admin/past-events" title="Passed Events" count={counts.passedEvents} />
      </div>
    </div>
  );
}
