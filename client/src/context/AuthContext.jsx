import React, { createContext, useContext, useState ,useEffect} from 'react';

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

useEffect(() => {
  if (localStorage.getItem('userId')) {
    setIsAuthenticated(true);
  }
}, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, userRole, setUserRole, handleRole, userId, handleUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
