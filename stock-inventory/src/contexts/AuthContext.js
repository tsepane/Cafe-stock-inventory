import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the authentication context
export const AuthContext = createContext();

// Create the provider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');  // Check if user is authenticated from localStorage
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify({ isAuthenticated: true }));
    navigate('/');  // Redirect to dashboard after successful login
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/login');  // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
