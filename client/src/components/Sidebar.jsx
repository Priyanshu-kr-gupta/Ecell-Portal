import React,{useEffect} from 'react';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';

export default function Sidebar()
{
  const { userRole,handleRole} = useAuth(); 
    // console.log(userRole)
    
useEffect(()=>{
        handleRole("User")        
},[])

  return (
    <div className="sidebar">
      <h2>eCell Portal</h2>
      <ul>
        {userRole === 'Admin' && (
          <>
            <li>
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/manage-events">Manage Events</Link>
            </li>
            <li>
              <Link to="/admin/manage-startups">Manage Startups</Link>
            </li>
            <li>
              <Link to="/admin/users">Manage Users</Link>
            </li>
          </>
        )}
        {userRole === 'User' && (
          <>
            <li>
              <Link to="/user/dashboard">User Dashboard</Link>
            </li>
            <li>
              <Link to="/user/events">View Events</Link>
            </li>
            <li>
              <Link to="/user/register">Register Startup</Link>
            </li>
            <li>
              <Link to="/user/profile">Profile</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

