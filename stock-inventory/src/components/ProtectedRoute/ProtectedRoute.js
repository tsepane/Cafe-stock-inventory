import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';  // Import auth from firebase

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();  // Get auth instance
  const user = auth.currentUser;  // Get the current logged-in user

  // If no user is authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected route's children
  return children;
};

export default ProtectedRoute;
