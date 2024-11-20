import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX} from 'react-icons/fi';
import { SiGoogleforms } from "react-icons/si";
import { FaTachometerAlt, FaCalendarAlt, FaRocket, FaUsers, FaCog } from 'react-icons/fa';
import Header from "../components/Header.jsx";

export default function Sidebar() {
  const { userRole } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
    <div className="lg:flex">
      {/* Sidebar Toggle Button */}
      <button
        className={`absolute top-2 ${isSidebarOpen ? 'left-56 top-5 text-white' : 'left-2 text-white'} px-3 py-1 lg:hidden z-20`}
        onClick={toggleSidebar}
        >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 h-[100vh] lg:relative fixed lg:flex-shrink-0 w-72 bg-[#222E3C] p-10 text-white transition-transform duration-300 z-10  border-[10px] border-[#19222C]`}
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
            <Link to="/admin/ecell-forms" className="flex items-center py-4 text-lg">
              <SiGoogleforms className="mr-3" />Ecell Forms
            </Link>
            <Link to="/admin/manage-startups" className="flex items-center py-4 text-lg">
              <FaRocket className="mr-3" /> View Startups
            </Link>
            <Link to="/admin/manage-teams" className="flex items-center py-4 text-lg " >
              <FaUsers className="mr-3" /> Manage Team
            </Link>
            <Link to="/admin/guest-speaker" className="flex items-center py-4 text-lg " >
              <FaUsers className="mr-3" /> Guest Speakers
            </Link>
            <Link to="/admin/past-events" className="flex items-center py-4 text-lg">
              <FaCalendarAlt className="mr-3" />Past Events
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
            <Link to="/user/upcoming-events" className="flex items-center py-5 text-lg">
              <FaCalendarAlt className="mr-3" /> Upcoming Events
            </Link>
            <Link to="/user/past-events" className="flex items-center py-5 text-lg">
              <FaCalendarAlt className="mr-3" /> Past Events
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
        </>
  );
}
