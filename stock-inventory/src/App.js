import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import ProductForm from './components/ProductForm/ProductForm';
import ProductList from './components/ProductList/ProductList';
import UserManagement from './components/UserManagement/UserManagement';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // Protected route for authenticated users
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import './App.css';

// Adjusted path for logo to ensure it matches the correct folder structure
import logo from './components/assets/logo.webp';  // Updated path

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          {/* Navbar */}
          <Navbar />

          <div className="main-content">
            {/* Logo below navbar on the left */}
            <div className="logo-container">
              <img src={logo} alt="Cafe Logo" className="logo" />
            </div>

            {/* Main Content Area */}
            <div className="content-area">
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-product"
                  element={
                    <ProtectedRoute>
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/product-list"
                  element={
                    <ProtectedRoute>
                      <ProductList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user-management"
                  element={
                    <ProtectedRoute>
                      <UserManagement />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;