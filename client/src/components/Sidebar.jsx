import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaTachometerAlt, FaCalendarAlt, FaRocket, FaUsers, FaCog } from 'react-icons/fa';

export default function Sidebar() {
  const { userRole } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="lg:flex">
      {/* Sidebar Toggle Button */}
      <button
        className={`absolute top-4 ${isSidebarOpen ? 'left-48 text-white' : 'left-4 text-black'} px-3 py-1 lg:hidden z-20`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 h-[100vh] lg:relative fixed lg:flex-shrink-0 w-64 bg-gradient-to-b from-[#25334d] to-[#1a2a3c] border-r border-[#273a79] p-10 text-white transition-transform duration-300 z-10`}
      >
        <div className="text-2xl font-semibold mb-2">
          E-cell Portal
        </div>
        <hr className="mb-8" />

        {userRole === 'Admin' && (
          <>
            <Link to="/admin/" className="flex items-center py-4 text-lg">
              <FaTachometerAlt className="mr-3" /> Admin Dashboard
            </Link>
            <Link to="/admin/manage-events" className="flex items-center py-4 text-lg">
              <FaCalendarAlt className="mr-3" /> Manage Events
            </Link>
            <Link to="/admin/past-events" className="flex items-center py-4 text-lg">
              <FaCalendarAlt className="mr-3" />Past Events
            </Link>
            <Link to="/admin/manage-startups" className="flex items-center py-4 text-lg">
              <FaRocket className="mr-3" /> View Startups
            </Link>
            <Link to="/admin/manage-teams" className="flex items-center py-4 text-lg cursor-not-allowed pointer-events-none" >
              <FaUsers className="mr-3" /> Manage Team
            </Link>
            <Link to="/admin/guest-speaker" className="flex items-center py-4 text-lg " >
              <FaUsers className="mr-3" /> Guest Speakers
            </Link>
            <Link to="/admin/Setting" className="flex items-center py-4 text-lg">
              <FaCog className="mr-3" /> Setting
            </Link>
          </>
        )}

        {userRole === 'User' && (
          <>
            <Link to="/user/" className="flex items-center py-5 text-lg">
              <FaTachometerAlt className="mr-3" /> User Dashboard
            </Link>
            <Link to="/user/events" className="flex items-center py-5 text-lg">
              <FaCalendarAlt className="mr-3" /> View Events
            </Link>
            <Link to="/user/my-startup" className="flex items-center py-5 text-lg">
              <FaRocket className="mr-3" /> My Startup
            </Link>
            <Link to="/user/Setting" className="flex items-center py-5 text-lg">
              <FaCog className="mr-3" /> Setting
            </Link>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
