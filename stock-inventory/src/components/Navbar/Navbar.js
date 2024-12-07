import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set authentication state
    });
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="project-name">Wings Cafe</span>
      </div>
      <div className="navbar-right">
        {!isAuthenticated ? (
          // Show Register and Login links if user is not logged in
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          // Show other links if user is logged in
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/add-product">Add Product</Link>
            <Link to="/product-list">Product List</Link>
            <Link to="/user-management">User Management</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
