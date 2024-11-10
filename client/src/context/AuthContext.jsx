import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  
const handleRole = (role) => {
    setUserRole(role); 
    localStorage.setItem('userRole', role);
};
const handleUserId = (id) => {
  setUserId(id);
  localStorage.setItem('userId', id);
};

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, userRole, setUserRole, handleRole, userId, handleUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
