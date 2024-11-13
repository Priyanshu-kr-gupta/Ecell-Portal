import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, userRole } = useAuth();

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" />;
    // }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
